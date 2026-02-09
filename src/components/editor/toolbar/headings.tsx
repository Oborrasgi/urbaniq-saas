"use client";

import { useEditorState } from "@tiptap/react";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

const levels = [1, 2, 3, 4, 5, 6] as const;

interface HeadingsToolbarProps extends ComponentPropsWithRef<"button"> {}

function HeadingsToolbar({ className, ref, ...props }: HeadingsToolbarProps) {
  const { editor } = useToolbar();

  const { isActiveParagraph, isActiveHeading } = useEditorState({
    editor,
    selector: (state) => ({
      isActiveParagraph: state.editor.isActive("paragraph"),
      isActiveHeading: levels.find((level) => state.editor.isActive("heading", { level }))
    })
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              ref={ref}
              className={cn(
                "h-8 w-max gap-1 px-3 font-normal",
                isActiveHeading && "bg-accent",
                className
              )}
              {...props}
            >
              {isActiveHeading ? `H${isActiveHeading}` : "Paragraph"}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={cn("flex h-fit items-center gap-2", isActiveParagraph && "bg-accent")}
            >
              Paragraph
            </DropdownMenuItem>

            {levels.map((level) => (
              <DropdownMenuItem
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={cn("flex items-center gap-2", isActiveHeading === level && "bg-accent")}
              >
                H{level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>

      <TooltipContent>
        <span>Headings</span>
      </TooltipContent>
    </Tooltip>
  );
}

HeadingsToolbar.displayName = "HeadingsToolbar";

export { HeadingsToolbar };
