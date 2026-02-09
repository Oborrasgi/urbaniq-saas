"use client";

import { useEditorState } from "@tiptap/react";
import { List } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface BulletListToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function BulletListToolbar({
  className,
  ref,
  onClick,
  children,
  ...props
}: BulletListToolbarProps) {
  const { editor } = useToolbar();
  const isBulletListActive = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("bulletList")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isBulletListActive && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().toggleBulletList().run();
            onClick?.(e);
          }}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          {...props}
        >
          {children ?? <List className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Bullet list</span>
      </TooltipContent>
    </Tooltip>
  );
}

BulletListToolbar.displayName = "BulletListToolbar";

export { BulletListToolbar };
