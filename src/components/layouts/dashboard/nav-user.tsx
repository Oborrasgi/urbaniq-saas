import { CreditCard, Home, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

export const NavMenu = [
  { icon: Home, title: "Dashboard", url: "/dashboard" },
  { icon: UserRound, title: "Account", url: "/dashboard/general" },
  { icon: CreditCard, title: "Billing", url: "/dashboard/billing" }
];

export async function NavUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer rounded-md">
          {currentUser && (
            <>
              {currentUser.image && currentUser.name && (
                <AvatarImage src={currentUser.image} alt={currentUser.name} className="rounded" />
              )}

              <AvatarFallback className="rounded">
                {currentUser?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              {currentUser.image && currentUser.name && (
                <AvatarImage src={currentUser.image} alt={currentUser.name} />
              )}

              <AvatarFallback className="rounded-lg">
                {currentUser?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{currentUser.name}</span>
              <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        {!currentUser?.hasAccess && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href={appConfig.stripe.billingRoute}>
                <DropdownMenuItem className="text-primary cursor-pointer">
                  <Sparkles className="me-2 size-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {NavMenu.map((item) => (
            <Link key={item.title} href={item.url}>
              <DropdownMenuItem className="cursor-pointer">
                {item.icon && <item.icon className="me-2 size-4" />}
                <span>{item.title}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
