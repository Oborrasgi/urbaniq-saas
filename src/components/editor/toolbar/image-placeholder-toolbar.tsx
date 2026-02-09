"use client";

import { useEditorState } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

interface ImagePlaceholderToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function ImagePlaceholderToolbar({
  ref,
  onClick,
  children,
  className,
  ...props
}: ImagePlaceholderToolbarProps) {
  const { editor } = useToolbar();
  const isImagePlaceholderActive = useEditorState({
    editor,
    selector: (state) => state.editor.isActive("image-placeholder")
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          ref={ref}
          className={cn("size-8 p-0 sm:size-9", isImagePlaceholderActive && "bg-accent", className)}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().insertImagePlaceholder().run();
            onClick?.(e);
          }}
          {...props}
        >
          {children ?? <ImageIcon className="size-4" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Image</span>
      </TooltipContent>
    </Tooltip>
  );
}

ImagePlaceholderToolbar.displayName = "ImagePlaceholderToolbar";

export { ImagePlaceholderToolbar };
