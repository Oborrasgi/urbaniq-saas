"use client";

import {
  ArrowRight,
  CircleAlert,
  CreditCard,
  Laptop,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";

const commandMenuItems = [
  {
    title: "Recent",
    navGroup: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "General", url: "/dashboard/general", icon: Settings },
      { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
      { title: "Danger", url: "/dashboard/delete", icon: CircleAlert }
    ]
  }
];

export function CommandMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <>
      <Button
        variant="outline"
        className="bg-muted/25 text-muted-foreground hover:bg-muted/50 xs:max-w-48 relative h-9 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-xs md:flex-none lg:w-sm"
        onClick={() => setOpen(true)}
      >
        <Search aria-hidden="true" className="absolute top-1/2 left-1.5 -translate-y-1/2" />
        <span className="ms-3">Search</span>

        <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog modal open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList className="[scrollbar-color:var(--color-border)transparent] [scrollbar-width:thin]">
          <CommandEmpty>
            <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center">
              <Search className="mb-2 size-8 opacity-60" />
              <span className="text-base font-medium">No results found</span>
              <span className="mt-1 text-xs">
                Try a different search term or check your spelling.
              </span>
            </div>
          </CommandEmpty>

          {/* Please pass you nav data here  */}
          {commandMenuItems.map((group) => (
            <CommandGroup className="cursor-pointer" key={group.title} heading={group.title}>
              {group.navGroup.map((nav, i) => (
                <CommandItem
                  key={`${nav.url}-${i}`}
                  value={nav.title}
                  onSelect={() => runCommand(() => router.push(nav.url))}
                >
                  {nav.icon ? (
                    <nav.icon className="text-muted-foreground" />
                  ) : (
                    <ArrowRight className="text-muted-foreground" />
                  )}

                  <span>{nav.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme("light"))}
            >
              <Sun className="text-muted-foreground" /> <span>Light</span>
            </CommandItem>

            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme("dark"))}
            >
              <Moon className="text-muted-foreground" />
              <span>Dark</span>
            </CommandItem>

            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme("system"))}
            >
              <Laptop className="text-muted-foreground" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
