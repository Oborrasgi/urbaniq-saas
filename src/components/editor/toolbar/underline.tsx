"use client";

import { useEditorState } from "@tiptap/react";
import { UnderlineIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface UnderlineToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function UnderlineToolbar({ className, ref, onClick, children, ...props }: UnderlineToolbarProps) {
  const { editor } = useToolbar();
  const isActiveUnderline = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("underline")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveUnderline && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleUnderline().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          {...props}
        >
          {children ?? <UnderlineIcon className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>Underline</TooltipContent>
    </Tooltip>
  );
}

UnderlineToolbar.displayName = "UnderlineToolbar";

export { UnderlineToolbar };
