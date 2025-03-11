import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled";
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    disabled: "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50",
  };

  return (
    <UIButton
      className={cn(variants[variant], "flex items-center gap-2 px-4 py-2 rounded-md", className)}
      disabled={variant === "disabled"}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </UIButton>
  );
};

export default Button;