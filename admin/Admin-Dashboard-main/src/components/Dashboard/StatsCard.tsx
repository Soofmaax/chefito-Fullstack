import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: LucideIcon;
  gradient: string;
  loading?: boolean;
}

export function StatsCard({ title, value, change, icon: Icon, gradient, loading = false }: StatsCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl p-6 bg-gray-200 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-8 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="p-3 bg-gray-300 rounded-full">
            <div className="h-6 w-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200', gradient)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={clsx(
                'text-sm font-medium',
                change.trend === 'up' ? 'text-green-200' : 'text-red-200'
              )}>
                {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-white/60 text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-white/20 rounded-full">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}