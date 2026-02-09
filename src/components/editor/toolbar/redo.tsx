"use client";

import { useEditorState } from "@tiptap/react";
import { Redo2 } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useToolbar } from "./toolbar-provider";

interface RedoToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function RedoToolbar({ className, ref, onClick, children, ...props }: RedoToolbarProps) {
  const { editor } = useToolbar();
  const canRedo = useEditorState({
    editor,
    selector: (state) => state.editor.can().chain().focus().redo().run()
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", canRedo && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().redo().run();
            onClick?.(e);
          }}
          disabled={!canRedo}
          {...props}
        >
          {children ?? <Redo2 className="size-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Redo</span>
      </TooltipContent>
    </Tooltip>
  );
}

RedoToolbar.displayName = "RedoToolbar";

export { RedoToolbar };
