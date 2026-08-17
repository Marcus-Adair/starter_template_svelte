/**
 * Typography system for consistent text styles.
 * Use with @text directive in @responsive/@small/@large blocks.
 *
 * @example
 * <style>
 *   .title {
 *     @responsive { @text h1Desktop; }
 *     @small { @text h1Mobile; }
 *   }
 * </style>
 */

export const text: Record<string, string> = {
	// Headings - Desktop
	h1Desktop: `font-size: 64px; line-height: 72px; font-weight: 700;`,
	h2Desktop: `font-size: 48px; line-height: 56px; font-weight: 600;`,
	h3Desktop: `font-size: 32px; line-height: 40px; font-weight: 600;`,

	// Headings - Mobile
	h1Mobile: `font-size: 40px; line-height: 48px; font-weight: 700;`,
	h2Mobile: `font-size: 32px; line-height: 40px; font-weight: 600;`,
	h3Mobile: `font-size: 24px; line-height: 32px; font-weight: 600;`,

	// Headings - Universal (same on all breakpoints)
	h4: `font-size: 24px; line-height: 32px; font-weight: 600;`,
	h5: `font-size: 20px; line-height: 28px; font-weight: 600;`,
	h6: `font-size: 18px; line-height: 24px; font-weight: 600;`,

	// Body text
	p1: `font-size: 18px; line-height: 28px;`,
	p2: `font-size: 16px; line-height: 24px;`,
	p3: `font-size: 14px; line-height: 20px;`,

	// Utility
	caption: `font-size: 12px; line-height: 16px;`,
	overline: `font-size: 12px; line-height: 16px; text-transform: uppercase; letter-spacing: 0.1em;`,
	label: `font-size: 14px; line-height: 20px; font-weight: 500;`,
};
