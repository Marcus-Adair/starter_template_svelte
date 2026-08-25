# Svelte Starter Template

A front-end focused starter template with responsive scaling and precise typography. Zero runtime cost - all transforms happen at build time. This template helps with creating pixel-perfect UIs that match designs across different screen sizes.

## Features

- **Responsive Scaling System** - Pixel values scale fluidly across breakpoints via Svelte preprocessor
- **Breakpoint-Specific Styles** - `@small` and `@large` directives for mobile/desktop-only CSS
- **Typography System** - `@text` directive for reusable text styles with responsive auto-scaling
- **Capsize CSS** - Auto-trims whitespace above/below text for precise vertical alignment and design implementation
- **Grid System** - Content grid with named lines for full-bleed and guttered layouts
- **SvelteKit + Svelte 5** - Fast, modern framework built for performance
- **Tailwind CSS v4** - Tailwind optionality to provide quick styling utility
- **GSAP** - Comes with GSAP installed for animation
- **Page Transitions** - Preloader with fade transitions between pages
- **Intro Animation** - Initial load animation with coordinated timing
- **useAnimation Hook** - GSAP wrapper with auto-cleanup and smart delay

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

- `@small` - applies at ≤700px, scales px values for mobile
- `@large` - applies at >700px, scales px values for desktop/full

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

- `.grid-content` - Main grid wrapper
- `.grid-main` - Content area (8 cols desktop, 4 cols mobile)
- `.grid-fullbleed` - Spans edge to edge

Gap & Gutter values for the grid are defined in `layout.css` - use and see `scaledGridVar()` from `$lib/utils/responsive.ts` for help in changing those.

## Breakpoints in JavaScript

Use `isSmall()` and `isLarge()` for reactive breakpoint detection in your scripts:

```svelte
<script>
	import { isSmall } from '$lib/utils/breakpoints.svelte';
	const small = isSmall();
</script>

{#if small.matches}
	<MobileNav />
{:else}
	<DesktopNav />
{/if}
```

Both functions return an object with a reactive `matches` property that updates when the viewport crosses the breakpoint.

## Page Transitions

The preloader shows during page navigation with fade transitions. It intercepts link clicks, fades in, navigates, then fades out.

**Timing constants** (in `$lib/consts.ts`):
- `TRANS_DURATION` - Fade in/out duration (350ms)
- `MIN_DURATION` - Minimum preloader display time (700ms)

**Waiting for assets** (optional):

```svelte
<script>
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		preloaderController.waitFor(document.fonts.ready);
		preloaderController.waitFor(preloaderController.waitForImages(document.body));
	});
</script>
```

## Intro Animation

On initial page load, a spinner overlay shows then fades out. This runs once on first visit, not on subsequent navigations.

**Timing** (in `$lib/consts.ts`):
- `INTRO_DURATION` - Total intro time before page animations start

Customize the intro in `$lib/components/Intro.svelte`.

## useAnimation

GSAP animation hook with auto-cleanup and optional delay coordination.

```svelte
<script>
	import { useAnimation } from '$lib/utils/useAnimation.svelte';

	// Delayed - waits for intro (initial) or preloader (navigation)
	useAnimation((ctx) => {
		gsap.to('.hero', { opacity: 1, y: 0 });
	}, { delay: true });

	// Immediate - good for ScrollTrigger
	useAnimation((ctx) => {
		ScrollTrigger.create({ /* ... */ });
	});
</script>
```

**Features:**
- Auto GSAP context creation
- Auto cleanup on component unmount
- Smart delay: uses `INTRO_DURATION` on initial load, `TRANS_DURATION` on navigation

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

## UI Primitives

Reusable components in `src/lib/components/ui-primitives/`. Inspired by [shadcn-svelte](https://shadcn-svelte.com/).

**Button** - Variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`. Sizes: `xs`, `sm`, `default`, `lg`, `icon`.

```svelte
<script>
	import Button from '$lib/components/ui-primitives/Button.svelte';
</script>

<Button variant="primary" size="lg">Click me</Button>
<Button href="/about" variant="outline">As link</Button>
```

Visit `/ui-catalog` to see all components and variants.

### Recommended VS Code Plugins

1. **Svelte for VS Code** - Svelte/SvelteKit language support
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **PostCSS Language Support** - Prevents errors on `@responsive`, `@small`, `@large` syntax
