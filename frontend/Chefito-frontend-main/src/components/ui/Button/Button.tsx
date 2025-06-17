import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';

/**
 * Button component variants
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-xl font-medium',
    'transition-all duration-250 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white shadow-sm',
          'hover:bg-primary-700 hover:shadow-md',
          'focus-visible:ring-primary-500',
          'dark:bg-primary-600 dark:hover:bg-primary-700',
        ],
        secondary: [
          'bg-secondary-500 text-white shadow-sm',
          'hover:bg-secondary-600 hover:shadow-md',
          'focus-visible:ring-secondary-500',
          'dark:bg-secondary-600 dark:hover:bg-secondary-700',
        ],
        outline: [
          'border-2 border-primary-700 text-primary-800 bg-transparent',
          'hover:bg-primary-700 hover:text-white',
          'focus-visible:ring-primary-700',
          'dark:border-primary-400 dark:text-primary-400',
          'dark:hover:bg-primary-400 dark:hover:text-primary-900',
        ],
        ghost: [
          'text-primary-600 bg-transparent',
          'hover:bg-primary-50 hover:text-primary-600',
          'focus-visible:ring-primary-500',
          'dark:text-primary-400 dark:hover:bg-primary-900/20',
        ],
        danger: [
          'bg-error-500 text-white shadow-sm',
          'hover:bg-error-600 hover:shadow-md',
          'focus-visible:ring-error-500',
          'dark:bg-error-600 dark:hover:bg-error-700',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
  /**
   * Use as a different component (e.g., Link)
   */
  as?: React.ElementType;
  /**
   * Additional props for the component
   */
  [key: string]: any;
}

/**
 * Button component with variants and accessibility features
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" icon={<PlusIcon />}>
 *   Add Recipe
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      icon,
      loading,
      disabled,
      children,
      as,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const Component = as || 'button';

    const buttonContent = (
      <>
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        
        {icon && !loading && (
          <span className="mr-2 flex-shrink-0">
            {icon}
          </span>
        )}
        
        {children}
      </>
    );

    if (as) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, fullWidth }), className)}
          {...props}
        >
          <Component>
            {buttonContent}
          </Component>
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };