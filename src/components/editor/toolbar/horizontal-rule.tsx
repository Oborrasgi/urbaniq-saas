"use client";

import { useEditorState } from "@tiptap/react";
import { SeparatorHorizontal } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface HorizontalRuleToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function HorizontalRuleToolbar({
  className,
  ref,
  onClick,
  children,
  ...props
}: HorizontalRuleToolbarProps) {
  const { editor } = useToolbar();
  const isHorizontalRuleActive = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("horizontalRule")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isHorizontalRuleActive && "bg-accent", className)}
          onClick={(e) => {
            editor.chain().focus().setHorizontalRule().run();
            onClick?.(e);
          }}
          {...props}
        >
          {children ?? <SeparatorHorizontal className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Horizontal Rule</span>
      </TooltipContent>
    </Tooltip>
  );
}

HorizontalRuleToolbar.displayName = "HorizontalRuleToolbar";

export { HorizontalRuleToolbar };
