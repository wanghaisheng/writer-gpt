"use client";

import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pen, Rotate3d } from "lucide-react";

import { Button } from "./button";

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "flex flex-col min-h-[10rem] max-h-72 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition"
      }
    }
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex flex-col rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Button variant="item" size="sm">
            <Rotate3d className="mr-2 h-4 w-4" />
            <span>Regenerate</span>
          </Button>

          <Button variant="item" size="sm">
            <Pen className="mr-2 h-4 w-4" />
            <span>Prompt</span>
          </Button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </>
  );
};
