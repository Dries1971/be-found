"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseStyles = [
  "w-full rounded-[var(--radius-md)] border border-border",
  "bg-background-secondary text-foreground",
  "placeholder:text-foreground-muted/60",
  "transition-colors duration-[var(--duration-fast)]",
  "focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring",
  "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
].join(" ");

/* ─── Text / Email / Password / Number Input ─── */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, error, type = "text", ...props }, ref) {
    return (
      <input
        type={type}
        className={cn(
          baseStyles,
          "h-10 px-3 text-sm",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

/* ─── Textarea ─── */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, ...props }, ref) {
    return (
      <textarea
        className={cn(
          baseStyles,
          "min-h-[80px] px-3 py-2 text-sm",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

/* ─── Select ─── */

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, error, children, ...props }, ref) {
    return (
      <select
        className={cn(
          baseStyles,
          "h-10 px-3 pr-8 text-sm appearance-none",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

/* ─── Label ─── */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  );
}

/* ─── Field Error ─── */

export function FieldError({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-destructive mt-1", className)}
      role="alert"
      {...props}
    />
  );
}
