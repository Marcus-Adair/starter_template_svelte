<!--
    Checkbox component with checked and indeterminate states.
    Supports accessibility, dark mode, and validation states.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import { Checkbox as CheckboxPrimitive } from "bits-ui";
</script>

<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import MinusIcon from "@lucide/svelte/icons/minus";

    let {
        ref = $bindable(null),
        checked = $bindable(false),
        indeterminate = $bindable(false),
        class: className,
        ...restProps
    }: CheckboxPrimitive.RootProps = $props();
</script>

<CheckboxPrimitive.Root
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

<!-- :global() needed because CheckboxPrimitive.Root renders the DOM element -->
<style>
    :global(:where(.base-checkbox)) {
        @responsive {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 1px solid var(--input);
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            flex-shrink: 0;
            position: relative;
            outline: none;
            transition: box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
        }
    }

    /* Expanded hit area */
    :global(:where(.base-checkbox)::after) {
        @responsive {
            content: "";
            position: absolute;
            top: -8px;
            bottom: -8px;
            left: -12px;
            right: -12px;
        }
    }

    /* Focus state */
    :global(:where(.base-checkbox:focus-visible)) {
        @responsive {
            border-color: var(--ring);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
        }
    }

    /* Checked state */
    :global(:where(.base-checkbox[data-state="checked"])),
    :global(:where(.base-checkbox[data-state="indeterminate"])) {
        @responsive {
            border-color: var(--primary);
            background-color: var(--primary);
            color: var(--primary-foreground);
        }
    }

    /* Disabled state */
    :global(:where(.base-checkbox:disabled)) {
        @responsive {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    /* Invalid state */
    :global(:where(.base-checkbox[aria-invalid="true"])) {
        @responsive {
            border-color: var(--destructive);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }

    :global(:where(.base-checkbox[aria-invalid="true"][data-state="checked"])) {
        @responsive {
            border-color: var(--primary);
        }
    }

    /* Dark mode */
    :global(:where(.dark .base-checkbox)) {
        @responsive {
            background-color: color-mix(in srgb, var(--input) 30%, transparent);
        }
    }

    :global(:where(.dark .base-checkbox[aria-invalid="true"])) {
        @responsive {
            border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }

    /* Indicator */
    :global(:where(.base-checkbox__indicator)) {
        @responsive {
            display: grid;
            place-content: center;
            color: currentColor;
        }
    }

    :global(:where(.base-checkbox__indicator > svg)) {
        @responsive {
            width: 14px;
            height: 14px;
        }
    }
</style>