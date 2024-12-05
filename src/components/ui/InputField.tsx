import { cn } from "@/lib/classnames";
import React from "react";
import { Input } from "./Input";
import { Label } from "./Label";

interface InputFieldProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  min?: string | number | undefined;
  max?: string | number | undefined;
  elSize?: "xs" | "sm" | "md" | "lg";
}

const InputField: React.FC<InputFieldProps> = ({
  label = "",
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  fullWidth = false,
  min,
  max,
  elSize = "md",
}) => {
  return (
    <div className={cn("text-field mb-4")}>
      {label && (
        <div className="mr-2 mb-1">
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
      <Input
        className={cn({ "w-full": fullWidth })}
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        elSize={elSize}
      />
    </div>
  );
};

export default InputField;
