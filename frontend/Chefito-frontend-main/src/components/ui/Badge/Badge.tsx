import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { motion } from 'framer-motion';

/**
 * Badge component variants
 */
const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full px-2.5 py-0.5',
    'text-xs font-medium',
    'transition-all duration-250 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-neutral-100 text-neutral-800',
          'dark:bg-neutral-800 dark:text-neutral-200',
        ],
        primary: [
          'bg-primary-100 text-primary-800',
          'dark:bg-primary-900 dark:text-primary-200',
        ],
        secondary: [
          'bg-secondary-100 text-secondary-800',
          'dark:bg-secondary-900 dark:text-secondary-200',
        ],
        success: [
          'bg-success-100 text-success-800',
          'dark:bg-success-900 dark:text-success-200',
        ],
        warning: [
          'bg-warning-100 text-warning-800',
          'dark:bg-warning-900 dark:text-warning-200',
        ],
        error: [
          'bg-error-100 text-error-800',
          'dark:bg-error-900 dark:text-error-200',
        ],
        outline: [
          'border border-neutral-300 bg-transparent text-neutral-700',
          'dark:border-neutral-600 dark:text-neutral-300',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-105 active:scale-95',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Icon to display in the badge
   */
  icon?: React.ReactNode;
  /**
   * Whether the badge should have interactive hover effects
   */
  interactive?: boolean;
}

/**
 * Badge component for displaying status, categories, or labels
 * 
 * @example
 * ```tsx
 * <Badge variant="primary" icon={<StarIcon />}>
 *   Featured
 * </Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      icon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const BadgeComponent = interactive ? motion.div : 'div';
    const motionProps = interactive
      ? {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring', stiffness: 400, damping: 17 },
        }
      : {};

    return (
      <BadgeComponent
        ref={ref}
        className={cn(badgeVariants({ variant, size, interactive }), className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick(e as any);
                }
              }
            : undefined
        }
        {...motionProps}
        {...props}
      >
        {icon && (
          <span className="mr-1 flex-shrink-0">
            {icon}
          </span>
        )}
        {children}
      </BadgeComponent>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };