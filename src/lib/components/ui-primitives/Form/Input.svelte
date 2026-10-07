<!--
    Input component for text, email, password, file, etc.
    Supports validation states, hints, and file inputs.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
    import type { Snippet } from "svelte";

    type InputType = Exclude<HTMLInputTypeAttribute, "file">;

    export type InputProps = Omit<HTMLInputAttributes, "type"> & {
        label?: string;
        hint?: string;
        required?: boolean;
        // Content rendered inside the wrapper, after the input (for icons/buttons)
        trailing?: Snippet;
    } & (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
    );
</script>

<script lang="ts">
    let {
        id,
        value = $bindable(),
        type,
        files = $bindable(),
        class: className,
        label,
        hint,
        required,
        disabled,
        trailing,
        ...restProps
    }: InputProps = $props();
</script>

<div class="input-field" data-disabled={disabled || undefined}>
    {#if label}
        <label for={id ?? undefined} class="input-label">
            <span class="input-label-text">{label}{#if required}<span class="input-required">*</span>{/if}</span>
        </label>
    {/if}

    <div class="input-wrapper">
        {#if type === "file"}
            <input
                {id}
                name={restProps.name || id}
                class={cn("input-control", className)}
                type="file"
                {disabled}
                {required}
                bind:files
                bind:value
                {...restProps}
            />
        {:else}
            <input
                {id}
                name={restProps.name || id}
                class={cn("input-control", trailing ? "has-trailing" : "", className)}
                {type}
                {disabled}
                {required}
                bind:value
                {...restProps}
            />
        {/if}
        {#if trailing}
            <span class="input-trailing">
                {@render trailing()}
            </span>
        {/if}
    </div>

    {#if hint}
        <span class="input-hint">{hint}</span>
    {/if}
</div>

<style>
    .input-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-sm);
        width: 100%;
    }

    .input-label {
        display: block;
    }
    .input-label-text {
        @responsive { @text p3; }
    }
    .input-required {
        margin-left: 3px;
    }

    /* Wrapper for input + potential icons */
    .input-wrapper {
        position: relative;
        width: 100%;
    }
    .input-trailing {
        position: absolute;
        right: var(--space-xs);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        pointer-events: auto;
    }

    /* Input control */
    :where(.input-control) {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        background-color: transparent;
        outline: none;
        border: 1px solid var(--input);
        border-radius: var(--radius-sm);
        color: var(--foreground);
        font-family: inherit;
        transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        padding: 0 var(--space-lg);
        @responsive {
            @text p3;
            height: 40px;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
    }

    :where(.input-control)::placeholder {
        color: var(--muted-foreground);
    }

    :where(.input-control):focus-visible {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    :where(.input-control):disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
    }

    :where(.input-control[aria-invalid="true"]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    /* Extra padding when trailing content is present (tune as needed) */
    .input-control.has-trailing {
        padding-right: calc(var(--space-xl) + 4px);
    }

    .input-hint {
        color: var(--muted-foreground);
        @responsive { @text p4; }
    }

    .input-field[data-disabled="true"] .input-label-text,
    .input-field[data-disabled="true"] .input-hint {
        opacity: 0.5;
    }

    /* File input button */
    :where(.input-control[type="file"]) {
        padding: 0 var(--space-md);
    }
    :where(.input-control[type="file"])::file-selector-button {
        display: inline-flex;
        align-items: center;
        border: none;
        background-color: transparent;
        color: var(--foreground);
        cursor: pointer;
        font-family: inherit;
        margin-right: var(--space-md);
        @responsive {
            @text p3;
            font-weight: 500;
            height: 32px;
        }
    }
</style>
