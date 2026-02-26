import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format numbers with commas (Indian numbering system) */
export function formatIndianNumber(num: number): string {
  const str = num.toString();
  if (str.length <= 3) return str;
  let lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  if (remaining !== "") {
    lastThree = "," + lastThree;
  }
  return remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

/** Smooth scroll to element */
export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
