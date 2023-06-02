"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  loading?: boolean;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, loading, error, ...props }, ref) => {
    return (
      <div className="relative w-full flex-1">
        <textarea
          className={cn(
            "flex min-h-[10rem] max-h-72 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition",
            className,
            !!error && "border-red-600 focus-visible:ring-red-600"
          )}
          ref={ref}
          {...props}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/40 dark:bg-slate-900/60 cursor-wait">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {!!error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
