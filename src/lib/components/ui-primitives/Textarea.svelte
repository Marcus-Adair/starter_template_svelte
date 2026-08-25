<!--
    Textarea component for multi-line text input.
    Supports validation states, dark mode, and auto-sizing.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    export type TextareaProps = HTMLTextareaAttributes;
</script>

<script lang="ts">
    let {
        value = $bindable(),
        class: className,
        ...restProps
    }: TextareaProps = $props();
</script>

<textarea
    class={cn("base-textarea", className)}
    bind:value
    {...restProps}
></textarea>

<style>
    :where(.base-textarea) {
        @responsive {
            display: flex;
            width: 100%;
            min-height: 64px;
            padding: 8px 10px;

            border-radius: var(--radius-md);
            border: 1px solid var(--input);
            background-color: transparent;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

            /* TODO: tie to some typography (common default) */
            font-size: 14px;
            line-height: 20px;

            field-sizing: content;
            outline: none;
            transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
    }

    :where(.base-textarea::placeholder) {
        @responsive {
            color: var(--muted-foreground);
        }
    }

    :where(.base-textarea:focus-visible) {
        @responsive {
            border-color: var(--ring);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
        }
    }

    :where(.base-textarea:disabled) {
        @responsive {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    :where(.base-textarea[aria-invalid="true"]) {
        @responsive {
            border-color: var(--destructive);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }

    /* Dark mode */
    :where(.dark .base-textarea) {
        @responsive {
            background-color: color-mix(in srgb, var(--input) 30%, transparent);
        }
    }
    :where(.dark .base-textarea[aria-invalid="true"]) {
        @responsive {
            border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }
</style>