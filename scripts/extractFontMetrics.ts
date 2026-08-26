/**
 * Extract font metrics from .woff2 files for use with Capsize.
 *
 * Usage:
 *   pnpm tsx scripts/extractFontMetrics.ts <font-file.woff2>
 *   pnpm tsx scripts/extractFontMetrics.ts static/fonts/Aktura-Regular.woff2
 *
 * Output: Paste the metrics object into src/lib/utils/capsize.ts
 */

import { fromFile } from '@capsizecss/unpack/fs';
import { resolve } from 'path';

async function main() {
	const fontPath = process.argv[2];

	if (!fontPath) {
		console.log('Usage: pnpm tsx scripts/extractFontMetrics.ts <font-file.woff2>');
		console.log('Example: pnpm tsx scripts/extractFontMetrics.ts static/fonts/Aktura-Regular.woff2');
		process.exit(1);
	}

	const fullPath = resolve(process.cwd(), fontPath);
	console.log('\nExtracting metrics from: ' + fullPath + '\n');

	try {
		const metrics = await fromFile(fullPath);

		// Generate TypeScript export
		const varName = (metrics.familyName || 'font')
			.replace(/[^a-zA-Z0-9]/g, '')
			.replace(/^./, (c: string) => c.toLowerCase()) + 'Metrics';

		console.log('export const ' + varName + ': FontMetrics = ' + JSON.stringify(metrics, null, '\t') + ';');
		console.log('\n// Add this to src/lib/utils/capsize.ts');
	} catch (error) {
		console.error('Error extracting metrics:', error);
		process.exit(1);
	}
}

main();
