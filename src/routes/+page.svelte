<!-- Demo of responsive styling with @responsive, @small, @large preprocessor -->
<script lang="ts">
	import { resolve } from "$app/paths";
	import Hero100vh from "$lib/components/sections/Hero100vh.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import GridMain from "$lib/components/ui-primitives/GridMain.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
	import { isSmall } from "$lib/utils/breakpoints.svelte";

	const small = isSmall();

	let dynamicLabel = $derived(small.matches ? "Mobile" : "Desktop")
</script>


<GridParent>
	<Hero100vh
		heroTitle="Starter Template"
		heroSubTitle={`Responsive / Capsize / Grid Template System Demo (${dynamicLabel}) - Full-bleed hero section. Content respects gutters.`}
	/>

	<GridMain>
		<!-- Content section -->
		<div class="content-section">
			<h2 class="section-title">Content Section</h2>
			<p class="section-text">
				This section uses .grid-main so it respects the gutters. 8 columns on desktop, 4 on mobile.
				Resize to see it change.
				<br/>
				<br/>
				A max-width is applied to this text to showcase consistent line breaks across screen resizing.
			</p>
		</div>

		<!-- Grid items demo -->
		<div class="grid-demo">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each Array(8) as _, i (i)}
				<div class="grid-item bg-secondary text-secondary-foreground rounded-lg">
					<p class="grid-item-text">Col {i + 1}</p>
				</div>
			{/each}
		</div>

		<!-- Breakpoint demo -->
		<div class="breakpoint-demo">
			<h2 class="section-title">Breakpoint Demo</h2>
			<p class="section-text">
				This box uses @small and @large to change layout per breakpoint.
			</p>
			<div class="demo-box">
				<span class="demo-item">Item 1</span>
				<span class="demo-item">Item 2</span>
				<span class="demo-item">Item 3</span>
			</div>
		</div>

		<!-- Navigation demo -->
		<div class="nav-demo">
			<h2 class="section-title">Page Transitions</h2>
			<p class="section-text">
				Click the link below to test the preloader and fade transitions.
			</p>

			<div class="nav-links">
				<Button href={resolve("/about")} variant="outline">Go to About Page</Button>
				<Button href={resolve("/ui-catalog")} variant="outline">View UI Catalog</Button>
			</div>
		</div>
	</GridMain>
</GridParent>

<style>
	/* Content section */
	.content-section {
		@responsive {
			padding: 40px 0;
		}
	}

	.section-title {
		@responsive {
			@text h3Desktop;
			margin-bottom: 24px;
		}
		@small {
			@text h3Mobile;
		}
	}

	.section-text {
		@responsive {
			@text p1;
			max-width: 400px;
		}
		color: var(--muted-foreground);
	}

	/* Grid demo */
	.grid-demo {
		display: grid;
		grid-template-columns: repeat(var(--grid-columns), 1fr);
		gap: var(--grid-gap);
	}

	.grid-item {
		@responsive {
			padding: 24px;
		}
	}

	.grid-item-text {
		@responsive {
			@text p3;
		}
	}

	/* Breakpoint demo */
	.breakpoint-demo {
		@responsive {
			padding: 40px 0;
		}
	}

	.demo-box {
		@responsive {
			display: flex;
			background-color: var(--muted);
			padding: 24px;
			gap: 16px;
			border-radius: var(--radius-md);
		}
		@small {
			flex-direction: column;
		}
	}

	.demo-item {
		@responsive {
			@text p2;
			background-color: var(--secondary);
			color: var(--secondary-foreground);
			padding: 20px;
			border-radius: var(--radius-md);
		}
	}

	/* Nav demo */
	.nav-demo {
		@responsive {
			padding: 40px 0;
		}
	}

	.nav-links {
		@responsive {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			padding-top: 24px;
			margin-top: 24px;
			border-top: 1px solid var(--border);
		}
	}
</style>
