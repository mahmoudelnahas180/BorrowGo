import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2";

  const variantStyles = {
    primary:
      "bg-button-primary hover:bg-button-primary-hover text-button-primary-text shadow-md hover:shadow-lg",
    secondary:
      "bg-button-secondary hover:bg-secondary text-button-secondary-text shadow-sm hover:shadow-md",
    outline:
      "border-2 border-primary text-primary hover:bg-primary/10 bg-transparent",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
