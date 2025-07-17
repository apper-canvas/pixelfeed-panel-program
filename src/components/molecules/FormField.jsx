import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  multiline = false, 
  error, 
  className,
  ...props 
}) => {
  const InputComponent = multiline ? TextArea : Input;

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={props.id || props.name}>
          {label}
        </Label>
      )}
      <InputComponent
        type={type}
        {...props}
        className={cn(
          error && "border-error focus:border-error focus:ring-error/20",
          props.className
        )}
      />
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormField;