import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { motion } from 'framer-motion';

/**
 * Input component variants
 */
const inputVariants = cva(
  [
    'flex w-full rounded-xl border bg-white px-4 py-3',
    'text-base text-neutral-900 placeholder:text-neutral-500',
    'transition-all duration-250 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-300 dark:border-neutral-600',
          'focus-visible:border-primary-500 focus-visible:ring-primary-500',
          'hover:border-neutral-400 dark:hover:border-neutral-500',
        ],
        error: [
          'border-error-500 dark:border-error-400',
          'focus-visible:border-error-500 focus-visible:ring-error-500',
          'text-error-900 dark:text-error-100',
        ],
        success: [
          'border-success-500 dark:border-success-400',
          'focus-visible:border-success-500 focus-visible:ring-success-500',
        ],
      },
      size: {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
}

/**
 * Input component with variants, icons, and accessibility features
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   leftIcon={<MailIcon />}
 *   required
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      error,
      helperText,
      label,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const hasError = Boolean(error);
    const finalVariant = hasError ? 'error' : variant;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
          >
            {label}
            {required && (
              <span className="text-error-500 ml-1\" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-neutral-500 dark:text-neutral-400">
                {leftIcon}
              </div>
            </div>
          )}

          {/* Input field */}
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: finalVariant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={cn(
              errorId && errorId,
              helperTextId && helperTextId
            )}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="text-neutral-500 dark:text-neutral-400">
                {rightIcon}
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            id={errorId}
            className="mt-2 text-sm text-error-600 dark:text-error-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperTextId}
            className="mt-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };