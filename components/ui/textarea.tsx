"use client";

import * as React from "react";

import { cn, mergeRefs } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, onKeyDown, ...props }, ref) => {
    const element = React.useRef<HTMLTextAreaElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(e);
      adjustRows();
    }

    function adjustRows() {
      const textarea = element.current!;
      if (textarea.rows < 5 && textarea.offsetHeight <= textarea.scrollHeight) {
        textarea.rows++;
      }
    }

    return (
      <textarea
        onChange={handleChange}
        ref={mergeRefs(element, ref)}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
