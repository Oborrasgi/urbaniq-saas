"use client";

import { Code } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useEditorState } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface CodeBlockToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function CodeBlockToolbar({ className, ref, onClick, children, ...props }: CodeBlockToolbarProps) {
  const { editor } = useToolbar();
  const isActiveCodeBlock = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("codeBlock")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveCodeBlock && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleCodeBlock().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          {...props}>
          {children ?? <Code className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Code Block</span>
      </TooltipContent>
    </Tooltip>
  );
}

CodeBlockToolbar.displayName = "CodeBlockToolbar";

export { CodeBlockToolbar };
