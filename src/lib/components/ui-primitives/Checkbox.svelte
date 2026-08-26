<!--
    Checkbox component with checked and indeterminate states.
    Supports accessibility, dark mode, and validation states.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import { Checkbox as CheckboxPrimitive } from "bits-ui";
    import Label from "./Label.svelte";

    export type CheckboxProps = CheckboxPrimitive.RootProps & {
        label?: string;
    };
</script>

<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import MinusIcon from "@lucide/svelte/icons/minus";

    let {
        id,
        ref = $bindable(null),
        checked = $bindable(false),
        indeterminate = $bindable(false),
        class: className,
        label,
        ...restProps
    }: CheckboxProps = $props();
</script>

<div class="checkbox-label-container">
    <CheckboxPrimitive.Root
        {id}
        bind:ref
        bind:checked
        bind:indeterminate
        class={cn("base-checkbox", className)}
        {...restProps}
    >
        {#snippet children({ checked, indeterminate })}
            <div class="base-checkbox__indicator">
                {#if checked}
                    <CheckIcon />
                {:else if indeterminate}
                    <MinusIcon />
                {/if}
            </div>
        {/snippet}
    </CheckboxPrimitive.Root>
    {#if label}
        <Label for={id} class="cursor-pointer">{label}</Label>
    {/if}
</div>

<style>
    /* Container - sizing (needs @responsive) */
    .checkbox-label-container {
        display: flex;
        align-items: center;
        @responsive {
            gap: 8px;
        }
    }

    :global(:where(.base-checkbox)) {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        flex-shrink: 0;
        position: relative;
        outline: none;
        transition: box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
        cursor: pointer;
        @responsive {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 1px solid var(--input);
        }
    }

    /* Expanded hit area */
    :global(:where(.base-checkbox)::after) {
        @responsive {
            top: -8px;
            bottom: -8px;
            left: -12px;
            right: -12px;
        }
    }
    :global(:where(.base-checkbox)::after) {
        content: "";
        position: absolute;
    }

    /* Focus state */
    :global(:where(.base-checkbox:focus-visible)) {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    /* Checked state */
    :global(:where(.base-checkbox[data-state="checked"])),
    :global(:where(.base-checkbox[data-state="indeterminate"])) {
        border-color: var(--primary);
        background-color: var(--primary);
        color: var(--primary-foreground);
    }

    /* Disabled state */
    :global(:where(.base-checkbox:disabled)) {
        cursor: not-allowed;
        opacity: 0.5;
    }

    /* Invalid state */
    :global(:where(.base-checkbox[aria-invalid="true"])) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :global(:where(.base-checkbox[aria-invalid="true"][data-state="checked"])) {
        border-color: var(--primary);
    }

    /* Dark mode */
    :global(:where(.dark .base-checkbox)) {
        background-color: color-mix(in srgb, var(--input) 30%, transparent);
    }
    :global(:where(.dark .base-checkbox[aria-invalid="true"])) {
        border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    /* Indicator - non-scaling */
    :global(:where(.base-checkbox__indicator)) {
        display: grid;
        place-content: center;
        color: currentColor;
    }

    /* Indicator icon - sizing (needs @responsive) */
    :global(:where(.base-checkbox__indicator > svg)) {
        @responsive {
            width: 14px;
            height: 14px;
        }
    }
</style>