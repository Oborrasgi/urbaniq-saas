"use client";

import type { Editor } from "@tiptap/react";
import { createContext, useContext, type ReactNode } from "react";

export interface ToolbarContextProps {
  editor: Editor;
}

export const ToolbarContext = createContext<ToolbarContextProps | null>(null);

interface ToolbarProviderProps {
  editor: Editor;
  children: ReactNode;
}

export function ToolbarProvider({ editor, children }: ToolbarProviderProps) {
  return <ToolbarContext value={{ editor }}>{children}</ToolbarContext>;
}

export function useToolbar() {
  const context = useContext(ToolbarContext);

  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }

  return context;
}
