import { onMount } from 'svelte';
import gsap from 'gsap';
import {
	preloaderController
} from '$lib/stores/preloaderController.svelte';
import {
	INTRO_DURATION,
	TRANS_DURATION
} from '$lib/consts';

type AnimationCallback = (ctx: gsap.Context) => void;

interface UseAnimationOptions {
	/** If true, delays animation until after intro (initial load) or preloader fade-out (navigation) */
	delay?: boolean;
}

/**
 * Animation hook with GSAP context and auto-cleanup.
 * Optionally delays animations until intro/preloader completes.
 *
 * @example
 * // With delay (waits for intro or preloader)
 * useAnimation((ctx) => {
 *   gsap.to(".hero", { opacity: 1 });
 * }, { delay: true });
 *
 * @example
 * // No delay (runs immediately, good for ScrollTrigger)
 * useAnimation((ctx) => {
 *   ScrollTrigger.create({ ... });
 * });
 */
export function useAnimation(callback: AnimationCallback, options: UseAnimationOptions = {}) {
	const { delay = false } = options;

	onMount(() => {
		let ctx: gsap.Context;

		const runAnimation = () => {
			ctx = gsap.context(() => {
				callback(ctx);
			});
		};

		if (delay) {
			const delayMs = preloaderController.isInitialLoad ? INTRO_DURATION : TRANS_DURATION;
			setTimeout(runAnimation, delayMs);
		} else {
			runAnimation();
		}

		return () => {
			ctx?.revert();
		};
	});
}
