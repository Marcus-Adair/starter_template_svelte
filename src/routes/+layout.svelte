<script lang="ts">
	import './layout.css';
	import 'lenis/dist/lenis.css';
	import favicon from '$lib/assets/favicon.svg';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { preloaderController } from '$lib/stores/preloaderController.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from 'lenis';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from "mode-watcher";

	gsap.registerPlugin(ScrollTrigger);

	// ScrollTrigger config (from Reform Co)
	ScrollTrigger.config({ ignoreMobileResize: true });

	let { children } = $props();

	// Lenis smooth scroll setup (for sticky + smooth scroll)
	$effect(() => {
		const lenis = new Lenis({
			// Customize as needed
			duration: 2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		// Sync Lenis with GSAP ticker (like Reform Co does)
		function update(time: number) {
			lenis.raf(time * 1000);
		}
		gsap.ticker.add(update);

		// Sync ScrollTrigger with Lenis scroll position
		lenis.on('scroll', ScrollTrigger.update);

		return () => {
			gsap.ticker.remove(update);
			lenis.destroy();
		};
	});

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
<ModeWatcher />

<Intro />
<Preloader />
<Header />

<main>
	{@render children()}
</main>

<Footer />