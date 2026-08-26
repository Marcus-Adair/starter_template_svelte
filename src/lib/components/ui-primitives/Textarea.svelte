<!--
    Textarea component for multi-line text input.
    Supports validation states, dark mode, and auto-sizing.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLTextareaAttributes } from "svelte/elements";
    import Label from "./Label.svelte";

    export type TextareaProps = HTMLTextareaAttributes & {
        label?: string;
    };
</script>

<script lang="ts">
    let {
        id,
        value = $bindable(),
        class: className,
        label,
        ...restProps
    }: TextareaProps = $props();
</script>

<div class="textarea-label-container">
    {#if label}
        <Label for={id}>{label}</Label>
    {/if}
    <textarea
        id={id}
        name={restProps.name || id}
        class={cn("base-textarea", className)}
        bind:value
        {...restProps}
    ></textarea>
</div>

<style>
    /* Container - sizing (needs @responsive) */
    .textarea-label-container {
        display: flex;
        flex-direction: column;
        @responsive {
            gap: 6px;
        }
    }

    /* Textarea base */
    :where(.base-textarea) {
        display: flex;
        width: 100%;
        background-color: transparent;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        field-sizing: content;
        outline: none;
        transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        @responsive {
            min-height: 64px;
            padding: 8px 10px;
            border-radius: var(--radius-md);
            border: 1px solid var(--input);
            @text p3;
        }
    }

    :where(.base-textarea::placeholder) {
        color: var(--muted-foreground);
    }

    :where(.base-textarea:focus-visible) {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    :where(.base-textarea:disabled) {
        cursor: not-allowed;
        opacity: 0.5;
    }

    :where(.base-textarea[aria-invalid="true"]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    /* Dark mode */
    :where(.dark .base-textarea) {
        background-color: color-mix(in srgb, var(--input) 30%, transparent);
    }
    :where(.dark .base-textarea[aria-invalid="true"]) {
        border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }
</style>