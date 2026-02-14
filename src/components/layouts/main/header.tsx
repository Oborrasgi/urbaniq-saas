import { Menu } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const headerMenu = [
  { id: 1, name: "Inicio", href: "/" },
  { id: 2, name: "Soluciones", href: "#features" },
  { id: 3, name: "Precios", href: "#pricing" },
  { id: 4, name: "Legal AI", href: "#legal-ai" },
  { id: 5, name: "Contacto", href: "/contact" },
  { id: 6, name: "Blog", href: "/blogs" }
];

export default async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b py-4 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </div>

          <div className="flex grow items-center justify-center gap-6">
            <div className="flex items-center">
              <NavigationMenu className="relative z-100">
                <NavigationMenuList>
                  {headerMenu.map((menu) =>
                    menu.children ? (
                      <NavigationMenuItem key={menu.id}>
                        <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {menu.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={menu.id}>
                        <Link
                          href={menu.href}
                          className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                        >
                          {menu.name}
                        </Link>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <div className="flex gap-2">
              {currentUser ? (
                <Link
                  href={appConfig.auth.afterLogin}
                  className={buttonVariants({ variant: "default" })}
                >
                  Panel
                </Link>
              ) : (
                <Fragment>
                  <Link
                    href={appConfig.auth.login}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href={appConfig.auth.signUp}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Crear cuenta
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="shadow-none" variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="max-w-72 overflow-y-auto px-4">
                <SheetHeader className="border-b px-0 pb-4">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col">
                  {headerMenu.map((menu) => (
                    <Link
                      key={menu.id}
                      href={menu.href || "/"}
                      className="border-border/40 flex items-center border-b px-1 py-3 text-base font-medium"
                    >
                      {menu.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="mt-2 flex flex-col gap-2">
                    {currentUser ? (
                      <Link
                        href={appConfig.auth.afterLogin}
                        className={buttonVariants({ variant: "default" })}
                      >
                        Panel
                      </Link>
                    ) : (
                      <>
                        <Link
                          href={appConfig.auth.login}
                          className={buttonVariants({ variant: "secondary" })}
                        >
                          Iniciar sesión
                        </Link>

                        <Link
                          href={appConfig.auth.signUp}
                          className={buttonVariants({ variant: "default" })}
                        >
                          Crear cuenta
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<"a">) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

ListItem.displayName = "ListItem";
