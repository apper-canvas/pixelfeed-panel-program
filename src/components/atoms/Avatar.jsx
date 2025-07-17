import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ 
  src, 
  alt = "", 
  size = "default", 
  className,
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    xxl: "w-20 h-20"
  };

  const baseStyles = "rounded-full object-cover ring-2 ring-white shadow-sm";

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

export default Avatar;