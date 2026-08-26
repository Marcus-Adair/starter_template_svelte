<script lang="ts">
	import { cn } from "$lib/utils/misc";
	import type { Snippet } from "svelte";

	let {
        children,
        class: className
    }: {
        children?: Snippet;
        class?: string
    } = $props();
</script>

<div class={cn("grid-content", className)}>
    {@render children?.()}
</div>