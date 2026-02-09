"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { type PropsWithChildren, useCallback } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SignOutButton({ children }: PropsWithChildren) {
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
      <LogOut className="me-2 size-4 text-inherit" />
      {children || "Log out"}
    </DropdownMenuItem>
  );
}
