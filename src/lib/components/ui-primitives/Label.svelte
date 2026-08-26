<!--
    Label component for form inputs.
    Supports disabled states.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import { Label as LabelPrimitive } from "bits-ui";

    export type LabelProps = LabelPrimitive.RootProps;
</script>

<script lang="ts">
    let {
        class: className,
        ...restProps
    }: LabelProps = $props();
</script>

<LabelPrimitive.Root
    class={cn("base-label", className)}
    {...restProps}
/>

<!-- :global() needed because LabelPrimitive.Root renders the DOM element -->
<style>
    /* Label - sizing (needs @responsive) */
    :global(:where(.base-label)) {
        @responsive {
            @text label;
            gap: 8px;
        }
    }

    /* Label - non-scaling */
    :global(:where(.base-label)) {
        display: flex;
        align-items: center;
    }

    /* Disabled states */
    :global(:where([data-disabled="true"] .base-label)),
    :global(:where(:disabled + .base-label)),
    :global(:where(.base-label:has(+ :disabled))) {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    }
</style>
