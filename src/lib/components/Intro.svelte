<!-- Intro animation - shows spinner on initial load, fades out -->
<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { INTRO_DURATION, TRANS_DURATION } from '$lib/consts';

	let visible = $state(true);
	let introEl = $state<HTMLDivElement>();

	onMount(() => {
		if (!introEl) return; 

		// Fade out after intro duration (total = INTRO_DURATION (800ms))
		gsap.to(introEl, {
			opacity: 0,
			duration: TRANS_DURATION / 1000,
			delay: (INTRO_DURATION - TRANS_DURATION) / 1000,
			onComplete: () => {
				visible = false;
			}
		});
	});
</script>

{#if visible}
	<div
		bind:this={introEl}
		class="intro fixed inset-0 z-9999 flex items-center justify-center bg-primary"
	>
		<div class="spinner"></div>
	</div>
{/if}

<style>
	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--primary-foreground);
		border-top-color: var(--muted-foreground);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
