/**
 * Font Metrics Extraction Script
 *
 * This script extracts font metrics needed for Capsize to trim whitespace
 * above/below text. Run this whenever you change the primary font.
 *
 * HOW TO USE WITH A DIFFERENT FONT:
 *
 * 1. Add your font file to /static/fonts/
 *    - Supports: .woff2, .woff, .ttf, .otf
 *    - Variable fonts work great
 *
 * 2. Update the FONT_PATH below to point to your font file
 *
 * 3. Run: npx tsx scripts/extractFontMetrics.ts
 *
 * 4. Copy the output into src/lib/utils/capsize.ts:
 *    - Replace the values in satoshiMetrics (or rename the export)
 *    - You only need: capHeight, ascent, descent, lineGap, unitsPerEm
 *
 * 5. Update @font-face in layout.css to match your new font
 *
 * Example output you'll see:
 *   {
 *     "capHeight": 740,
 *     "ascent": 1010,
 *     "descent": -240,
 *     "lineGap": 100,
 *     "unitsPerEm": 1000,
 *     ...
 *   }
 */

import { fromFile } from '@capsizecss/unpack/fs';

// Change this path when using a different font
const FONT_PATH = './static/fonts/Satoshi-Variable.woff2';

async function extract() {
	const metrics = await fromFile(FONT_PATH);

	console.log('Font Metrics for:', FONT_PATH);
	console.log(JSON.stringify(metrics, null, 2));

	console.log('\n--- Copy these values into capsize.ts ---\n');
	console.log(`export const fontMetrics: FontMetrics = {
  capHeight: ${metrics.capHeight},
  ascent: ${metrics.ascent},
  descent: ${metrics.descent},
  lineGap: ${metrics.lineGap},
  unitsPerEm: ${metrics.unitsPerEm}
};`);
}

extract();
