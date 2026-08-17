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
 * Used internally by the responsive preprocessor.
 *
 * @param fontSize - Font size in pixels
 * @param lineHeight - Line height in pixels (not a ratio)
 * @param metrics - Font metrics object
 * @returns Style object with ::before/::after margin trims
 */
export function capsize(
	fontSize: number,
	lineHeight: number,
	metrics: FontMetrics
): ReturnType<typeof createStyleObject> {
	return createStyleObject({
		fontSize,
		leading: lineHeight,
		fontMetrics: metrics
	});
}
