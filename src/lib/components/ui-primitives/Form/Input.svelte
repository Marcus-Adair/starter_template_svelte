<!--
    Input component for text, email, password, file, etc.
    Supports validation states, hints, and file inputs.
-->
<script lang="ts" module>
	import { cn } from '$lib/utils/misc';
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import Button from '../Button.svelte';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	export type InputProps = Omit<HTMLInputAttributes, 'type'> & {
		label?: string;
		hint?: string;
		required?: boolean;
		// Content rendered inside the wrapper, after the input (for icons/buttons)
		trailing?: Snippet;
		// Show a clear button when input has a value
		clearButton?: boolean;
	} & ({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined });
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
		clearButton,
		...restProps
	}: InputProps = $props();

	const showClearButton = $derived(clearButton && value);

	let fileInputRef: HTMLInputElement;
</script>

<div class="input-field" data-disabled={disabled || undefined}>
	{#if label}
		<label for={id ?? undefined} class="input-label">
			<span class="input-label-text"
				>{label}{#if required}<span class="input-required">*</span>{/if}</span
			>
		</label>
	{/if}

	{#if type === 'file'}
		<div class={cn('file-input-wrapper', className)}>
			<input
				bind:this={fileInputRef}
				{id}
				name={restProps.name || id}
				class="file-input-hidden"
				type="file"
				{disabled}
				{required}
				bind:files
				bind:value
				{...restProps}
			/>
			<div class="file-input-trigger">
				<Button
					variant="secondary"
					size="sm"
					class="file-input-btn"
					{disabled}
					onclick={() => fileInputRef?.click()}
				>
					Choose File
				</Button>
				<span class="file-input-text">{files?.[0]?.name ?? 'No file chosen'}</span>
			</div>
		</div>
	{:else}
		<div class="input-wrapper">
			<input
				{id}
				name={restProps.name || id}
				class={cn('input-control', trailing || showClearButton ? 'has-trailing' : '', className)}
				{type}
				{disabled}
				{required}
				bind:value
				{...restProps}
			/>
			{#if trailing || showClearButton}
				<span class="input-trailing">
					{#if showClearButton}
						<Button
							variant="ghost"
							size="icon"
							class="input-clear-btn"
							onclick={() => (value = '')}
							aria-label="Clear input"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M18 6 6 18" /><path d="m6 6 12 12" />
							</svg>
						</Button>
					{/if}
					{#if trailing}
						{@render trailing()}
					{/if}
				</span>
			{/if}
		</div>
	{/if}

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
		@responsive {
			@text p3;
		}
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
		background-color: var(--control-bg);
		outline: none;
		border: 1px solid var(--control-border);
		border-radius: var(--control-radius);
		color: var(--control-color);
		font-family: inherit;
		transition:
			color 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
		padding: 0 var(--control-padding-x);
		height: var(--control-height);
		box-shadow: var(--control-shadow);
		@responsive {
			@text p3;
		}
	}

	:where(.input-control)::placeholder {
		color: var(--control-placeholder);
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

	:where(.input-control[aria-invalid='true']) {
		border-color: var(--destructive);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
	}

	/* Extra padding when trailing content is present (tune as needed) */
	.input-control.has-trailing {
		padding-right: calc(var(--space-xl) + 4px);
	}

	.input-hint {
		color: var(--muted-foreground);
		@responsive {
			@text p4;
		}
	}

	.input-field[data-disabled='true'] .input-label-text,
	.input-field[data-disabled='true'] .input-hint {
		opacity: 0.5;
	}

	/* Custom file input */
	.file-input-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.file-input-wrapper {
		position: relative;
		width: 100%;
	}

	.file-input-trigger {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		width: 100%;
		box-sizing: border-box;
		background-color: var(--control-bg);
		border: 1px solid var(--control-border);
		border-radius: var(--control-radius);
		padding: var(--space-xs);
		height: var(--control-height);
		box-shadow: var(--control-shadow);
	}

	.file-input-text {
		color: var(--control-placeholder);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		@responsive {
			@text p3;
		}
	}

	:global(.file-input-btn) {
		height: 26px;
	}

	:global(.input-clear-btn) {
		width: 26px;
		height: 26px;
	}
</style>
