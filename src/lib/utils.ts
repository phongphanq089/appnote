import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStringSizeInBytes = (str: string) => {
  return new Blob([str]).size
}
export const MAX_NOTE_SIZE = 15 * 1024 * 1024
