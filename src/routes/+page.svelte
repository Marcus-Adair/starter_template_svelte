<!-- Demo of responsive styling with @responsive, @small, @large preprocessor -->
<script lang="ts">
	import { resolve } from "$app/paths";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import GridFullBleed from "$lib/components/ui-primitives/GridFullBleed.svelte";
	import GridMain from "$lib/components/ui-primitives/GridMain.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
	import { isSmall } from "$lib/utils/breakpoints.svelte";

	const small = isSmall();

	let dynamicLabel = $derived(small.matches ? "Mobile" : "Desktop")
</script>


<GridParent>
	<!-- GridFullBleed component: styles via class require :global() below -->
	<GridFullBleed class="hero bg-primary text-primary-foreground">
		<GridParent>
			<div class="grid-main flex flex-col">
				<h1 class="hero-title">Responsive / Capsize / Grid Template System Demo ({dynamicLabel})</h1>
				<p class="hero-subtitle">Full-bleed hero section. Content respects gutters.</p>
			</div>
		</GridParent>
	</GridFullBleed>


<div class="">
	
</div>

	<!-- Content section -->
	<div class="content-section grid-main">
		<h2 class="section-title">Content Section</h2>
		<p class="section-text">
			This section uses .grid-main so it respects the gutters. 8 columns on desktop, 4 on mobile.
			Resize to see it change.
			<br/>
			<br/>
			A max-width is applied to this text to showcase consistent line breaks across screen resizing.
		</p>
		<Button class="custom-btn" variant="secondary" onclick={() => console.log("Button pressed!!")}>
			Button Test
		</Button>
	</div>

	<!-- Grid items demo -->
	<div class="grid-demo grid-main">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array(8) as _, i (i)}
			<div class="grid-item bg-secondary text-secondary-foreground rounded-lg">
				<p class="grid-item-text">Col {i + 1}</p>
			</div>
		{/each}
	</div>

	<!-- Plain div with grid-fullbleed: normal scoping works, no :global() needed -->
	<div class="accent-section grid-fullbleed bg-accent">
		<GridParent>
			<div class="grid-main">
				<p class="accent-text text-accent-foreground">
					Another full-bleed section. Great for backgrounds, images, etc.
				</p>
			</div>
		</GridParent>
	</div>

	<!-- GridMain component: styles via class require :global() below -->
	<GridMain class="component-demo">
		<h2 class="section-title">GridMain Component Demo</h2>
		<p class="section-text">This uses the GridMain component with a custom class.</p>
	</GridMain>

	<!-- Footer info -->
	<div class="footer-info grid-main text-muted-foreground">
		<p class="footer-text">Grid: var(--grid-columns) columns, var(--grid-gap) gap, var(--grid-gutter) gutter</p>
		<p class="footer-text">Desktop: 8 cols, 24px gap, 64px gutter</p>
		<p class="footer-text">Mobile: 4 cols, 16px gap, 20px gutter</p>
	</div>

	<!-- Breakpoint demo -->
	<div class="breakpoint-demo grid-main">
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
	<div class="nav-demo grid-main">
		<h2 class="section-title">Page Transitions</h2>
		<p class="section-text">
			Click the link below to test the preloader and fade transitions.
		</p>

		<Button 
			href={resolve("/about")}
			variant="primary"
			class="no-link-padding"
		>
			Go to About Page
		</Button>

	</div>
</GridParent>

<style>
	/* Hero (GridFullBleed component - requires :global) */
	:global(.hero) {
		@responsive {
			padding: 80px 0;
		}
	}

	:global(.custom-btn) {
		@responsive {
			height: 80px;
		}
	}

	/* GridMain component demo - requires :global */
	:global(.component-demo) {
		@responsive {
			padding: 40px 0;
			border: 2px dashed green;
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

	/* Content section */
	.content-section {
		@responsive {
			border: 1px dashed pink;
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
		border: 1px dashed blue;
		@responsive {
			@text p1;
			max-width: 400px;
		}
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

	/* Accent section */
	.accent-section {
		@responsive {
			padding: 60px 0;
			margin-top: 40px;
		}
	}

	.accent-text {
		@responsive {
			@text p1;
		}
	}

	/* Footer */
	.footer-info {
		@responsive {
			padding: 40px 0;
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	.footer-text {
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
			background: #f0f0f0;
			padding: 24px;
			gap: 16px;
		}
		@small {
			flex-direction: column;
		}

	}

	.demo-item {
		@responsive {
			@text p2;
			background: #333;
			color: white;
			padding: 20px;
		}
	}

	/* Nav demo */
	.nav-demo {
		@responsive {
			padding: 40px 0;
		}
	}	
</style>
