"use client";

import { useEditorState } from "@tiptap/react";
import { Undo2 } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface UndoToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function UndoToolbar({ className, ref, onClick, children, ...props }: UndoToolbarProps) {
  const { editor } = useToolbar();
  const canUndo = useEditorState({
    editor,
    selector: (state) => state.editor.can().chain().focus().undo().run()
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", canUndo && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().undo().run();
            onClick?.(e);
          }}
          disabled={!canUndo}
          {...props}
        >
          {children ?? <Undo2 className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Undo</span>
      </TooltipContent>
    </Tooltip>
  );
}

UndoToolbar.displayName = "UndoToolbar";

export { UndoToolbar };
