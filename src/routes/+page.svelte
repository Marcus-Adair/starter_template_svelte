<!-- Demo of responsive styling with @responsive, @small, @large preprocessor -->
<script lang="ts">
	import { resolve } from "$app/paths";
	import Hero100vh from "$lib/components/sections/Hero100vh.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import GridMain from "$lib/components/ui-primitives/GridMain.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
	import { isSmall } from "$lib/utils/breakpoints.svelte";

	// Use isSmall reactive utility for conditional breakpoint behavior
	const small = isSmall();
	let dynamicLabel = $derived(small.matches ? "Mobile" : "Desktop")
</script>

<!-- Hero with fixed content - outside main GridParent -->
<Hero100vh
	heroTitle="Starter Template"
	heroSubTitle={`Responsive / CapsizeCSS / Grid-Template - System Demo (${dynamicLabel}) - Full-bleed hero section. Content respects gutters.`}
/>

<!-- Page content - scrolls over and clips the fixed hero -->
<GridParent class="page-content">
	<GridMain>
		<!-- Content section + Grid Demo -->
		<div class="section-container">
			<h2 class="section-title">Content Section</h2>
			<p class="section-text">
				This section uses .grid-main so it respects the gutters. 8 columns on desktop, 4 on mobile.
				Resize to see it change.
				<br/>
				<br/>
				A max-width is applied to this text to showcase consistent line breaks across screen resizing.
			</p>
		</div>
		<div class="grid-demo">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each Array(8) as _, i (i)}
				<div class="grid-item-col bg-secondary text-secondary-foreground rounded-lg">
					<p class="grid-item-text">Col {i + 1}</p>
				</div>
			{/each}
		</div>

		<!-- Breakpoint demo -->
		<div class="section-container">
			<h2 class="section-title">Breakpoint Demo</h2>
			<p class="section-text">
				This box uses @small and @large to change layout per breakpoint (re-size screen to be small on desktop to view). 
			</p>

			<div class="demo-box">
				<span class="demo-item">Item 1</span>
				<span class="demo-item">Item 2</span>
				<span class="demo-item">Item 3</span>
			</div>
		</div>

		<!-- Navigation demo -->
		<div class="section-container">
			<h2 class="section-title">Page Transitions</h2>
			<p class="section-text">
				Click the link below to test the preloader and fade transitions.
			</p>

			<div class="nav-links">
				<Button href={resolve("/about")} variant="outline">Go to About Page</Button>
				<Button href={resolve("/ui-catalog")} variant="outline">View UI Catalog</Button>
			</div>
		</div>

		<div class="flex flex-col capsize-margin">
			<h2 class="section-title">CapsizeCSS</h2>
			<p class="section-text">
				This shows the effect of CapsizeCSS when no gap exists added between containers.
			</p>
			<p class="section-text">
				Notice the touching containers. CapsizeCSS cuts whitespace off the tops and bottoms of text, allowing for more precise/predictable design implementation.
			</p>
			<p class="section-text">
				Use dev mode in Chrome and the Inspect tool to highlight text and see Capsize effect.
			</p>
			<p class="section-text">
				- font-size and line-height is baked into the responsive-typography system.
			</p>
		</div>
	</GridMain>
</GridParent>

<style>
	.section-title {
		@responsive { @text h3Desktop; }
		@small { @text h3Mobile; }
	}
	.section-container {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 24px;

			margin-top: 56px
		}
	}
	.section-text {
		@responsive {
			@text p1;
			max-width: 960px;
		}
		color: var(--muted-foreground);
	}

	.grid-demo {
		margin-top: 24px;
		display: grid;
		grid-template-columns: repeat(var(--grid-columns), 1fr);
		@responsive {
			gap: var(--grid-gap);
		}
	}
	.grid-item-col {
		@responsive {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 24px 0;
		}
	}
	.grid-item-text {
		@responsive {
			@text p3;
		}
	}


	.demo-box {
		display: flex;
		@responsive {
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
		background-color: var(--secondary);
		color: var(--secondary-foreground);
		@responsive {
			@text p2;
			padding: 20px;
			border-radius: var(--radius-md);
		}
	}

	.nav-links {
		display: flex;
		flex-wrap: wrap;
		@responsive {
			gap: 12px;
			padding-top: 24px;
			margin-top: 24px;
			border-top: 1px solid var(--border);
		}
	}
	.capsize-margin {
		@responsive { 
			margin-top: 56px;
			margin-bottom: 56px; 
		}
	}
</style>
