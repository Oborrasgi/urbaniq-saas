"use client";

import { useEditorState } from "@tiptap/react";
import { BoldIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface BoldToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function BoldToolbar({ className, ref, onClick, children, ...props }: BoldToolbarProps) {
  const { editor } = useToolbar();
  const isActiveBold = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("bold")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveBold && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleBold().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          {...props}
        >
          {children ?? <BoldIcon className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>Bold</TooltipContent>
    </Tooltip>
  );
}

BoldToolbar.displayName = "BoldToolbar";

export { BoldToolbar };
