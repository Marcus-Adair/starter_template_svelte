<!-- Simple Preloader component with starter spinner animation -->
<script lang="ts">
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import gsap from 'gsap';

	const ANIM_DURATION: gsap.TweenVars = { duration : 0.3 }
	$effect(() => {
		if (preloaderController.visible) { 
			gsap.to("#preloader", { opacity: 1, ...ANIM_DURATION})
		} else {
			gsap.to("#preloader", { opacity: 0, ...ANIM_DURATION})
		}
	});
</script>

<div
	id="preloader"
	class="fixed inset-0 z-9999 flex items-center justify-center bg-background"
	class:disable={!preloaderController.visible}
>
	<!-- TODO: replace me for cooler preloader animation! -->
	<div class="spinner"></div>
</div>

<style>
	.disable {
		pointer-events: none;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--border);
		border-top-color: var(--foreground);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
