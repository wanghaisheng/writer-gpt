import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";

export const hasKeywords = (value?: string): boolean => {
  if (value === undefined) {
    return false;
  }

  const regex = /^- [\w\s]+(\n- [\w\s]+)*$/gm;
  return regex.test(value);
};
