<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import { RadioGroup as RadioGroupPrimitive } from "bits-ui";

    export type RadioGroupProps = RadioGroupPrimitive.RootProps;
</script>

<script lang="ts">
    let {
        ref = $bindable(null),
        value = $bindable(""),
        class: className,
        children,
        ...restProps
    }: RadioGroupProps = $props();
</script>

<RadioGroupPrimitive.Root
    bind:ref
    bind:value
    class={cn("flex flex-col gap-md", className)}
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</RadioGroupPrimitive.Root>
