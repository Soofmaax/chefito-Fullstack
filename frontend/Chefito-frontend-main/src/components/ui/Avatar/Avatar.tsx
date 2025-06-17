import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { motion } from 'framer-motion';

/**
 * Avatar component variants
 */
const avatarVariants = cva(
  [
    'relative flex shrink-0 overflow-hidden rounded-full',
    'bg-neutral-100 dark:bg-neutral-800',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text to display when image is not available
   */
  fallback?: string;
  /**
   * Whether the avatar should have hover animations
   */
  interactive?: boolean;
}

/**
 * Avatar component for displaying user profile images
 * 
 * @example
 * ```tsx
 * <Avatar
 *   src="/user-avatar.jpg"
 *   alt="John Doe"
 *   fallback="JD"
 *   size="lg"
 *   interactive
 * />
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      src,
      alt,
      fallback,
      interactive = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    const showFallback = !src || imageError || !imageLoaded;

    const AvatarComponent = interactive ? motion.div : 'div';
    const motionProps = interactive
      ? {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring', stiffness: 400, damping: 17 },
        }
      : {};

    return (
      <AvatarComponent
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...motionProps}
        {...props}
      >
        {src && !imageError && (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        
        {showFallback && (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            {fallback ? (
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase">
                {fallback}
              </span>
            ) : (
              <svg
                className="h-1/2 w-1/2 text-neutral-400 dark:text-neutral-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
        )}

        {/* Loading state */}
        {src && !imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600 dark:border-neutral-600 dark:border-t-neutral-300" />
          </div>
        )}
      </AvatarComponent>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };