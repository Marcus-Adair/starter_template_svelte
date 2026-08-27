<script lang="ts">
	import { resolve } from "$app/paths";
	import Hero100vh from "$lib/components/sections/Hero100vh.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
</script>

<!-- Hero with fixed content - outside main GridParent -->
<Hero100vh
	heroTitle="About Page"
	heroSubTitle="This is the about page, and its used to test page transitions."
/>

<!-- Page content - scrolls over and clips the fixed hero -->
<GridParent class="page-content">
	<!-- Content Section -->
	<section class="section grid-main">
		<h2 class="section-title">Page Transition Test</h2>
		
		<p class="section-desc">
			Navigate between pages to see the preloader fade transitions in action.
			Clicking the current page link should not trigger a transition.
		</p>

		<p class="section-desc">
			Other features in this starter include (but are not limited to): skeleton Header/Footer components, SmoothScroll, Tailwind integration, and light/dark theme support.
		</p>

		<div class="button-row">
			<Button href={resolve("/")} variant="outline">Back to Home</Button>
			<Button href={resolve("/about")} variant="ghost">Go To About (No Transition)</Button>
		</div>
	</section>
</GridParent>

<style>
	/* Hero (GridFullBleed component - requires :global) */
	:global(.hero) {
		@responsive {
			padding: 80px 0;
		}
	}

	.section {
		@responsive {
			padding: 48px 0;
		}
	}

	.section-title {
		@responsive {
			@text h2Desktop;
			margin-bottom: 20px;
		}
		@small {
			@text h2Mobile;
		}
	}

	.section-desc {
		@responsive {
			@text p1;
			margin-bottom: 32px;
			max-width: 960px;
		}
		color: var(--muted-foreground);
	}

	.button-row {
		@responsive {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
		}
	}
</style>
