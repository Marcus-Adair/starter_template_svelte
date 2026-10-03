<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { Snippet } from "svelte";

    export type LabelProps = {
        for?: string;
        class?: string;
        children?: Snippet;
    };
</script>

<script lang="ts">
    let {
        for: htmlFor,
        class: className,
        children,
    }: LabelProps = $props();
</script>

{#if htmlFor}
    <label for={htmlFor} class={cn("base-label", className)}>
        {@render children?.()}
    </label>
{:else}
    <span class={cn("base-label", className)}>
        {@render children?.()}
    </span>
{/if}

<style>
    .base-label { @responsive { @text p3; } }

    :global(:where([data-disabled="true"] .base-label)),
    :global(:where(:disabled + .base-label)),
    :global(:where(.base-label:has(+ :disabled))) {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    }
</style>
