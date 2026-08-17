import { browser } from '$app/environment';
import { MOBILE_BREAKPOINT } from '$lib/consts';


let matches = $state<boolean>(false);

/**
 * Reactive media query hook for Svelte 5.
 * Returns an object with a reactive `matches` property.
 *
 * @param query - CSS media query string
 * @returns Object with reactive `matches` boolean
 *
 * @example
 * const small = mediaQuery('(max-width: 700px)');
 * // In template: {#if small.matches}...{/if}
 */
export function mediaQuery(query: string): { readonly matches: boolean } {
	matches = browser ? window.matchMedia(query).matches : false;

	if (browser) {
		const mediaQueryList = window.matchMedia(query);

		const handler = (e: MediaQueryListEvent) => {
			matches = e.matches;
		};

		mediaQueryList.addEventListener('change', handler);

		// Note: cleanup happens when component unmounts via Svelte's reactivity
	}

	return {
		get matches() {
			return matches;
		}
	};
}

/**
 * Reactive boolean for small/mobile viewport (≤700px).
 *
 * @example
 * <script>
 *   import { isSmall } from '$lib/utils/breakpoints';
 *   const small = isSmall();
 * </script>
 *
 * {#if small.matches}
 *   <MobileNav />
 * {:else}
 *   <DesktopNav />
 * {/if}
 */
export function isSmall(): { readonly matches: boolean } {
	return mediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
}

/**
 * Reactive boolean for large/desktop viewport (>700px).
 *
 * @example
 * <script>
 *   import { isLarge } from '$lib/utils/breakpoints';
 *   const large = isLarge();
 * </script>
 *
 * {#if large.matches}
 *   <Sidebar />
 * {/if}
 */
export function isLarge(): { readonly matches: boolean } {
	return mediaQuery(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`);
}
