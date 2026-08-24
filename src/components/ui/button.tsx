import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "primary-outlined" | "secondary-outlined";
  
}

export function Button({ children, variant, ...rest }: ButtonProps) {
  let className = "";
  switch (variant) {
    case "primary":
      className = "bg-primary text-white hover:bg-primary/90";
      break;
    case "secondary":
      className = "bg-secondary text-white";
      break;
    case "primary-outlined":
      className = "border border-primary text-primary";
      break;
    case "secondary-outlined":
      className = "border border-secondary text-secondary";
      break;
  }
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-lg ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
