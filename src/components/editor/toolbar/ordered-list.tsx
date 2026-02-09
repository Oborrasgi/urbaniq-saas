"use client";

import { useEditorState } from "@tiptap/react";
import { ListOrdered } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface OrderedListToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function OrderedListToolbar({
  className,
  ref,
  onClick,
  children,
  ...props
}: OrderedListToolbarProps) {
  const { editor } = useToolbar();
  const isOrderedListActive = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("orderedList")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isOrderedListActive && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleOrderedList().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          {...props}
        >
          {children ?? <ListOrdered className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Ordered list</span>
      </TooltipContent>
    </Tooltip>
  );
}

OrderedListToolbar.displayName = "OrderedListToolbar";

export { OrderedListToolbar };
