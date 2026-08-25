<!--
    Label component for form inputs.
    Supports disabled states via parent group or sibling peer.

    Inspired by shadcn-svelte.
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
    :global(:where(.base-label)) {
        @responsive {
            display: flex;
            align-items: center;
            gap: 8px;

            font-size: 14px;
            line-height: 1;
            font-weight: 500;

            user-select: none;
        }
    }

    /* Disabled via parent group */
    :global(:where([data-disabled="true"] .base-label)) {
        @responsive {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    /* Disabled via sibling input (label after input) */
    :global(:where(:disabled + .base-label)) {
        @responsive {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    /* Disabled via sibling input (label before input, using :has) */
    :global(:where(.base-label:has(+ :disabled))) {
        @responsive {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
</style>
