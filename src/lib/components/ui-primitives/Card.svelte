<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLAttributes } from "svelte/elements";

    export type CardProps = HTMLAttributes<HTMLDivElement> & {
        size?: "default" | "sm";
    };

    function cardVariants({ size = "default" }: Pick<CardProps, "size">) {
        return cn(
             "base-card-responsive",
            "flex flex-col overflow-hidden bg-card text-card-foreground py-xl",
            size === "sm" ? "gap-md p-xl" : "gap-xl p-2xl",
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
    :where(.base-card-responsive) {
        @responsive {
            border-radius: 12px;
            box-shadow:
                0 1px 2px 0 rgb(0 0 0 / 0.05),
                0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent);
        }
    }
</style>
