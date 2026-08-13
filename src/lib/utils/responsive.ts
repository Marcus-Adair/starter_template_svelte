import { MOBILE_DESIGN_SIZE, DESKTOP_DESIGN_SIZE } from '$lib/consts';

const pxRegex = /-?\d+(\.\d+)?px/g;
const neverPxRegex = /neverpx/g;

/**
 * Takes a CSS string and automatically scales all px values responsively.
 * Use `neverpx` to opt-out specific values (e.g., `border: 1neverpx solid black`).
 *
 * @param css - CSS string with px values
 * @returns CSS string with px values replaced by responsive calc() expressions
 *
 * @example
 * <div style={styled(`
 *   padding: 80px;
 *   font-size: 20px;
 *   border: 1neverpx solid black;
 * `)}>
 */
export function responsiveStyled(css: string): string {
	const transformed = css.replace(pxRegex, (match) => {
		const px = parseFloat(match);
		return scaled(px);
	});
	// Restore neverpx → px
	return transformed.replace(neverPxRegex, 'px');
}

/**
 * Converts a pixel value to a responsive calc() expression using CSS variable multipliers.
 *
 * Uses --is-mobile and --is-desktop CSS variables (0 or 1) to switch between:
 * - Desktop mode: vw based on 1440px design → exact px value at 1440px viewport
 * - Mobile mode: vw based on 375px design → exact px value at 375px viewport
 *
 * This ensures consistent proportions (like line breaks) across all viewport sizes.
 *
 * @param px - The pixel value from your design (works at both mobile and desktop sizes)
 * @returns CSS calc() string
 *
 * @example
 * // In a Svelte component:
 * <div style="padding: {scaled(20)}; font-size: {scaled(16)};">
 *
 * // Or in a style block with CSS variables:
 * <div style="--spacing: {scaled(24)};">
 */
export function scaled(px: number): string {
	const mobileVw = ((px / MOBILE_DESIGN_SIZE) * 100).toFixed(3);
	const desktopVw = ((px / DESKTOP_DESIGN_SIZE) * 100).toFixed(3);

	return `calc((${mobileVw}vw * var(--is-mobile)) + (${desktopVw}vw * var(--is-desktop)) + (${px}px * var(--is-full)))`;
}

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
export function scaledVar(mobilePx: number, desktopPx: number): string {
	const mobileVw = ((mobilePx / MOBILE_DESIGN_SIZE) * 100).toFixed(3);
	const desktopVw = ((desktopPx / DESKTOP_DESIGN_SIZE) * 100).toFixed(3);

	return `calc((${mobileVw}vw * var(--is-mobile)) + (${desktopVw}vw * var(--is-desktop)) + (${desktopPx}px * var(--is-full)))`;
}