<!--
  GridFullBleed: Spans full viewport width, breaking out of parent gutters.

  STYLE SCOPING (Svelte vs React):
  Svelte's <style> blocks are scoped by default — selectors only match elements
  within the same component file. React/Next.js has no auto-scoping (CSS is global
  unless you use CSS Modules).

  This means: if you pass class="hero" to this component and define .hero styles
  in the parent's <style> block, they won't apply — the div here doesn't get the
  parent's scoping hash.

  Solutions:
  1. Use :global(.hero) in parent's <style> block (opts out of scoping)
  2. Use Tailwind classes (already global, no scoping issue)
  3. Use a plain <div class="grid-fullbleed hero"> in parent (element is in parent, scoping works)
-->
<script lang="ts">
	import { cn } from "$lib/utils/misc";
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	let {
        children,
        class: className
    }: {
        children?: Snippet;
        class?: ClassValue | null | undefined
    } = $props();
</script>

<div class={cn("grid-fullbleed", className)}>
    {@render children?.()}
</div>