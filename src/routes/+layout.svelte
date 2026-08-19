<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Intro from '$lib/components/Intro.svelte';

	let { children } = $props();

	// Intercepts internal navigations to cancel them and show preloader first
	beforeNavigate((navigation) => {

		/*
		 *	After the preloader is shown and we programmatically call goto(), beforeNavigate is triggered.
		 *	This line lets the programmatic goto() pass through without being intercepted and prevents an 
		 *	an infinite loop.
		 */
		if (!preloaderController.shouldIntercept()) return;

		if (navigation.to?.url) {
			const toPath = navigation.to.url.pathname;
			const fromPath = navigation.from?.url.pathname;

			if (toPath !== fromPath) {
				navigation.cancel();
				preloaderController.startNavigation(navigation.to.url.href);
			}
		}
	});

	afterNavigate(() => {
		preloaderController.endNavigation();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Intro />
<Preloader />

<main class="grow">
	{@render children()}
</main>
