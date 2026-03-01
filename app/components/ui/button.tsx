import React from "react";
import { cn } from "@/app/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "ghost" | "default";
  size?: "icon" | "sm" | "default";
};

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:opacity-95",
    outline:
      "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]",
    ghost: "hover:bg-[var(--muted)]",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-sm",
    icon: "h-10 w-10 shrink-0",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
