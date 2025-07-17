import React from "react";
import { cn } from "@/utils/cn";

const TextArea = React.forwardRef(({ 
  className,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none";

  return (
    <textarea
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;