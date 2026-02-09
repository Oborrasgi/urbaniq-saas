"use client";

import { useEditorState } from "@tiptap/react";
import { ItalicIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface ItalicToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function ItalicToolbar({ className, ref, onClick, children, ...props }: ItalicToolbarProps) {
  const { editor } = useToolbar();
  const isActiveItalic = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("italic")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isActiveItalic && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleItalic().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          {...props}
        >
          {children ?? <ItalicIcon className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>Italic</TooltipContent>
    </Tooltip>
  );
}

ItalicToolbar.displayName = "ItalicToolbar";

export { ItalicToolbar };
