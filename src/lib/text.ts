/**
 * Typography system. Use with @text directive in @responsive/@small/@large blocks.
 *
 * Line-height uses unitless ratios (multiplied by font-size).
 * This allows line-height to scale naturally with responsive font-size.
 */

export const text: Record<string, string> = {
	// Headings
	h1: `font-family: Aktura; font-size: 162px; line-height: 0.84; font-weight: 700; letter-spacing: -0.04em;`,
	h2: `font-family: Aktura; font-size: 112px; line-height: 1.1; font-weight: 700; letter-spacing: -0.04em;`,
	h3: `font-family: Aktura; font-size: 96px; line-height: 0.94; font-weight: 400; letter-spacing: -0.04em;`,
	h4: `font-family: Aktura; font-size: 68px; line-height: 1.03; font-weight: 400; letter-spacing: -0.04em;`,
	h5: `font-family: Aktura; font-size: 65px; line-height: 0.69; font-weight: 700; letter-spacing: -0.04em;`,
	h6: `font-family: Aktura; font-size: 56px; line-height: 0.71; font-weight: 400; letter-spacing: -0.04em;`,
	h7: `font-family: Aktura; font-size: 48px; line-height: 0.65; font-weight: 400; letter-spacing: -0.04em;`,
	h8: `font-family: Aktura; font-size: 32px; line-height: 0.75; font-weight: 400; letter-spacing: -0.04em;`,
	h9: `font-family: Aktura; font-size: 24px; line-height: 1.17; font-weight: 400; letter-spacing: -0.01em;`,
	h10: `font-family: Aktura; font-size: 16px; line-height: 1.56; font-weight: 400; letter-spacing: -0.01em;`,

	// Paragraph
	p1: `font-size: 24px; line-height: 1.42; font-weight: 400; letter-spacing: -0.04em;`,
	p2: `font-size: 22px; line-height: 1.55; font-weight: 400; letter-spacing: -0.04em;`,
	p3: `font-size: 14px; line-height: 1.93; font-weight: 400; letter-spacing: -0.04em;`,
	p4: `font-size: 12px; line-height: 1.5; font-weight: 400; letter-spacing: -0.04em;`,

	// Kicker
	kicker1: `font-size: 17px; line-height: 1.12; font-weight: 500; letter-spacing: 0.04em;`,
	kicker2: `font-size: 12px; line-height: 1.33; font-weight: 500; letter-spacing: 0.04em;`,

	// Link
	link1: `font-size: 15px; line-height: 1.67; font-weight: 500; letter-spacing: -0.02em;`,
	link2: `font-size: 14px; line-height: 1.29; font-weight: 500; letter-spacing: -0.04em;`,
};
