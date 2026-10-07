import type { PreprocessorGroup } from 'svelte/compiler';
import { capsize, fontMetrics } from '../utils/capsize.ts';
import { text } from '../text.ts';

// Same as in $lib/consts.ts
export const MOBILE_DESIGN_SIZE = 375;
export const DESKTOP_DESIGN_SIZE = 1440;
export const MOBILE_BREAKPOINT = 700;

const pxRegex = /-?\d+(\.\d+)?px/g;
const fontSizeRegex = /font-size:\s*(\d+(?:\.\d+)?)px/;
const lineHeightPxRegex = /line-height:\s*(\d+(?:\.\d+)?)px/;
const lineHeightUnitlessRegex = /line-height:\s*(\d+(?:\.\d+)?)\s*;/;
const textDirectiveRegex = /@text\s+(\w+)\s*;?/g;

/**
 * Properties that should use media queries instead of calc() for better
 * browser performance (especially Safari with large font sizes).
 * Add properties here that cause rendering issues with calc-based scaling.
 */
const MEDIA_PREFERRED_PROPERTIES = ['font-size', 'line-height'];

// =============================================================================
// Core conversion helpers (single source of truth for responsive math)
// =============================================================================

/** Convert px to vw for mobile design size */
const toMobileVw = (px: number): string => `${((px / MOBILE_DESIGN_SIZE) * 100).toFixed(3)}vw`;

/** Convert px to vw for desktop design size */
const toDesktopVw = (px: number): string => `${((px / DESKTOP_DESIGN_SIZE) * 100).toFixed(3)}vw`;

/** Keep as px (for full width breakpoint) */
const toPx = (px: number): string => `${px}px`;

// =============================================================================
// Calc engine (default) - single expression with CSS var toggles
// =============================================================================

/**
 * Transforms px values to responsive calc() for all breakpoints.
 * Uses CSS vars --is-mobile, --is-desktop, --is-full to switch.
 */
function scaledAll(px: number): string {
	return `calc((${toMobileVw(px)} * var(--is-mobile)) + (${toDesktopVw(px)} * var(--is-desktop)) + (${toPx(px)} * var(--is-full)))`;
}

/**
 * Transforms px values to vw for mobile only.
 * Used inside @small media query where we know we're on mobile.
 */
function scaledMobile(px: number): string {
	return toMobileVw(px);
}

/**
 * Transforms px values for large screens (desktop + full).
 * Uses calc with --is-desktop and --is-full vars since @large spans both.
 */
function scaledLarge(px: number): string {
	return `calc((${toDesktopVw(px)} * var(--is-desktop)) + (${toPx(px)} * var(--is-full)))`;
}

/**
 * Replace all px values in a CSS string using the given transform function.
 */
function transformPxValues(css: string, transform: (px: number) => string): string {
	return css.replace(pxRegex, (match) => {
		const px = parseFloat(match);
		return transform(px);
	});
}

// =============================================================================
// Engine switching - auto-detect and split by property type
// =============================================================================

/** Regex to match a CSS declaration: property: value; */
const declarationRegex = /([a-z-]+)\s*:\s*([^;]+);?/gi;

/**
 * Check if a property should use media queries instead of calc.
 */
function isMediaPreferred(property: string): boolean {
	return MEDIA_PREFERRED_PROPERTIES.includes(property.toLowerCase());
}

/**
 * Split CSS declarations into calc-preferred and media-preferred groups.
 * Returns { calcCss, mediaCss } where each is a string of declarations.
 * Note: Only properties with px values go to mediaCss; unitless values pass through.
 */
function splitByEngine(css: string): { calcCss: string; mediaCss: string } {
	const calcDeclarations: string[] = [];
	const mediaDeclarations: string[] = [];

	let match;
	// Reset regex state
	declarationRegex.lastIndex = 0;

	while ((match = declarationRegex.exec(css)) !== null) {
		const [fullMatch, property, value] = match;
		const declaration = fullMatch.endsWith(';') ? fullMatch : `${fullMatch};`;

		// Only use media queries for properties that prefer them AND have px values
		if (isMediaPreferred(property) && value.includes('px')) {
			mediaDeclarations.push(declaration);
		} else {
			calcDeclarations.push(declaration);
		}
	}

	return {
		calcCss: calcDeclarations.join(' '),
		mediaCss: mediaDeclarations.join(' ')
	};
}

