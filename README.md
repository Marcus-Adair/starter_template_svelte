# Svelte Starter Template

A front-end focused starter template with precise typography and responsive scaling.

## Features

- **Responsive Scaling System** — Pixel-perfect designs that scale fluidly across breakpoints (mobile ≤700px, desktop 701-1440px, fixed above)
- **Capsize CSS** — Trim whitespace above/below text for precise vertical alignment
- **Grid System** — Content grid with named lines for full-bleed and guttered layouts
- **Tailwind CSS v4** — Utility-first styling
- **SvelteKit** — Fast, modern framework

## Quick Start

```sh
pnpm install
pnpm dev
```

Visit `http://localhost:5173/`

## Responsive Scaling

Use `responsiveStyled()` to auto-scale px values across breakpoints:

```svelte
<script>
  import { responsiveStyled } from '$lib/utils/responsive';
</script>

<h1 style={responsiveStyled(`font-size: 48px; margin-bottom: 24px;`)}>
  Scales fluidly
</h1>
```

## Grid System

```svelte
<div class="grid-content">
  <div class="grid-main">Respects gutters</div>
  <div class="grid-fullbleed">Edge to edge</div>
</div>
```

## Capsize

Trim font whitespace for pixel-perfect text boxes. See `/capsize-demo` for examples.

To use a different font:
1. Add font to `/static/fonts/`
2. Update `scripts/extractFontMetrics.ts` with your font path
3. Run `npx tsx scripts/extractFontMetrics.ts`
4. Copy output to `src/lib/utils/capsize.ts`
