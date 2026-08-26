<!--
    Badge component for labels, tags, and status indicators.
    Renders as <a> when href is provided, otherwise <span>.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";

    export type BadgeProps = HTMLAttributes<HTMLSpanElement> & HTMLAnchorAttributes & {
        variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
    };

    function badgeVariants({ variant = "default" }: Pick<BadgeProps, "variant">) {
        return cn(
            "base-badge",
            `base-badge--${variant}`,
        );
    }
</script>

<script lang="ts">
    let {
        href,
        class: className,
        variant = "default",
        children,
        ...restProps
    }: BadgeProps = $props();
</script>

<svelte:element
    this={href ? "a" : "span"}
    {href}
    class={cn(badgeVariants({ variant }), className)}
    {...restProps}
>
    {@render children?.()}
</svelte:element>

<style>
    /* =========================================================
       Badge base - sizing (needs @responsive)
       ========================================================= */
    :where(.base-badge) {
        @responsive {
            height: 20px;
            gap: 4px;
            padding: 2px 8px;
            border-radius: var(--radius-md);
            border: 1px solid transparent;
            @text caption;
        }
    }

    /* Badge base - non-scaling properties */
    :where(.base-badge) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        font-weight: 500;
        flex-shrink: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
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
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
        outline: none;
    }

    :where(.base-badge[aria-invalid="true"]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    :where(.dark .base-badge[aria-invalid="true"]) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    /* =========================================================
       Variants - colors only (no @responsive needed)
       ========================================================= */

    :where(.base-badge--default) {
        background-color: var(--primary);
        color: var(--primary-foreground);
    }
    :where(a.base-badge--default:hover) {
        background-color: color-mix(in srgb, var(--primary) 80%, transparent);
    }

    :where(.base-badge--secondary) {
        background-color: var(--secondary);
        color: var(--secondary-foreground);
    }
    :where(a.base-badge--secondary:hover) {
        background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
    }

    :where(.base-badge--destructive) {
        background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
        color: var(--destructive);
    }
    :where(.base-badge--destructive:focus-visible) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(a.base-badge--destructive:hover) {
        background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.dark .base-badge--destructive) {
        background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.dark .base-badge--destructive:focus-visible) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    :where(.base-badge--outline) {
        border-color: var(--border);
        color: var(--foreground);
    }
    :where(a.base-badge--outline:hover) {
        background-color: var(--muted);
        color: var(--muted-foreground);
    }

    :where(.base-badge--ghost) {
        color: var(--foreground);
    }
    :where(.base-badge--ghost:hover) {
        background-color: var(--muted);
        color: var(--muted-foreground);
    }
    :where(.dark .base-badge--ghost:hover) {
        background-color: color-mix(in srgb, var(--muted) 50%, transparent);
    }

    :where(.base-badge--link) {
        color: var(--primary);
        text-underline-offset: 4px;
    }
    :where(.base-badge--link:hover) {
        text-decoration: underline;
    }
</style>