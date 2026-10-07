<!--
    Textarea component for multi-line text input.
    Supports validation states, hints, and auto-sizing.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    export type TextareaProps = HTMLTextareaAttributes & {
        label?: string;
        hint?: string;
        required?: boolean;
    };
</script>

<script lang="ts">
    let {
        id,
        value = $bindable(),
        class: className,
        label,
        hint,
        required,
        disabled,
        ...restProps
    }: TextareaProps = $props();
</script>

<div class="textarea-field" data-disabled={disabled || undefined}>
    {#if label}
        <label for={id ?? undefined} class="textarea-label">
            <span class="textarea-label-text">{label}{#if required}<span class="textarea-required">*</span>{/if}</span>
        </label>
    {/if}

    <div class="textarea-wrapper">
        <textarea
            {id}
            name={restProps.name || id}
            class={cn("textarea-control", className)}
            {disabled}
            {required}
            bind:value
            {...restProps}
        ></textarea>
    </div>

    {#if hint}
        <span class="textarea-hint">{hint}</span>
    {/if}
</div>

<style>
    .textarea-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-sm);
        width: 100%;
    }

    .textarea-label {
        display: block;
    }
    .textarea-label-text {
        @responsive { @text p3; }
    }
    .textarea-required {
        margin-left: 3px;
    }

    .textarea-wrapper {
        position: relative;
        width: 100%;
    }

    :where(.textarea-control) {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        background-color: transparent;
        field-sizing: content;
        outline: none;
        border: 1px solid var(--input);
        border-radius: var(--radius-sm);
        color: var(--foreground);
        font-family: inherit;
        transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        padding: var(--space-md) var(--space-lg);
        @responsive {
            @text p3;
            min-height: 88px;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
    }

    :where(.textarea-control)::placeholder {
        color: var(--muted-foreground);
    }

    :where(.textarea-control):focus-visible {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    :where(.textarea-control):disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
    }

    :where(.textarea-control[aria-invalid="true"]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    .textarea-hint {
        color: var(--muted-foreground);
        @responsive { @text p4; }
    }

    .textarea-field[data-disabled="true"] .textarea-label-text,
    .textarea-field[data-disabled="true"] .textarea-hint {
        opacity: 0.5;
    }
</style>
