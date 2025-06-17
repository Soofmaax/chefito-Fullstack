import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Heart, User, ChefHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils/cn';
import { useLanguage } from '../../../hooks/useLanguage';

interface BottomNavigationProps {
  className?: string;
}

/**
 * Bottom Navigation for mobile devices
 */
export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    {
      icon: Home,
      label: t('navigation.home'),
      path: '/',
      key: 'home'
    },
    {
      icon: Search,
      label: t('navigation.search'),
      path: '/search',
      key: 'search'
    },
    {
      icon: ChefHat,
      label: t('navigation.recipes'),
      path: '/recipes',
      key: 'recipes'
    },
    {
      icon: Heart,
      label: t('navigation.favorites'),
      path: '/favorites',
      key: 'favorites'
    },
    {
      icon: User,
      label: t('navigation.profile'),
      path: '/account',
      key: 'profile'
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg',
        'border-t border-neutral-200 dark:border-neutral-700',
        'safe-area-pb',
        'md:hidden', // Hide on desktop
        className
      )}
      role="navigation"
      aria-label={t('navigation.mobile_main_nav_aria_label')}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.key}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center',
                'px-3 py-2 rounded-xl transition-all duration-200',
                'min-w-[60px] relative',
                active
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
              aria-label={item.label}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="bottomNavActiveIndicator"
                  className="absolute inset-0 bg-primary-50 dark:bg-primary-900/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative z-10"
              >
                <IconComponent 
                  className={cn(
                    'w-6 h-6 mb-1',
                    active && 'scale-110'
                  )} 
                />
              </motion.div>
              
              {/* Label */}
              <span 
                className={cn(
                  'text-xs font-medium relative z-10',
                  'max-w-[50px] truncate'
                )}
              >
                {item.label}
              </span>
              
              {/* Active dot */}
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
