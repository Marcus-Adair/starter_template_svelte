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
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--card);
        color: var(--card-foreground);
        box-shadow:
            0 1px 2px 0 rgb(0 0 0 / 0.05),
            0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent);
        gap: var(--space-md);
        padding: var(--space-xl);
        border-radius: 12px;
        @responsive {
            @text p3;
        }
    }

    :where(.base-card--sm) {
        gap: var(--space-sm);
        padding: var(--space-lg);
    }
</style>
