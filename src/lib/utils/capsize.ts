import { createStyleObject } from '@capsizecss/core';
import type { FontMetrics } from '@capsizecss/core';

/**
 * Satoshi font metrics extracted via @capsizecss/unpack
 * Run: npx tsx scripts/extractFontMetrics.ts to regenerate
 */
export const satoshiMetrics: FontMetrics = {
	capHeight: 740,
	ascent: 1010,
	descent: -240,
	lineGap: 100,
	unitsPerEm: 1000
};

// Default font metrics (Satoshi)
export const fontMetrics = satoshiMetrics;

/**
 * Generates Capsize styles that trim extra space above/below text.
 *
 * @param fontSize - Font size in pixels
 * @param lineHeight - Line height in pixels (not a ratio)
 * @param fontMetrics - Font metrics object (import from @capsizecss/metrics)
 * @returns Style object with fontSize, lineHeight, and ::before/::after trims
 *
 * @example
 * // Basic usage
 * const styles = capsize(16, 24, fontMetrics);
 *
 * // In Svelte component
 * <p style={capsizeStyle(16, 24, fontMetrics)}>
 *   Text with trimmed whitespace
 * </p>
 */
export function capsize(
	fontSize: number,
	lineHeight: number,
	fontMetrics: FontMetrics
): ReturnType<typeof createStyleObject> {
	return createStyleObject({
		fontSize,
		leading: lineHeight,
		fontMetrics
	});
}

/**
 * Converts Capsize style object to a CSS string for inline styles.
 * Note: ::before/::after won't work inline - use capsizeClass() for full effect.
 *
 * @returns CSS string with font-size and line-height only
 */
export function capsizeStyle(
	fontSize: number,
	lineHeight: number,
	fontMetrics: FontMetrics
): string {
	const styles = capsize(fontSize, lineHeight, fontMetrics);
	return `font-size: ${styles.fontSize}; line-height: ${styles.lineHeight};`;
}

/**
 * Generates CSS class string for use in a <style> block.
 * This includes the ::before/::after pseudo-elements for full trim effect.
 *
 * @param className - The class name to generate
 * @returns CSS string to put in a <style> block
 *
 * @example
 * // In your component:
 * <style>
 *   {@html capsizeClass('trimmed-text', 16, 24, fontMetrics)}
 * </style>
 * <p class="trimmed-text">Trimmed text</p>
 */
export function capsizeClass(
	className: string,
	fontSize: number,
	lineHeight: number,
	metrics: FontMetrics
): string {
	const styles = capsize(fontSize, lineHeight, metrics);

	return `
.${className} {
	font-size: ${styles.fontSize};
	line-height: ${styles.lineHeight};
}
.${className}::before {
	content: '';
	display: block;
	height: 0;
	margin-bottom: ${styles['::before'].marginBottom};
}
.${className}::after {
	content: '';
	display: block;
	height: 0;
	margin-top: ${styles['::after'].marginTop};
}`;
}