/**
 * Generate media query CSS for a selector with responsive values.
 * Outputs 3 media queries: mobile, desktop, and full-width.
 */
function generateMediaQueryCSS(selector: string, css: string): string {
	const mobile = transformPxValues(css, toMobileVw);
	const desktop = transformPxValues(css, toDesktopVw);
	const full = transformPxValues(css, toPx);

	return `
@media (max-width: ${MOBILE_BREAKPOINT}px) { ${selector} { ${mobile} } }
@media (min-width: ${MOBILE_BREAKPOINT + 1}px) and (max-width: ${DESKTOP_DESIGN_SIZE}px) { ${selector} { ${desktop} } }
@media (min-width: ${DESKTOP_DESIGN_SIZE + 1}px) { ${selector} { ${full} } }`;
}

/**
 * Expand @text directives to their CSS definitions.
 * @text h1; → font-size: 64px; line-height: 72px; font-weight: 700;
 */
function expandTextDirectives(css: string): string {
	return css.replace(textDirectiveRegex, (_match: string, styleName: string) => {
		const style = text[styleName];
		if (!style) {
			console.warn(`[responsive-preprocess] Unknown text style: "${styleName}"`);
			return '';
		}
		return style;
	});
}

/**
 * Check if CSS contains font-size (px) and line-height (px or unitless ratio).
 * For unitless line-height, computes px value as fontSize * ratio.
 * Returns the values if found, null otherwise.
 */
function extractCapsizeValues(css: string): { fontSize: number; lineHeight: number } | null {
	const fontSizeMatch = css.match(fontSizeRegex);
	if (!fontSizeMatch) return null;

	const fontSize = parseFloat(fontSizeMatch[1]);

	// Try px line-height first
	const lineHeightPxMatch = css.match(lineHeightPxRegex);
	if (lineHeightPxMatch) {
		return { fontSize, lineHeight: parseFloat(lineHeightPxMatch[1]) };
	}

	// Try unitless line-height (ratio)
	const lineHeightUnitlessMatch = css.match(lineHeightUnitlessRegex);
	if (lineHeightUnitlessMatch) {
		const ratio = parseFloat(lineHeightUnitlessMatch[1]);
		return { fontSize, lineHeight: fontSize * ratio };
	}

	return null;
}

/**
 * Append a pseudo-element to a selector, handling :global() wrappers.
 * :global(.foo) + ::before → :global(.foo::before)
 * .foo + ::before → .foo::before
 */
function appendPseudoElement(selector: string, pseudo: string): string {
	const globalMatch = selector.match(/^(.*?):global\((.+)\)$/);
	if (globalMatch) {
		const [, prefix, inner] = globalMatch;
		return `${prefix}:global(${inner}${pseudo})`;
	}
	return `${selector}${pseudo}`;
}

/**
 * Generate Capsize ::before and ::after rules for a selector.
 */
function generateCapsizeRules(selector: string, fontSize: number, lineHeight: number): string {
	const styles = capsize(fontSize, lineHeight, fontMetrics);
	const beforeSelector = appendPseudoElement(selector, '::before');
	const afterSelector = appendPseudoElement(selector, '::after');
	return `
${beforeSelector} {
	content: '';
	display: table;
	margin-bottom: ${styles['::before'].marginBottom};
}
${afterSelector} {
	content: '';
	display: table;
	margin-top: ${styles['::after'].marginTop};
}`;
}

/**
 * Process @responsive, @small, @large directives within a selector block.
 * Auto-applies Capsize when font-size + line-height are present.
 *
 * Input:
 *   .text {
 *     @responsive { font-size: 18px; line-height: 28px; }
 *   }
 *
 * Output:
 *   .text {
 *     font-size: calc(...);
 *     line-height: calc(...);
 *   }
 *   .text::before { content: ''; display: table; margin-bottom: -0.5em; }
 *   .text::after { content: ''; display: table; margin-top: -0.5em; }
 */
