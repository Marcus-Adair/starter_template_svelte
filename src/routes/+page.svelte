<!-- Demo of responsive styling with @responsive, @small, @large preprocessor -->
<script lang="ts">
	import { isSmall } from "$lib/utils/breakpoints.svelte";

	const small = isSmall();

	let dynamicLabel = $derived(small.matches ? "Mobile" : "Desktop")
</script>
<div class="grid-content">
	<!-- Full bleed hero -->
	<div class="hero grid-fullbleed bg-primary text-primary-foreground">
		<div class="grid-content">
			<div class="grid-main flex flex-col">
				<h1 class="hero-title">Responsive / Capsize / Grid Template System Demo ({dynamicLabel})</h1>
				<p class="hero-subtitle">Full-bleed hero section. Content respects gutters.</p>
			</div>
		</div>
	</div>

	<!-- Content section -->
	<div class="content-section grid-main">
		<h2 class="section-title">Content Section</h2>
		<p class="section-text">
			This section uses .grid-main so it respects the gutters. 8 columns on desktop, 4 on mobile.
			Resize to see it change.
		</p>
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

	<!-- Another full bleed -->
	<div class="accent-section grid-fullbleed bg-accent">
		<div class="grid-content">
			<div class="grid-main">
				<p class="accent-text text-accent-foreground">
					Another full-bleed section. Great for backgrounds, images, etc.
				</p>
			</div>
		</div>
	</div>

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
</div>

<style>
	/* Hero */
	.hero {
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
</style>
