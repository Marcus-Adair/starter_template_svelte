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
		class="intro-div fixed inset-0 z-9999 flex items-center justify-center bg-primary"
	>
		<h1 class="intro-words text-primary-foreground">Intro ...</h1>
		<div class="spinner"></div>
	</div>
{/if}

<style>
	.intro-words { 
		@responsive { @text h1Desktop; } 
		@small { @text h1Mobile; } 
	}
	.intro-div {
		@responsive {
			gap: 16px;
		}
	}
	.spinner {
		@responsive {
			width: 40px;
			height: 40px;
			border: 3px solid var(--primary-foreground);
		}
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
