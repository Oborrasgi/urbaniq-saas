"use client";

import { useEditorState } from "@tiptap/react";
import { CornerDownLeft, LinkIcon, Trash2 } from "lucide-react";
import { useState, type ComponentPropsWithRef, type FormEvent, type ReactNode } from "react";

import { getUrlFromString } from "@/components/editor/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useToolbar } from "./toolbar-provider";

interface LinkToolbarProps extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
}

function LinkToolbar({ className, children, ref, ...props }: LinkToolbarProps) {
  const { editor } = useToolbar();
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const { isActiveLink, currentHref } = useEditorState({
    editor,
    selector: (state) => ({
      isActiveLink: state.editor.isActive("link"),
      currentHref: state.editor.getAttributes("link").href as string | undefined
    })
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = getUrlFromString(link);

    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setOpen(false);
      setLink("");
    }
  };

  const handleReset = () => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
    setLink("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLink(currentHref ?? "");
    }

    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger disabled={!editor.can().chain().setLink({ href: "" }).run()} asChild>
            <Button
              size="sm"
              variant="ghost"
              ref={ref}
              className={cn("h-8 w-max px-3 font-normal", isActiveLink && "bg-accent", className)}
              {...props}
            >
              {children ?? <LinkIcon className="size-4" />}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Link</TooltipContent>
      </Tooltip>

      <PopoverContent
        asChild
        className="w-full min-w-[300px] p-1"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="https://example.com"
            />

            <div className="flex items-center gap-1">
              <Button size="sm" className="h-8" variant="ghost">
                <CornerDownLeft className="size-4" />
              </Button>

              {currentHref && (
                <Button
                  size="sm"
                  type="reset"
                  variant="ghost"
                  className="text-destructive h-8"
                  onClick={handleReset}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

LinkToolbar.displayName = "LinkToolbar";

export { LinkToolbar };
