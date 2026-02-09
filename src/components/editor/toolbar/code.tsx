"use client";

import { useEditorState } from "@tiptap/react";
import { Code2 } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface CodeToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function CodeToolbar({ className, ref, onClick, children, ...props }: CodeToolbarProps) {
  const { editor } = useToolbar();
  const isActiveCode = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("code")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveCode && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleCode().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          {...props}
        >
          {children ?? <Code2 className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Code</span>
      </TooltipContent>
    </Tooltip>
  );
}

CodeToolbar.displayName = "CodeToolbar";

export { CodeToolbar };
