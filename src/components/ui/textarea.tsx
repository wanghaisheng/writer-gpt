"use client";

import * as React from "react";

import { cn } from "@lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  action?: JSX.Element;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, action, ...props }, ref) => {
    return (
      <div className="relative w-full flex-1">
        <textarea
          className={cn(
            "flex min-h-[10rem] max-h-52 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition",
            className
          )}
          ref={ref}
          {...props}
        />

        <div className="absolute bottom-2 right-2">{action}</div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
