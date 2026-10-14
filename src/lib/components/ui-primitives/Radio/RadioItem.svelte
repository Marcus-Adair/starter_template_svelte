<script lang="ts" module>
	import { cn } from '$lib/utils/misc';
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import Label from '../Label.svelte';

	export type RadioItemProps = RadioGroupPrimitive.ItemProps & {
		label?: string;
	};
</script>

<script lang="ts">
	let {
		id,
		ref = $bindable(null),
		value,
		class: className,
		label,
		disabled,
		...restProps
	}: RadioItemProps = $props();
</script>

<div class="flex items-center gap-md">
	<RadioGroupPrimitive.Item
		{id}
		{value}
		{disabled}
		bind:ref
		class={cn('base-radio', className)}
		{...restProps}
	>
		{#snippet children({ checked })}
			<div class="base-radio__indicator">
				{#if checked}
					<div class="base-radio__dot"></div>
				{/if}
			</div>
		{/snippet}
	</RadioGroupPrimitive.Item>
	{#if label}
		<Label for={id} class="cursor-pointer">{label}</Label>
	{/if}
</div>

<style>
	:global(:where(.base-radio)) {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		position: relative;
		outline: none;
		transition:
			box-shadow 0.15s ease,
			border-color 0.15s ease,
			background-color 0.15s ease;
		cursor: pointer;
		@responsive {
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 1px solid var(--input);
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		}
	}

	:global(:where(.base-radio)::after) {
		content: '';
		position: absolute;
		top: calc(-1 * var(--space-sm));
		bottom: calc(-1 * var(--space-sm));
		left: calc(-1 * var(--space-md));
		right: calc(-1 * var(--space-md));
	}

	:global(:where(.base-radio:focus-visible)) {
		border-color: var(--ring);
		@responsive {
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
		}
	}

	:global(:where(.base-radio[data-state='checked'])) {
		border-color: var(--primary);
	}

	:global(:where(.base-radio[data-disabled])) {
		cursor: not-allowed;
		opacity: 0.5;
	}

	:global(:where(.base-radio[aria-invalid='true'])) {
		border-color: var(--destructive);
		@responsive {
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
		}
	}

	:global(:where(.base-radio__indicator)) {
		display: grid;
		place-content: center;
	}

	:global(:where(.base-radio__dot)) {
		background-color: var(--primary);
		@responsive {
			width: 8px;
			height: 8px;
			border-radius: 50%;
		}
	}
</style>
