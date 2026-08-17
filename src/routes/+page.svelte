<!-- Demo of responsive styling with @responsive, @small, @large preprocessor -->

<div class="grid-content">
	<!-- Full bleed hero -->
	<div class="hero grid-fullbleed bg-primary text-primary-foreground">
		<div class="grid-content">
			<div class="grid-main flex flex-col">
				<h1 class="hero-title">Grid System Demo</h1>
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
		<p>Grid: var(--grid-columns) columns, var(--grid-gap) gap, var(--grid-gutter) gutter</p>
		<p>Desktop: 8 cols, 24px gap, 64px gutter</p>
		<p>Mobile: 4 cols, 16px gap, 20px gutter</p>
	</div>

	<!-- Breakpoint demo -->
	<div class="breakpoint-demo grid-main">
		<h2 class="section-title">Breakpoint Demo</h2>
		<p class="section-text">
			This box uses @small and @large to change layout per breakpoint.
		</p>
		<div class="demo-box">
			<div class="demo-item">Item 1</div>
			<div class="demo-item">Item 2</div>
			<div class="demo-item">Item 3</div>
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
			font-size: 64px;
			font-weight: 700;
			line-height: 72px;
			margin-bottom: 10px;
		}
	}

	.hero-subtitle {
		@responsive {
			font-size: 20px;
			line-height: 28px;
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
			font-size: 32px;
			line-height: 40px;
			font-weight: 600;
			margin-bottom: 24px;
		}
	}

	.section-text {
		border: 1px dashed blue;
		@responsive {
			font-size: 18px;
			line-height: 28px;
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
			font-size: 14px;
			line-height: 20px;
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
			font-size: 18px;
			line-height: 28px;
		}
	}

	/* Footer */
	.footer-info {
		@responsive {
			padding: 40px 0;
			font-size: 14px;
			line-height: 20px;
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
			background: #333;
			color: white;
			padding: 20px;
			font-size: 16px;
		}
	}
</style>
