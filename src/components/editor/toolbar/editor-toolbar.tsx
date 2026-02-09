import { Editor } from "@tiptap/core";

import { TooltipProvider } from "@/components/ui/tooltip";

import { AlignmentToolbar } from "./alignment";
import { BlockquoteToolbar } from "./blockquote";
import { BoldToolbar } from "./bold";
import { BulletListToolbar } from "./bullet-list";
import { CodeToolbar } from "./code";
import { CodeBlockToolbar } from "./code-block";
import { HeadingsToolbar } from "./headings";
import { HorizontalRuleToolbar } from "./horizontal-rule";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";
import { ItalicToolbar } from "./italic";
import { LinkToolbar } from "./link";
import { OrderedListToolbar } from "./ordered-list";
import { RedoToolbar } from "./redo";
import { StrikeThroughToolbar } from "./strikethrough";
import { ToolbarProvider } from "./toolbar-provider";
import { UnderlineToolbar } from "./underline";
import { UndoToolbar } from "./undo";

export function EditorToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="bg-background w-full rounded-t-lg border-b">
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-1 px-2 py-1">
            {/* History Group */}
            <UndoToolbar />
            <RedoToolbar />
            <div className="bg-border mx-1 h-5 w-px" />

            {/* Text Structure Group */}
            <HeadingsToolbar />
            <BlockquoteToolbar />
            <CodeToolbar />
            <CodeBlockToolbar />
            <div className="bg-border mx-1 h-5 w-px" />

            {/* Basic Formatting Group */}
            <BoldToolbar />
            <ItalicToolbar />
            <UnderlineToolbar />
            <StrikeThroughToolbar />
            <LinkToolbar />
            <div className="bg-border mx-1 h-5 w-px" />

            {/* Lists & Structure Group */}
            <BulletListToolbar />
            <OrderedListToolbar />
            <HorizontalRuleToolbar />
            <div className="bg-border mx-1 h-5 w-px" />

            {/* Alignment Group */}
            <AlignmentToolbar />
            <div className="bg-border mx-1 h-5 w-px" />

            {/* Media & Styling Group */}
            <ImagePlaceholderToolbar />

            <div className="flex-1" />
          </div>
        </TooltipProvider>
      </ToolbarProvider>
    </div>
  );
}
