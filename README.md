# Svelte Starter Template

A front-end focused starter template with precise typography and responsive scaling. Zero runtime cost — all transforms happen at build time.

## Features

- **Responsive Scaling System** - Pixel values scale fluidly across breakpoints via Svelte preprocessor
- **Breakpoint-Specific Styles** - `@small` and `@large` directives for mobile/desktop-only CSS
- **Typography System** - `@text` directive for reusable text styles with auto-scaling
- **Capsize CSS** - Auto-trims whitespace above/below text for precise vertical alignment
- **Grid System** - Content grid with named lines for full-bleed and guttered layouts
- **SvelteKit + Svelte 5** - Fast, modern framework
- **Tailwind CSS v4** - Tailwind optionality for quick styling
- **GSAP** - Comes with GSAP installed for animation

## Quick Start

```sh
pnpm install
pnpm dev
```

Visit `http://localhost:5173/`

## Responsive Scaling

Use `@responsive` in your `<style>` blocks to auto-scale px values across breakpoints:

```svelte
<h1 class="title">Scales fluidly</h1>

<style>
	.title {
		@responsive {
			font-size: 48px;
			margin-bottom: 24px;
		}
	}
</style>
```

**Breakpoints:**

- Mobile: ≤700px (scales based on 375px design)
- Desktop: 701-1440px (scales based on 1440px design)
- Full: >1440px (fixed px values)

### Breakpoint-Specific Styles

Use `@small` and/or `@large` for styles that only apply at certain breakpoints:

```svelte
<div class="container">...</div>

<style>
	.container {
		display: flex;
		@responsive {
			padding: 24px;
			gap: 16px;
		}
		@small {
			flex-direction: column;
		}
	}
</style>
```

- `@small` — applies at ≤700px, scales px values for mobile
- `@large` — applies at >700px, scales px values for desktop/full

### Non-Scaled Values

Put CSS outside `@responsive` to keep values fixed:

```svelte
<style>
	.box {
		border: 1px solid black; /* stays 1px */
		@responsive {
			padding: 20px; /* scaled */
		}
	}
</style>
```

## Typography System

Use `@text` to apply pre-defined typography styles from `src/lib/text.ts`:

```svelte
<h1 class="title">Hello World</h1>

<style>
	.title {
		@responsive {
			@text h1Desktop;
			margin-bottom: 24px;
		}
		@small {
			@text h1Mobile;
		}
	}
</style>
```

**Available styles:**

- Headings (with Desktop/Mobile variants): `h1Desktop`, `h1Mobile`, `h2Desktop`, `h2Mobile`, `h3Desktop`, `h3Mobile`
- Headings (universal): `h4`, `h5`, `h6`
- Body: `p1`, `p2`, `p3`
- Utility: `caption`, `overline`, `label`

Edit `src/lib/text.ts` to customize or add styles. Capsize auto-applies when the style includes `font-size` and `line-height`.

## Grid System

```svelte
<div class="grid-content">
	<div class="grid-main">Respects gutters</div>
	<div class="grid-fullbleed">Edge to edge</div>
</div>
```

- `.grid-content` — Main grid wrapper
- `.grid-main` — Content area (8 cols desktop, 4 cols mobile)
- `.grid-fullbleed` — Spans edge to edge

Gap & Gutter values for the grid are defined in `layout.css` - use and see `scaledGridVar()` from `$lib/utils/responsive.ts` for help in changing those.

## Capsize

Whitespace trimming is auto-applied when you use `@responsive` with both `font-size` and `line-height`:

```svelte
<p class="text">Trimmed automatically</p>
<p class="text no-capsize">Opt out with no-capsize class</p>

<style>
	.text {
		@responsive {
			font-size: 18px;
			line-height: 28px;
		}
	}
</style>
```

**Important:** Capsize only works on the element with the typography, not children. Apply `@text` or `font-size`/`line-height` directly to text elements, not parent containers.

```svelte
<!-- Wrong: Capsize won't trim the <p> tags -->
<div class="container">
	<p>Text 1</p>
	<p>Text 2</p>
</div>
<style>
	.container { @responsive { @text p1; } }
</style>

<!-- Right: Each text element gets its own styling -->
<div class="container">
	<p class="text">Text 1</p>
	<p class="text">Text 2</p>
</div>
<style>
	.text { @responsive { @text p1; } }
</style>
```

### Using a Different Font

1. Add font to `/static/fonts/`
2. Update `scripts/extractFontMetrics.ts` with your font path
3. Run `npx tsx scripts/extractFontMetrics.ts`
4. Copy output to `src/lib/utils/capsize.ts`

### Recommended VS Code Plugins

1. **Svelte for VS Code** — Svelte/SvelteKit language support
2. **Tailwind CSS IntelliSense** — Autocomplete for Tailwind classes
3. **PostCSS Language Support** — Prevents errors on `@responsive`, `@small`, `@large` syntax
