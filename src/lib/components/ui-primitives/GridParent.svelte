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

<div class={cn("grid-content", className)}>
    {@render children?.()}
</div>