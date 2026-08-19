import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const MIN_DURATION = 1000;
const FADE_DURATION = 300; // Match GSAP duration (0.3s) in Preloader.svelte

let active = $state(true);
let minDurationMet = $state(false);
let isNavigatingInternally = false; // Flag to skip interception on our goto()

// Start min duration timer on initial load
if (browser) {
	setTimeout(() => {
		minDurationMet = true;
	}, MIN_DURATION);
}

function isVisible() {
	return active || !minDurationMet;
}

function startNavigation(url: string) {
	active = true;
	minDurationMet = false;

	// Wait for fade-in animation, then navigate
	setTimeout(() => {
		isNavigatingInternally = true;

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(url).finally(() => {
			isNavigatingInternally = false;
		});
	}, FADE_DURATION);

	// Start min duration timer
	setTimeout(() => {
		minDurationMet = true;
	}, MIN_DURATION);
}

function endNavigation() {
	active = false;
}

function shouldIntercept() {
	return !isNavigatingInternally;
}

export const preloaderController = {
	get active() {
		return active;
	},
	get visible() {
		return isVisible();
	},
	startNavigation,
	endNavigation,
	shouldIntercept,
};
