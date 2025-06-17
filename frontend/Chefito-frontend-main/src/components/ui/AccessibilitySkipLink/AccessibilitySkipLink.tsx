import React from 'react';
import { cn } from '../../../lib/utils/cn';
import { useLanguage } from '../../../hooks/useLanguage';

interface AccessibilitySkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Lien de saut pour l'accessibilité
 */
export const AccessibilitySkipLink: React.FC<AccessibilitySkipLinkProps> = ({
  href,
  children,
  className,
}) => {
  const { t } = useLanguage();

  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
        'bg-primary-600 text-white px-4 py-2 rounded-md font-medium',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'z-50 transition-all duration-200',
        className
      )}
    >
      {children}
    </a>
  );
};

export default AccessibilitySkipLink;