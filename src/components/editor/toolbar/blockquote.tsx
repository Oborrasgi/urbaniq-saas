"use client";

import { useEditorState } from "@tiptap/react";
import { TextQuote } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface BlockquoteToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function BlockquoteToolbar({
  className,
  ref,
  onClick,
  children,
  ...props
}: BlockquoteToolbarProps) {
  const { editor } = useToolbar();
  const isActiveBlockquote = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("blockquote")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveBlockquote && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleBlockquote().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          {...props}
        >
          {children ?? <TextQuote className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Blockquote</span>
      </TooltipContent>
    </Tooltip>
  );
}

BlockquoteToolbar.displayName = "BlockquoteToolbar";

export { BlockquoteToolbar };
