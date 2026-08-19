import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { MIN_DURATION, TRANS_DURATION } from '$lib/consts';


let active = $state(false);
let minDurationMet = $state(true); // Skip initial preloader
let isNavigatingInternally = false;
let isInitialLoad = true; // True until first navigation completes

let pendingPromises: Promise<unknown>[] = [];
let assetsReady = $state(true); // No pending promises = ready

// Start min duration timer on initial load
if (browser) {
	setTimeout(() => {
		minDurationMet = true;
	}, MIN_DURATION);
}

// Visible when: active OR waiting for min duration OR waiting for assets
function isVisible() {
	return active || !minDurationMet || !assetsReady;
}

function startNavigation(url: string) {
	active = true;
	minDurationMet = false;
	// Don't reset assetsReady here - let pending promises from new page register

	// Wait for fade-in animation, then navigate
	setTimeout(() => {
		isNavigatingInternally = true;

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(url).finally(() => {
			isNavigatingInternally = false;
		});
	}, TRANS_DURATION);

	// Start min duration timer
	setTimeout(() => {
		minDurationMet = true;
	}, MIN_DURATION);
}

function endNavigation() {
	active = false;
	isInitialLoad = false;
}

function shouldIntercept() {
	return !isNavigatingInternally;
}

// 	HELPERS: ----------------------------------------------- //

/**
 * Register a promise that must resolve before the preloader hides.
 * Call this from page components to wait for images, fonts, API data, etc.
 *
 * @example
 * // Wait for fonts
 * preloaderController.waitFor(document.fonts.ready);
 *
 * // Wait for images in a container
 * preloaderController.waitFor(waitForImages(containerEl));
 *
 * // Wait for API data
 * preloaderController.waitFor(fetchData());
 */
function waitFor(promise: Promise<unknown>) {
	assetsReady = false;
	pendingPromises.push(promise);

	promise.finally(() => {
		// Remove this promise from pending
		pendingPromises = pendingPromises.filter((p) => p !== promise);

		// If no more pending, mark assets as ready
		if (pendingPromises.length === 0) {
			assetsReady = true;
		}
	});
}

/**
 * Helper: Wait for all images in a container to load.
 * Returns a promise that resolves when all <img> elements are loaded.
 *
 * @example
 * onMount(() => {
 *   preloaderController.waitFor(
 *     preloaderController.waitForImages(document.body)
 *   );
 * });
 */
function waitForImages(container: HTMLElement): Promise<void[]> {
	const images = container.querySelectorAll('img');
	const promises = Array.from(images).map((img) =>
		img.complete ? Promise.resolve() : new Promise<void>((r) => (img.onload = () => r()))
	);
	return Promise.all(promises);
}

/**
 * Helper: Wait for all fonts to load.
 *
 * @example
 * onMount(() => {
 *   preloaderController.waitFor(preloaderController.waitForFonts());
 * });
 */
function waitForFonts(): Promise<FontFaceSet> {
	return document.fonts.ready;
}

// 	Export getters + $state: -------------------------------- //
export const preloaderController = {
	get active() {
		return active;
	},
	get visible() {
		return isVisible();
	},
	get assetsReady() {
		return assetsReady;
	},
	get isInitialLoad() {
		return isInitialLoad;
	},
	startNavigation,
	endNavigation,
	shouldIntercept,
	waitFor,
	waitForImages,
	waitForFonts,
};
