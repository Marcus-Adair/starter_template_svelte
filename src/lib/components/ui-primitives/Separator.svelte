<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import { Separator as SeparatorPrimitive } from "bits-ui";

    export type SeparatorProps = SeparatorPrimitive.RootProps;
</script>

<script lang="ts">
    let {
        class: className,
        ...restProps
    }: SeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
    class={cn("base-separator", className)}
    {...restProps}
/>

<!-- :global() needed because SeparatorPrimitive.Root renders the DOM element -->
<style>
    /* Separator - sizing (needs @responsive) */
    :global(:where(.base-separator)) {
        @responsive {
            height: 1px;
            width: 100%;
        }
        flex-shrink: 0;
        background-color: var(--border);
    }
</style>