function processStyleContent(content: string): string {
	// Extract and preserve CSS comments to prevent regex from matching braces inside them
	const comments: string[] = [];
	let result = content.replace(/\/\*[\s\S]*?\*\//g, (match) => {
		comments.push(match);
		return `/*__COMMENT_${comments.length - 1}__*/`;
	});

	const mediaBlocks: { query: string; rules: string }[] = [];
	const capsizeBlocks: string[] = [];

	// Match selector blocks: selector { ... }
	// This regex handles nested braces by matching the outermost block
	const selectorBlockRegex = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;

	result = result.replace(selectorBlockRegex, (fullMatch, selector, body) => {
		selector = selector.trim();
		let newBody = body;

		// Check if this selector opts out of capsize
		const noCapsizeSelector = selector.endsWith('.no-capsize') || selector.includes('.no-capsize ');

		// Process @responsive { ... }
		newBody = newBody.replace(/@responsive\s*\{([^}]+)\}/g, (_match: string, css: string) => {
			// First expand any @text directives
			const expandedCss = expandTextDirectives(css);

			// Check for Capsize (font-size + line-height)
			if (!noCapsizeSelector) {
				const capsizeValues = extractCapsizeValues(expandedCss);
				if (capsizeValues) {
					capsizeBlocks.push(
						generateCapsizeRules(selector, capsizeValues.fontSize, capsizeValues.lineHeight)
					);
				}
			}

			// Split by engine: calc for most properties, media queries for font-size etc.
			const { mediaCss } = splitByEngine(expandedCss);

			// Generate media queries for media-preferred properties (e.g., font-size)
			// These override the calc fallback for browsers that support range syntax
			if (mediaCss) {
				mediaBlocks.push({
					query: '', // Empty query = raw CSS (already contains media queries)
					rules: generateMediaQueryCSS(selector, mediaCss)
				});
			}

			// Return ALL properties as calc() - this serves as fallback for old browsers
			// that don't understand range syntax media queries.
			// New browsers will use the media queries (added later) which override these.
			return transformPxValues(expandedCss, scaledAll);
		});

		// Process @small { ... } - extract to media query
		newBody = newBody.replace(/@small\s*\{([^}]+)\}/g, (_match: string, css: string) => {
			const expandedCss = expandTextDirectives(css);
			const transformed = transformPxValues(expandedCss, scaledMobile);
			mediaBlocks.push({
				query: `@media (max-width: ${MOBILE_BREAKPOINT}px)`,
				rules: `${selector} { ${transformed} }`
			});
			return ''; // Remove from original location
		});

		// Process @large { ... } - extract to media query
		newBody = newBody.replace(/@large\s*\{([^}]+)\}/g, (_match: string, css: string) => {
			const expandedCss = expandTextDirectives(css);
			const transformed = transformPxValues(expandedCss, scaledLarge);
			mediaBlocks.push({
				query: `@media (min-width: ${MOBILE_BREAKPOINT + 1}px)`,
				rules: `${selector} { ${transformed} }`
			});
			return ''; // Remove from original location
		});

		// Clean up extra whitespace/semicolons
		newBody = newBody.replace(/;\s*;/g, ';').trim();

		return `${selector} { ${newBody} }`;
	});

	// Append Capsize pseudo-element rules
	for (const block of capsizeBlocks) {
		result += block;
	}

	// Append media query blocks at the end
	for (const block of mediaBlocks) {
		if (block.query) {
			// Standard media query block
			result += `\n${block.query} { ${block.rules} }`;
		} else {
			// Raw CSS (already contains media queries from engine switching)
			result += block.rules;
		}
	}

	// Restore CSS comments
	result = result.replace(/\/\*__COMMENT_(\d+)__\*\//g, (_, index) => {
		return comments[parseInt(index, 10)];
	});

	return result;
}

/**
 * Svelte preprocessor for responsive styles.
 *
 * Transforms custom directives in <style> blocks:
 * - @responsive { ... } - scales px values across all breakpoints
 * - @small { ... } - applies styles only on mobile (≤700px), scales for mobile
 * - @large { ... } - applies styles only on desktop+ (>700px), scales for desktop/full
 * - @text styleName; - expands to typography from text.ts (use inside @responsive)
 *
 * Capsize Integration:
 * When @responsive contains both font-size and line-height (in px),
 * automatically generates ::before/::after rules to trim whitespace.
 * Add .no-capsize to the selector to opt out.
 *
 * @example
 * ```svelte
 * <h1 class="title">Hello</h1>
 *
 * <style>
 *   .title {
 *     @responsive {
 *       @text h1;
 *       margin-bottom: 24px;
 *     }
 *   }
 * </style>
 * ```
 */
export function responsivePreprocess(): PreprocessorGroup {
	return {
		name: 'responsive-styles',
		style({ content }) {
			const transformed = processStyleContent(content);
			return { code: transformed };
		}
	};
}
