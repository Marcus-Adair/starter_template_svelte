import { DESKTOP_DESIGN_SIZE, MOBILE_DESIGN_SIZE } from "$lib/consts";

/**
 * Generates a CSS calc() string for a CSS variable that needs different values at mobile vs desktop.
 * Run this in browser console or a script, then paste the output into your CSS.
 *
 * @param mobilePx - The pixel value at mobile design size (375px)
 * @param desktopPx - The pixel value at desktop design size (1440px)
 * @returns CSS calc() string to paste into your stylesheet
 *
 * @example
 * // In browser console:
 * scaledVar(16, 24)
 * // Returns: "calc((4.267vw * var(--is-mobile)) + (1.667vw * var(--is-desktop)) + (24px * var(--is-full)))"
 * // Then paste into CSS:
 * // --grid-gap: calc((4.267vw * var(--is-mobile)) + ...);
 */
export function scaledGridVar(mobilePx: number, desktopPx: number): string {
	const mobileVw = ((mobilePx / MOBILE_DESIGN_SIZE) * 100).toFixed(3);
	const desktopVw = ((desktopPx / DESKTOP_DESIGN_SIZE) * 100).toFixed(3);

	return `calc((${mobileVw}vw * var(--is-mobile)) + (${desktopVw}vw * var(--is-desktop)) + (${desktopPx}px * var(--is-full)))`;
}