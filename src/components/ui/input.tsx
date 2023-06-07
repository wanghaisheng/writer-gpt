import * as React from "react";

import { cn } from "@lib/utils";

import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-2 flex-1 w-full">
        <Label htmlFor={id}>API Key</Label>

        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          id={id}
          ref={ref}
          {...props}
        />

        {!!error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
