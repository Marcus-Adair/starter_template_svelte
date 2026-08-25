<script lang="ts">
	import { resolve } from "$app/paths";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import GridFullBleed from "$lib/components/ui-primitives/GridFullBleed.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
</script>

<GridParent>
	<!-- Hero -->
	<GridFullBleed class="hero bg-primary text-primary-foreground">
		<GridParent>
			<div class="grid-main flex flex-col">
				<h1 class="hero-title">About</h1>
				<p class="hero-subtitle">This is the about page. Use it to test page transitions.</p>
			</div>
		</GridParent>
	</GridFullBleed>

	<!-- Content Section -->
	<section class="section grid-main">
		<h2 class="section-title">Page Transition Test</h2>
		<p class="section-desc">
			Navigate between pages to see the preloader fade transitions in action.
			Clicking the current page link should not trigger a transition.
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

	.hero-title {
		@responsive {
			@text h1Desktop;
			margin-bottom: 10px;
		}
		@small {
			@text h1Mobile;
		}
	}

	.hero-subtitle {
		@responsive {
			@text p1;
			margin-top: 16px;
		}
	}

	/* Sections */
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
