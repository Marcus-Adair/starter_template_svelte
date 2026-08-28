<!--
    Input component for text, email, password, file, etc.
    Supports validation states, dark mode, and file inputs.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import Label from "./Label.svelte";

    type InputType = Exclude<HTMLInputTypeAttribute, "file">;

    export type InputProps = Omit<HTMLInputAttributes, "type"> &
        ({ type: "file"; files?: FileList; label?: string; }
        |{ type?: InputType; files?: undefined; label?: string; });
</script>

<script lang="ts">
    let {
        id,
        value = $bindable(),
        type,
        files = $bindable(),
        class: className,
        label,
        ...restProps
    }: InputProps = $props();
</script>

<!-- TODO: build label into input ...  -->
{#if type === "file"}
    <div class="input-label-container">
        {#if label}
            <Label for={id}>
                {label}
            </Label>
        {/if}
        <input
            id={id}
            name={restProps.name || id}
            class={cn("base-input", className)}
            type="file"
            bind:files
            bind:value
            {...restProps}
        />
    </div>
{:else}
    <div class="input-label-container">
        {#if label}
            <Label for={id}>
                {label}
            </Label>
        {/if}
        <input
            id={id}
            name={restProps.name || id}
            class={cn("base-input", className)}
            {type}
            bind:value
            {...restProps}
        />
    </div>
{/if}

<style>
    /* Container - sizing (needs @responsive) */
    .input-label-container {
        display: flex;
        flex-direction: column;
        @responsive {
            gap: 16px;
        }
    }

    /* Input base - sizing (needs @responsive) */
    :where(.base-input) {
        width: 100%;
        min-width: 0;
        background-color: transparent;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        outline: none;
        transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        @responsive {
            height: 36px;
            padding: 4px 10px;
            border-radius: var(--radius-md);
            border: 1px solid var(--input);
            @text p3;
        }
    }

    :where(.base-input::placeholder) {
        color: var(--muted-foreground);
    }

    :where(.base-input:focus-visible) {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    :where(.base-input:disabled) {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
    }

    :where(.base-input[aria-invalid="true"]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    /* Dark mode */
    :where(.dark .base-input) {
        background-color: color-mix(in srgb, var(--input) 30%, transparent);
    }

    :where(.dark .base-input[aria-invalid="true"]) {
        border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    /* File input button */
    /* Note: font props outside @responsive to avoid Capsize adding ::before/::after (can't chain with ::file-selector-button) */
    :where(.base-input[type="file"])::file-selector-button {
        display: inline-flex;
        align-items: center;
        border: none;
        background-color: transparent;
        color: var(--foreground);
        cursor: pointer;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        @responsive {
            height: 28px;
        }
    }
</style>