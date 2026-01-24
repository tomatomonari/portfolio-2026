import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Spring physics configuration for Framer Motion
export const springConfig = {
  stiffness: 400,
  damping: 25,
} as const;
