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
	unitsPerEm: 1000,
	familyName: "Satoshi Variable",
	fullName: "Satoshi Variable Bold",
	postscriptName: "SatoshiVariable-Bold",
	xHeight: 500,
	xWidthAvg: 486,
};

export const akturaMetrics: FontMetrics = {
	familyName: "Aktura",
	fullName: "Aktura Regular",
	postscriptName: "Aktura-Regular",
	capHeight: 668,
	ascent: 940,
	descent: -400,
	lineGap: 70,
	unitsPerEm: 1000,
	xHeight: 500,
	xWidthAvg: 341,
	subsets: {
		latin: {
			xWidthAvg: 341
		},
		thai: {
			xWidthAvg: 633
		}
	}
};

// Default font metrics (Satoshi)
export const fontMetrics = satoshiMetrics;

// TODO: do so for new font ... 

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
