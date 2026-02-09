"use client";

/* eslint-disable */

import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ImageExtension = Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: "100%" },
      height: { default: null },
      align: { default: "center" },
      caption: { default: "" },
      aspectRatio: { default: null }
    };
  },

  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapImage);
  }
});

function TiptapImage({ node, editor, selected, deleteNode, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper
      className={cn(
        "relative flex flex-col rounded-md border-2 border-transparent transition-all duration-200",
        selected && "border-blue-300"
      )}
      style={{ width: node.attrs.width }}
    >
      <div className="group relative flex flex-col rounded-md">
        <figure className="flex">
          <img
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
            className={cn(
              "rounded-lg",
              node.attrs.align === "left" && "ml-0!",
              node.attrs.align === "center" && "mx-auto!",
              node.attrs.align === "right" && "mr-0!"
            )}
            onLoad={(e) => {
              const img = e.currentTarget;
              const aspectRatio = img.naturalWidth / img.naturalHeight;
              updateAttributes({ aspectRatio });
            }}
          />
        </figure>

        {editor?.isEditable && (
          <div className="bg-background/80 absolute top-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-md border p-1 opacity-0 backdrop-blur transition-all duration-300 group-hover:top-4 group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              className={cn("size-7", node.attrs.align === "left" && "bg-accent")}
              onClick={() => updateAttributes({ align: "left" })}
            >
              <AlignLeft className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className={cn("size-7", node.attrs.align === "center" && "bg-accent")}
              onClick={() => updateAttributes({ align: "center" })}
            >
              <AlignCenter className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className={cn("size-7", node.attrs.align === "right" && "bg-accent")}
              onClick={() => updateAttributes({ align: "right" })}
            >
              <AlignRight className="size-4" />
            </Button>

            <Button size="icon" className="size-7" variant="ghost" onClick={deleteNode}>
              <Trash className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
