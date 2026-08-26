<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	// import Intro from '$lib/components/Intro.svelte';
	import gsap from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother'
	// import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	gsap.registerPlugin(ScrollSmoother);

	let { children } = $props();


	// onMount(() => {
	// 	ScrollSmoother.create({
	// 		wrapper: '#smooth-wrapper',
	// 		content: '#smooth-content',
	// 		smooth: 2,
	// 		effects: false
	// 	});
	// });

	// Intercepts internal navigations to cancel them and show preloader first
	beforeNavigate((navigation) => {

		/*
		 *	After the preloader is shown and we programmatically call goto(), beforeNavigate is triggered.
		 *	This line lets the programmatic goto() pass through without being intercepted and prevents an
		 *	an infinite loop.
		 */
		if (!preloaderController.shouldIntercept()) return;

		// Don't intercept external navigations
		if (navigation.to?.url && navigation.to.url.origin !== location.origin) return;

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


 <div class="relative">
	<!-- <Intro /> -->
	<Preloader />

	<Header/>

	<!-- <div id="smooth-wrapper"> -->
	<main id="smooth-content" class="grow">
		{@render children()}
	</main>

	<Footer/>
	<!-- </div> -->

</div>