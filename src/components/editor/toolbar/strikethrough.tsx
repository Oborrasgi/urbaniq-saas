"use client";

import { useEditorState } from "@tiptap/react";
import { Strikethrough } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface StrikeThroughToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function StrikeThroughToolbar({
  ref,
  onClick,
  children,
  className,
  ...props
}: StrikeThroughToolbarProps) {
  const { editor } = useToolbar();
  const isActiveStrikeThrough = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("strike")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveStrikeThrough && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleStrike().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          {...props}
        >
          {children ?? <Strikethrough className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>Strikethrough</TooltipContent>
    </Tooltip>
  );
}

StrikeThroughToolbar.displayName = "StrikeThroughToolbar";

export { StrikeThroughToolbar };
