import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shad-cn className merging utility
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}