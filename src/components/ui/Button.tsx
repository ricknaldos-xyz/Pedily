import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cta-white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  shimmer?: boolean;
  href?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  "cta-white":
    "bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      glow = false,
      shimmer = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]",
          sizeStyles[size],
          variantStyles[variant],
          glow && "animate-glow-pulse",
          shimmer && "btn-shimmer",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
