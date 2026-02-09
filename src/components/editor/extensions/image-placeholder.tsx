"use client";

import {
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
  type CommandProps,
  type NodeViewProps
} from "@tiptap/react";
import { ImageUp, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { NODE_HANDLES_SELECTED_STYLE_CLASSNAME } from "@/components/editor/utils";
import { cn } from "@/lib/utils";

export interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, any>;
  onUpload: (file: File) => Promise<string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create<ImagePlaceholderOptions>({
  name: "image-placeholder",

  addOptions() {
    return {
      HTMLAttributes: {},
      onUpload: async (_file: File) => {
        return "";
      }
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderComponent, {
      className: NODE_HANDLES_SELECTED_STYLE_CLASSNAME
    });
  },

  addCommands() {
    return {
      insertImagePlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({ type: "image-placeholder" });
      }
    };
  }
});

function ImagePlaceholderComponent({ editor, selected, extension }: NodeViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const { onUpload } = extension.options as ImagePlaceholderOptions;

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setUploading(true);
        setError(null);

        // Implement upload logic here
        // upload to server and get the url
        const url = await onUpload(file);
        if (!url) {
          throw new Error("Failed to upload image");
        }

        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: file.name || "Placeholder image" })
          .run();
      } catch (err) {
        setError("Failed to upload image");
      } finally {
        setUploading(false);
      }
    },
    [editor, onUpload]
  );

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const input = fileInputRef.current;
    if (!input) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    handleFileChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <NodeViewWrapper className="w-full">
      <div className="relative">
        {uploading ? (
          <div className="border-border flex items-center justify-center gap-1 rounded-lg border border-dashed p-8">
            <Loader2 className="size-4 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
              className={cn(
                "group border-border hover:bg-accent relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-lg border border-dashed transition-all",
                selected && "bg-primary/5",
                isDragActive && "border-primary bg-primary/5",
                error && "border-destructive bg-destructive/5"
              )}
            >
              <label
                htmlFor="image-upload"
                className="flex size-full cursor-pointer flex-col items-center justify-center p-8"
              >
                <ImageUp className={cn("size-12", error && "text-destructive!")} />

                <div className="mt-4 text-center">
                  <p
                    className={cn(
                      "my-0! text-sm! font-medium group-hover:underline",
                      error && "text-destructive!"
                    )}
                  >
                    Click to upload or drag and drop
                  </p>

                  <p
                    className={cn(
                      "text-muted-foreground! my-1! text-xs!",
                      error && "text-destructive!"
                    )}
                  >
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </label>

              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            {error && <p className="text-destructive! my-0! ms-2! mt-2! text-sm!">{error}</p>}
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}
