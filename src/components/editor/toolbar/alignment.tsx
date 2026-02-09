"use client";

import { useEditorState } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

const alignmentOptions = [
  {
    name: "Left Align",
    value: "left",
    icon: <AlignLeft className="size-4" />
  },
  {
    name: "Center Align",
    value: "center",
    icon: <AlignCenter className="size-4" />
  },
  {
    name: "Right Align",
    value: "right",
    icon: <AlignRight className="size-4" />
  },
  {
    name: "Justify Align",
    value: "justify",
    icon: <AlignJustify className="size-4" />
  }
];

function AlignmentToolbar() {
  const { editor } = useToolbar();
  const { currentTextAlign, isDisabled } = useEditorState({
    editor,
    selector: (state) => ({
      currentTextAlign: (value: string) => state.editor.isActive({ textAlign: value }),
      isDisabled: state.editor.isActive("image")
    })
  });

  const handleAlign = (value: string) => {
    editor.chain().focus().setTextAlign(value).run();
  };

  return (
    <>
      {alignmentOptions.map((option) => (
        <Tooltip key={option.value}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={cn("size-8 p-0 sm:size-9", currentTextAlign(option.value) && "bg-accent")}
              onClick={() => handleAlign(option.value)}
              disabled={isDisabled}
            >
              {option.icon}
            </Button>
          </TooltipTrigger>

          <TooltipContent>{option.name}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}

AlignmentToolbar.displayName = "AlignmentToolbar";

export { AlignmentToolbar };
