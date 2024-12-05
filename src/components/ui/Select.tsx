import * as React from "react";

import { cn } from "@/lib/classnames";
import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "./Label";

const selectVariants = cva("select bg-background", {
  variants: {
    variant: {
      default: "",
      bordered: "select-bordered",
      ghost: "select-ghost",
      primary: "select-primary",
      secondary: "select-secondary",
      accent: "select-accent",
      success: "select-success",
      warning: "select-warning",
      info: "select-info",
      error: "select-error",
    },
    elSize: {
      xs: "select-xs",
      sm: "select-sm",
      md: "select-md",
      lg: "select-lg",
    },
  },
  defaultVariants: {
    variant: "bordered",
    elSize: "md",
  },
});

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement>, VariantProps<typeof selectVariants> {
  label?: string;
  name: string;
  value: string;
  fullWidth?: boolean;
  onValueChange: (v: string) => void;
  options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({
  variant,
  elSize,
  className,
  label,
  name,
  value,
  fullWidth,
  onValueChange,
  options,
  ...props
}) => {
  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "")}>
      {label && (
        <div className="mr-2 mb-1">
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
      <select
        name={name}
        className={cn(selectVariants({ variant, elSize }), className, { "w-full": fullWidth })}
        {...props}
        value={value}
        onChange={(e) => {
          onValueChange(e.currentTarget.value);
        }}
      >
        {options.map((option) => {
          return <option value={option.value} key={option.value} label={option.label} />;
        })}
      </select>
    </div>
  );
};

export { Select };
