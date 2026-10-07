<!--
    Badge component for labels, tags, and status indicators.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLAttributes } from "svelte/elements";

    export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
        variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
        size?: "sm" | "default" | "lg";
    };

    function badgeVariants({ variant = "default", size = "default" }: Pick<BadgeProps, "variant" | "size">) {
        return cn(
            "base-badge",
            `base-badge--${variant}`,
            `base-badge--size-${size}`,
        );
    }
</script>

<script lang="ts">
    let {
        class: className,
        variant = "default",
        size = "default",
        children,
        ...restProps
    }: BadgeProps = $props();
</script>

<div
    class={cn(badgeVariants({ variant, size }), className)}
    {...restProps}
>
    <span class="badge-text">{@render children?.()}</span>
</div>

<style>
    /* =========================================================
       Badge base
       ========================================================= */
    :where(.base-badge) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        flex-shrink: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        gap: var(--space-xs);
        border-radius: var(--radius-md);
        @responsive { 
            border: 1px solid transparent; 
        }
    }

    .badge-text {
        @responsive { @text p3; }
    }

    :where(.base-badge > :global(svg)) {
        @responsive {
            width: 12px;
            height: 12px;
        }
    }
    :where(.base-badge > :global(svg)) {
        pointer-events: none;
    }

    :where(.base-badge:focus-visible) {
        border-color: var(--ring);
        outline: none;
        @responsive { box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent); }
    }

    :where(.base-badge[aria-invalid="true"]) {
        border-color: var(--destructive);
        @responsive { box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent); }
    }

    /* :where(.dark .base-badge[aria-invalid="true"]) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    } */

    /* =========================================================
       Sizes
       ========================================================= */

       :where(.base-badge--size-sm) {
        @responsive {
            border-radius: min(var(--radius-md), 8px);
            padding: 5px 7px;
         }
    }
    :where(.base-badge--size-sm) .badge-text {
        @responsive { @text p4; }
    }

    :where(.base-badge--size-default) {
        @responsive {
            padding: 7.5px 9.5px;
         }
    }

    :where(.base-badge--size-lg) {
        @responsive {
            padding: 10.5px 12.5px;
         }
    }
    :where(.base-badge--size-lg) .badge-text {
        @responsive { @text p2; }
    }

    /* =========================================================
       Variants - colors only (no @responsive needed)
       ========================================================= */

    :where(.base-badge--default) {
        background-color: var(--primary);
        color: var(--primary-foreground);
    }

    :where(.base-badge--secondary) {
        background-color: var(--secondary);
        color: var(--secondary-foreground);
    }

    :where(.base-badge--destructive) {
        background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
        color: var(--destructive);
    }

    :where(.base-badge--outline) {
        border-color: var(--border);
        color: var(--foreground);
    }

    :where(.base-badge--ghost) {
        color: var(--foreground);
    }

</style>