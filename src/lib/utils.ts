import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Appends WebP formatting parameters to supported image URLs to optimize loading performance.
 * @param url Original image URL
 * @returns Optimized image URL
 */
export function optimizeImage(url: string | undefined | null): string {
  if (!url) return ''

  if (url.includes('usecurling.com')) {
    return url.includes('?') ? `${url}&fmt=webp` : `${url}?fmt=webp`
  }

  if (url.includes('supabase.co/storage')) {
    return url.includes('?') ? `${url}&format=webp` : `${url}?format=webp`
  }

  return url
}
