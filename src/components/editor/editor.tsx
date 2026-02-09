"use client";

import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor, type Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { ImageExtension } from "@/components/editor/extensions/image";
import { ImagePlaceholder } from "@/components/editor/extensions/image-placeholder";
import { EditorToolbar } from "@/components/editor/toolbar/editor-toolbar";
import { appConfig } from "@/config";
import { cn } from "@/lib/utils";
import "./styles.css";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: { class: "list-decimal" }
    },
    bulletList: {
      HTMLAttributes: { class: "list-disc" }
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6]
    },
    link: {
      enableClickSelection: true,
      openOnClick: false
    }
  }),
  Placeholder.configure({
    includeChildren: false,
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          return ""; // never show the placeholder when editing code
        default:
          return "Write something...";
      }
    }
  }),
  TextStyle,
  Typography,
  ImageExtension,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  ImagePlaceholder.configure({
    onUpload: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${appConfig.domainUrl}/api/upload`, {
        method: "POST",
        body: formData
      });

      const data: { url: string } = await response.json();
      return data.url;
    }
  })
] as Extension[];

interface EditorProps {
  className?: string;
  content?: string;
  onUpdate?: (content: string) => void;
}

export function Editor({ className, content, onUpdate }: EditorProps) {
  const editor = useEditor({
    content: content || "",
    immediatelyRender: false,
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none"
      }
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
    }
  });

  if (!editor) return null;

  return (
    <div className={cn("bg-card relative rounded-lg border", className)}>
      <EditorToolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="max-h-[calc(100dvh-6rem)] min-h-72 cursor-text overflow-hidden overflow-y-scroll sm:p-6"
      />
    </div>
  );
}
