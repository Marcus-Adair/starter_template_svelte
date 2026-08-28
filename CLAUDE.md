# Starter Template Svelte

> SvelteKit starter with pixel-perfect responsive scaling, Capsize typography, GSAP animations, and Tailwind CSS.

## Quick Start

```bash
pnpm install
pnpm dev
```

---

## Deployment (GitHub Pages)

Currently configured for GitHub Pages static deployment.

### Files involved:
- `.github/workflows/build-deploy.yml` - GitHub Actions workflow
- `svelte.config.js` - Uses `adapter-static`
- `src/routes/+layout.ts` - `export const prerender = true`
- `package.json` - Added `@sveltejs/adapter-static`

### To reverse (switch back to adapter-auto):

1. **Delete these files:**
   ```bash
   rm .github/workflows/build-deploy.yml
   rm svelte.config.js
   rm src/routes/+layout.ts
   ```

2. **Remove adapter-static from package.json:**
   ```bash
   pnpm remove @sveltejs/adapter-static
   ```

3. **Done.** The `vite.config.ts` already has `adapter-auto` configured.

---

## Core Systems

### 1. Responsive Pixel Scaling (`@responsive`)

Custom CSS preprocessor that scales pixel values with viewport.

```svelte
<style>
  .box {
    @responsive {
      width: 200px;      /* Scales: mobile vw → desktop vw → fixed at 1440px+ */
      height: 100px;
      padding: 24px;
    }
    background: red;     /* Non-px values go outside @responsive */
  }
</style>
```

**Breakpoints:**
- Mobile: ≤700px (scales based on 375px design)
- Desktop: 701-1440px (scales based on 1440px design)
- Full: >1440px (fixed px values)

**Directives:**
- `@responsive { }` - Default desktop-first scaling
- `@small { }` - Mobile-only overrides
- `@large { }` - Desktop-only (rarely needed)

**Files:** `src/lib/preprocessors/responsive.ts`

### 2. Typography System (`@text`)

Capsize-powered text styles with automatic whitespace trimming.

```svelte
<style>
  .title {
    @responsive { @text h1Desktop; }
    @small { @text h1Mobile; }
  }
</style>
```

**Available styles:** `h1Desktop`, `h2Desktop`, `h3Desktop`, `h1Mobile`, `h2Mobile`, `h3Mobile`, `h4`, `h5`, `h6`, `p1`, `p2`, `p3`, `label`, `caption`, `overline`

**Files:** `src/lib/text.ts`, `src/lib/utils/capsize.ts`

### 3. Grid System

CSS Grid with gutters and full-bleed support.

```svelte
<GridParent>
  <GridFullBleed>Edge to edge content</GridFullBleed>
  <GridMain>Respects gutters</GridMain>
</GridParent>
```

**CSS classes:** `.grid-content`, `.grid-fullbleed`, `.grid-main`, `.col-span-{1-8}`, `.col-start-{1-8}`

**Variables:** `--grid-columns` (8 desktop, 4 mobile), `--grid-gap`, `--grid-gutter`

### 4. Smooth Scroll (Lenis)

Configured in `+layout.svelte`. Synced with GSAP ticker for ScrollTrigger compatibility.

### 5. Page Transitions

Preloader-based transitions between routes.

**Files:** `src/lib/stores/preloaderController.svelte.ts`, `src/lib/components/Preloader.svelte`

---

## Components

### UI Primitives (`$lib/components/ui-primitives/`)
- `Button` - Variants: primary, secondary, outline, ghost, destructive, link. Sizes: xs, sm, default, lg, icon
- `Badge` - Variants: default, secondary, destructive, outline, ghost
- `Card` - Sizes: default, sm
- `Input` - With label, required, disabled, invalid states
- `Textarea` - Multi-line input
- `Checkbox` - With label
- `Separator` - Horizontal/vertical dividers
- `Label` - Form labels
- `GridParent`, `GridMain`, `GridFullBleed` - Grid wrappers

### Sections (`$lib/components/sections/`)
- `Hero100vh` - Fixed-position hero that page content clips over

### SVGs (`$lib/components/svgs/`)
- `_SvgTemplate.svelte` - Copy this for new SVGs
- `ScrolldownArrowSvg.svelte` - Animated arrow

### Layout
- `Header.svelte` - Hides on scroll down, shows on scroll up
- `Footer.svelte` - Basic footer
- `Intro.svelte` - Initial page load animation
- `Preloader.svelte` - Route transition overlay

---

## Utilities

### `useAnimation` (`$lib/utils/useAnimation.svelte.ts`)
GSAP animation helper with automatic cleanup.

```svelte
<script>
  import { useAnimation } from '$lib/utils/useAnimation.svelte';

  let box;

  useAnimation(() => {
    gsap.to(box, { x: 100 });
  });
</script>
```

### `isSmall` / `isDesktop` (`$lib/utils/breakpoints.svelte.ts`)
Reactive breakpoint detection.

```svelte
<script>
  import { isSmall } from '$lib/utils/breakpoints.svelte';
  const small = isSmall();
</script>

{#if small.matches}
  Mobile content
{/if}
```

### `cn` (`$lib/utils/misc.ts`)
Class name utility (like clsx).

```svelte
<div class={cn("base", condition && "conditional", className)} />
```

---

## File Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── sections/       # Page sections
│   │   ├── svgs/           # SVG components
│   │   └── ui-primitives/  # Base UI components
│   ├── preprocessors/
│   │   └── responsive.ts   # @responsive CSS preprocessor
│   ├── stores/
│   │   └── preloaderController.svelte.ts
│   ├── utils/
│   │   ├── breakpoints.svelte.ts
│   │   ├── capsize.ts
│   │   ├── misc.ts
│   │   ├── responsive.ts
│   │   └── useAnimation.svelte.ts
│   ├── text.ts             # Typography definitions
│   ├── consts.ts
│   └── types.ts
├── routes/
│   ├── layout.css          # Global styles, grid, colors
│   ├── +layout.svelte      # Root layout with Lenis
│   └── +page.svelte        # Home page
└── static/
    └── fonts/              # Satoshi, Aktura
```

---

## Conventions

- **CSS:** Use `@responsive` for any pixel values that should scale
- **Colors:** Use CSS variables (`--primary`, `--background`, etc.) from `layout.css`
- **Components:** Props use `$props()`, animations use `useAnimation()`
- **SVGs:** Use `currentColor` for fill/stroke, support `class` prop
- **Naming:** camelCase files, PascalCase components, snake_case folders

---

## Adding Fonts

1. Add `.woff2` to `static/fonts/`
2. Add `@font-face` in `layout.css`
3. Extract metrics: `pnpm tsx scripts/extractFontMetrics.ts`
4. Add metrics to `src/lib/utils/capsize.ts`
5. Add text styles to `src/lib/text.ts`

---

## Theme (Light/Dark)

Toggle via `mode-watcher`. Colors defined in `layout.css` under `:root` and `.dark`.

To add dark mode support to a component:
```svelte
<div class="bg-background text-foreground dark:bg-card" />
```

---

## Known Issues

- Build may fail on `::file-selector-button::before` CSS (lightningcss minification issue with Input component)
- `@responsive` only works in Svelte `<style>` blocks, not plain `.css` files
