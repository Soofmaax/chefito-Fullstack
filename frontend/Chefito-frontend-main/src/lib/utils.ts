import { twMerge } from 'tailwind-merge';

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function getCurrentWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 604800000;
  return Math.floor(diff / oneWeek) + 1;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function canViewRecipe(
  recipesViewed: number,
  isPremium: boolean
): boolean {
  const freeLimit = 2;
  const premiumLimit = 4;
  const limit = isPremium ? premiumLimit : freeLimit;
  
  return recipesViewed < limit;
}

export function getRecipeViewsRemaining(
  recipesViewed: number,
  isPremium: boolean
): number {
  const freeLimit = 2;
  const premiumLimit = 4;
  const limit = isPremium ? premiumLimit : freeLimit;
  
  return Math.max(0, limit - recipesViewed);
}