<!-- Simple Preloader component with starter spinner animation -->
<script lang="ts">
	import { TRANS_DURATION } from '$lib/consts';
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import gsap from 'gsap';

	const ANIM_DURATION: gsap.TweenVars = { duration : TRANS_DURATION / 1000 }
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
	<!-- ADD ANIMATED ELEMENTS HERE -->
	 <span class="text-primary-foreground">Page transition ...</span>
</div>

<style>
	.disable {
		pointer-events: none;
	}
</style>
