<script lang="ts">
	import { resolve } from "$app/paths";
	import Badge from "$lib/components/ui-primitives/Badge.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import Card from "$lib/components/ui-primitives/Card.svelte";
	import Checkbox from "$lib/components/ui-primitives/Checkbox.svelte";
	import GridFullBleed from "$lib/components/ui-primitives/GridFullBleed.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
	import Input from "$lib/components/ui-primitives/Input.svelte";
	import Label from "$lib/components/ui-primitives/Label.svelte";
	import Separator from "$lib/components/ui-primitives/Separator.svelte";
	import Textarea from "$lib/components/ui-primitives/Textarea.svelte";
</script>

<GridParent>
	<!-- Hero -->
	<GridFullBleed class="hero bg-primary text-primary-foreground">
		<GridParent>
			<div class="grid-main flex flex-col">
				<h1 class="hero-title">UI Catalog</h1>
				<p class="hero-subtitle">Component library for this starter template.</p>
				<span>Inspired by <Button href="https://shadcn-svelte.com/" variant="link">shadcn-svelte</Button></span>
			</div>
		</GridParent>
	</GridFullBleed>

	<!-- Colors Section -->
	<section class="section grid-main">
		<h2 class="section-title">Colors</h2>
		<p class="section-desc">Semantic color tokens from the design system.</p>

		<div class="color-grid">
			<div class="color-swatch">
				<div class="color-preview bg-background border border-border"></div>
				<span class="color-label">background</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-foreground"></div>
				<span class="color-label">foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-primary"></div>
				<span class="color-label">primary</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-primary-foreground border border-border"></div>
				<span class="color-label">primary-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-secondary"></div>
				<span class="color-label">secondary</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-secondary-foreground"></div>
				<span class="color-label">secondary-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-muted"></div>
				<span class="color-label">muted</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-muted-foreground"></div>
				<span class="color-label">muted-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-accent"></div>
				<span class="color-label">accent</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-accent-foreground"></div>
				<span class="color-label">accent-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-destructive"></div>
				<span class="color-label">destructive</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-destructive-foreground border border-border"></div>
				<span class="color-label">destructive-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-card border border-border"></div>
				<span class="color-label">card</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-card-foreground"></div>
				<span class="color-label">card-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-popover border border-border"></div>
				<span class="color-label">popover</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-popover-foreground"></div>
				<span class="color-label">popover-foreground</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-border"></div>
				<span class="color-label">border</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-input"></div>
				<span class="color-label">input</span>
			</div>
			<div class="color-swatch">
				<div class="color-preview bg-ring"></div>
				<span class="color-label">ring</span>
			</div>
		</div>

	</section>


	<section class="section grid-main">
		<h2 class="section-title">Misc.</h2>
		<p class="section-desc">Other misc UI components.</p>


		<div class="subsection">
			<h3 class="subsection-title">Separator:</h3>
			<Separator orientation="horizontal"/>
			<Checkbox></Checkbox>
		</div>
	</section>

	<!-- Input & Textarea Section (side by side) -->
	<div class="two-col-section grid-main">
		<section class="section">
			<h2 class="section-title">Input</h2>
			<p class="section-desc">Text fields for user input.</p>

			<div class="subsection">
				<h3 class="subsection-title">Types</h3>
				<div class="input-stack">
					<Input type="text" placeholder="Text input" />
					<Input type="email" placeholder="Email input" />
					<Input type="password" placeholder="Password input" />
					<Input type="number" placeholder="Number input" />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">States</h3>
				<div class="input-stack">
					<Input placeholder="Default" />
					<Input placeholder="Disabled" disabled />
					<Input placeholder="Invalid" aria-invalid="true" />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">File</h3>
				<Input type="file" />
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Textarea & Label</h2>
			<p class="section-desc">Multi-line input and form labels.</p>

			<div class="subsection">
				<h3 class="subsection-title">Textarea</h3>
				<div class="input-stack">
					<Textarea placeholder="Default textarea" />
					<Textarea placeholder="Disabled" disabled />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">Label</h3>
				<div class="input-stack">
					<div class="label-field">
						<Label for="example-input">Email address</Label>
						<Input id="example-input" type="email" placeholder="you@example.com" />
					</div>
					<div class="label-field" data-disabled="true">
						<Label for="disabled-input">Disabled field</Label>
						<Input id="disabled-input" placeholder="Can't edit this" disabled />
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- Button & Badge Section (side by side) -->
	<div class="two-col-section grid-main">
		<section class="section">
			<h2 class="section-title">Button</h2>
			<p class="section-desc">Variants, sizes, and states.</p>

			<!-- Variants -->
			<div class="subsection">
				<h3 class="subsection-title">Variants</h3>
				<div class="button-row">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>

			<!-- Sizes -->
			<div class="subsection">
				<h3 class="subsection-title">Sizes</h3>
				<div class="button-row button-row--align-center">
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
					</Button>
				</div>
			</div>

			<!-- States -->
			<div class="subsection">
				<h3 class="subsection-title">States</h3>
				<div class="button-row">
					<Button>Default</Button>
					<Button disabled>Disabled</Button>
				</div>
			</div>

			<!-- As Link -->
			<div class="subsection">
				<h3 class="subsection-title">As Link</h3>
				<div class="button-row">
					<Button variant="link" href="https://svelte.dev" target="_blank">External Link</Button>
					<Button variant="link" href={resolve("/")}>Internal Link</Button>
				</div>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Badge</h2>
			<p class="section-desc">Labels, tags, and status indicators.</p>

			<!-- Variants -->
			<div class="subsection">
				<h3 class="subsection-title">Variants</h3>
				<div class="badge-row">
					<Badge variant="default">Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="ghost">Ghost</Badge>
					<Badge variant="link">Link</Badge>
				</div>
			</div>

			<!-- As Link -->
			<div class="subsection">
				<h3 class="subsection-title">As Link</h3>
				<div class="badge-row">
					<Badge variant="default" href="#">Clickable</Badge>
					<Badge variant="secondary" href="#">Clickable</Badge>
					<Badge variant="outline" href="#">Clickable</Badge>
				</div>
			</div>
		</section>
	</div>

	<!-- Card Section -->
	<section class="section grid-main">
		<h2 class="section-title">Card</h2>
		<p class="section-desc">Container for grouping related content.</p>

		<div class="subsection">
			<h3 class="subsection-title">Sizes</h3>
			<div class="card-grid">
				<Card>
					<strong>Default Card</strong>
					<p>This card uses the default spacing (24px).</p>
				</Card>
				<Card size="sm">
					<strong>Small Card</strong>
					<p>This card uses smaller spacing (16px).</p>
				</Card>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<div class="nav-row grid-main">
		<Button href={resolve("/")} variant="outline">Back to Home</Button>
	</div>
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

	.two-col-section {
		@responsive {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 48px;
		}
		@small {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}

	.section-title {
		@responsive {
			@text h2Desktop;
			margin-bottom: 8px;
		}
		@small {
			@text h2Mobile;
		}
	}

	.section-desc {
		@responsive {
			@text p2;
			margin-bottom: 32px;
		}
		color: var(--muted-foreground);
	}

	.subsection {
		@responsive {
			margin-bottom: 32px;
		}
	}

	.subsection-title {
		@responsive {
			@text p2;
			margin-bottom: 16px;
		}
		font-weight: 600;
	}

	.button-row,
	.badge-row {
		@responsive {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
		}
	}

	.button-row--align-center {
		align-items: center;
	}

	.badge-row {
		align-items: center;
	}

	.input-grid {
		@responsive {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
			max-width: 600px;
		}
		@small {
			grid-template-columns: 1fr;
		}
	}

	.input-stack {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}

	.label-field {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}
	}

	.card-grid {
		@responsive {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
		@small {
			grid-template-columns: 1fr;
		}
	}

	.nav-row {
		@responsive {
			padding: 40px 0;
			border-top: 1px solid var(--border);
		}
	}

	/* Colors */
	.color-grid {
		@responsive {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
		}
	}

	.color-swatch {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 8px;
			max-width: 64px;
		}
	}

	.color-preview {
		@responsive {
			width: 64px;
			height: 64px;
			border-radius: 8px;
		}
	}

	.color-label {
		@responsive {
			@text p3;
		}
		color: var(--muted-foreground);
	}
</style>
