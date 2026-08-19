<!-- Simple Preloader component with starter spinner animation -->
<script lang="ts">
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import gsap from 'gsap';

	const ANIM_DURATION: gsap.TweenVars = { duration : 0.35 }
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
	class="fixed inset-0 z-9999 flex items-center justify-center bg-primary opacity-0"
	class:disable={!preloaderController.visible}
>
</div>

<style>
	.disable {
		pointer-events: none;
	}
</style>
