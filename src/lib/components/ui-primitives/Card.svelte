<!--
    Card component for grouping related content.
    Supports size variants for different spacing.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLAttributes } from "svelte/elements";

    export type CardProps = HTMLAttributes<HTMLDivElement> & {
        size?: "default" | "sm";
    };

    function cardVariants({ size = "default" }: Pick<CardProps, "size">) {
        return cn(
            "base-card",
            size === "sm" && "base-card--sm",
        );
    }
</script>

<script lang="ts">
    let {
        class: className,
        size = "default",
        children,
        ...restProps
    }: CardProps = $props();
</script>

<div
    class={cn(cardVariants({ size }), className)}
    {...restProps}
>
    {@render children?.()}
</div>

<style>
    :where(.base-card) {
        @responsive {
            --card-spacing: 24px;

            display: flex;
            flex-direction: column;
            /* gap: var(--card-spacing); */
            gap: 12px; 
            padding: var(--card-spacing);

            overflow: hidden;
            border-radius: 12px;
            background-color: var(--card);
            color: var(--card-foreground);
            box-shadow:
                0 1px 2px 0 rgb(0 0 0 / 0.05),
                0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent);

            font-size: 14px;
            line-height: 20px;
        }
    }

    :where(.base-card--sm) {
        @responsive {
            --card-spacing: 16px;
            gap: 6px; 
        }
    }
</style>
