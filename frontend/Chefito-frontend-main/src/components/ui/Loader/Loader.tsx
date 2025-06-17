import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { motion } from 'framer-motion';

/**
 * Loader component variants
 */
const loaderVariants = cva('', {
  variants: {
    variant: {
      spinner: 'animate-spin rounded-full border-2 border-current border-t-transparent',
      dots: 'flex space-x-1',
      pulse: 'animate-pulse rounded-full bg-current',
      bars: 'flex space-x-1',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Spinner sizes
    {
      variant: 'spinner',
      size: 'xs',
      class: 'h-4 w-4',
    },
    {
      variant: 'spinner',
      size: 'sm',
      class: 'h-6 w-6',
    },
    {
      variant: 'spinner',
      size: 'md',
      class: 'h-8 w-8',
    },
    {
      variant: 'spinner',
      size: 'lg',
      class: 'h-12 w-12',
    },
    {
      variant: 'spinner',
      size: 'xl',
      class: 'h-16 w-16',
    },
    // Pulse sizes
    {
      variant: 'pulse',
      size: 'xs',
      class: 'h-4 w-4',
    },
    {
      variant: 'pulse',
      size: 'sm',
      class: 'h-6 w-6',
    },
    {
      variant: 'pulse',
      size: 'md',
      class: 'h-8 w-8',
    },
    {
      variant: 'pulse',
      size: 'lg',
      class: 'h-12 w-12',
    },
    {
      variant: 'pulse',
      size: 'xl',
      class: 'h-16 w-16',
    },
  ],
  defaultVariants: {
    variant: 'spinner',
    size: 'md',
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  /**
   * Loading text to display below the loader
   */
  text?: string;
}

/**
 * Loader component with multiple animation variants
 * 
 * @example
 * ```tsx
 * <Loader variant="spinner" size="lg" text="Loading recipes..." />
 * ```
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant, size, text, ...props }, ref) => {
    const renderLoader = () => {
      switch (variant) {
        case 'dots':
          return (
            <div className={cn(loaderVariants({ variant }), className)}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'rounded-full bg-current',
                    size === 'xs' && 'h-1 w-1',
                    size === 'sm' && 'h-1.5 w-1.5',
                    size === 'md' && 'h-2 w-2',
                    size === 'lg' && 'h-3 w-3',
                    size === 'xl' && 'h-4 w-4'
                  )}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          );

        case 'bars':
          return (
            <div className={cn(loaderVariants({ variant }), className)}>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'bg-current rounded-sm',
                    size === 'xs' && 'h-4 w-1',
                    size === 'sm' && 'h-6 w-1',
                    size === 'md' && 'h-8 w-1.5',
                    size === 'lg' && 'h-12 w-2',
                    size === 'xl' && 'h-16 w-2.5'
                  )}
                  animate={{
                    scaleY: [1, 0.4, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          );

        case 'pulse':
          return (
            <div className={cn(loaderVariants({ variant, size }), className)} />
          );

        default:
          return (
            <div className={cn(loaderVariants({ variant, size }), className)} />
          );
      }
    };

    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center"
        role="status"
        aria-label={text || 'Loading'}
        {...props}
      >
        {renderLoader()}
        {text && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {text}
          </p>
        )}
      </div>
    );
  }
);

Loader.displayName = 'Loader';

export { Loader, loaderVariants };