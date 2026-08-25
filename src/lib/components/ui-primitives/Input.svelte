<!--
    Input component for text, email, password, file, etc.
    Supports validation states, dark mode, and file inputs.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

    type InputType = Exclude<HTMLInputTypeAttribute, "file">;

    export type InputProps = Omit<HTMLInputAttributes, "type"> &
        ({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined });
</script>

<script lang="ts">
    let {
        value = $bindable(),
        type,
        files = $bindable(),
        class: className,
        ...restProps
    }: InputProps = $props();
</script>

<!-- TODO: build label into input ...  -->
{#if type === "file"}
    <input
        class={cn("base-input", className)}
        type="file"
        bind:files
        bind:value
        {...restProps}
    />
{:else}
    <input
        class={cn("base-input", className)}
        {type}
        bind:value
        {...restProps}
    />
{/if}

<style>
    :where(.base-input) {
        @responsive {
            width: 100%;
            min-width: 0;
            height: 36px;
            padding: 4px 10px;

            border-radius: var(--radius-md);
            border: 1px solid var(--input);
            background-color: transparent;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

            /* TODO: tie to some typography (common default) */
            font-size: 14px;
            line-height: 20px;

            outline: none;
            transition: color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
    }

    :where(.base-input::placeholder) {
        @responsive {
            color: var(--muted-foreground);
        }
    }

    :where(.base-input:focus-visible) {
        @responsive {
            border-color: var(--ring);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
        }
    }

    :where(.base-input:disabled) {
        @responsive {
            pointer-events: none;
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    :where(.base-input[aria-invalid="true"]) {
        @responsive {
            border-color: var(--destructive);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }

    /* Dark mode */
    :where(.dark .base-input) {
        @responsive {
            background-color: color-mix(in srgb, var(--input) 30%, transparent);
        }
    }

    :where(.dark .base-input[aria-invalid="true"]) {
        @responsive {
            border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }

    /* File input button */
    :where(.base-input[type="file"])::file-selector-button {
        @responsive {
            height: 28px;
            display: inline-flex;
            align-items: center;
            border: none;
            background-color: transparent;
            color: var(--foreground);
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            cursor: pointer;
        }
    }
</style>