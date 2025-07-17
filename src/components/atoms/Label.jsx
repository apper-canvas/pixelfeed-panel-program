import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  const baseStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <label
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;