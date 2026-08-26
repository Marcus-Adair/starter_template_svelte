<script lang="ts">
	import { resolve } from "$app/paths";
	import Hero100vh from "$lib/components/sections/Hero100vh.svelte";
	import Badge from "$lib/components/ui-primitives/Badge.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import Card from "$lib/components/ui-primitives/Card.svelte";
	import Checkbox from "$lib/components/ui-primitives/Checkbox.svelte";
	import GridParent from "$lib/components/ui-primitives/GridParent.svelte";
	import Input from "$lib/components/ui-primitives/Input.svelte";
	import Separator from "$lib/components/ui-primitives/Separator.svelte";
	import Textarea from "$lib/components/ui-primitives/Textarea.svelte";

	// Color tokens (border: true for light colors that need visibility)
	const colors = [
		{ name: "background", border: true },
		{ name: "foreground" },
		{ name: "primary" },
		{ name: "primary-foreground", border: true },
		{ name: "secondary" },
		{ name: "secondary-foreground" },
		{ name: "muted" },
		{ name: "muted-foreground" },
		{ name: "accent" },
		{ name: "accent-foreground" },
		{ name: "destructive" },
		{ name: "destructive-foreground", border: true },
		{ name: "card", border: true },
		{ name: "card-foreground" },
		{ name: "popover", border: true },
		{ name: "popover-foreground" },
		{ name: "border" },
		{ name: "input" },
		{ name: "ring" },
	];

	// Typography sections (title + styles array)
	const typeSections = [
		{
			title: "Headings (Desktop)",
			styles: [
				{ style: "h1Desktop", meta: "64/72 · 700" },
				{ style: "h2Desktop", meta: "48/56 · 600" },
				{ style: "h3Desktop", meta: "32/40 · 600" },
			],
		},
		{
			title: "Headings (Universal)",
			styles: [
				{ style: "h4", meta: "24/32 · 600" },
				{ style: "h5", meta: "20/28 · 600" },
				{ style: "h6", meta: "18/24 · 600" },
			],
		},
		{
			title: "Body",
			styles: [
				{ style: "p1", sample: "p1 - Body large for intros and emphasis", meta: "18/28" },
				{ style: "p2", sample: "p2 - Body default for most content", meta: "16/24" },
				{ style: "p3", sample: "p3 - Body small for secondary text", meta: "14/20" },
			],
		},
		{
			title: "Utility",
			styles: [
				{ style: "label", sample: "label - Form labels and buttons", meta: "14/20 · 500" },
				{ style: "caption", sample: "caption - Small text and metadata", meta: "12/16" },
				{ style: "overline", sample: "overline - Section labels", meta: "12/16 · uppercase" },
			],
		},
	];
</script>

{#snippet colorSwatch(name: string, border?: boolean)}
	<div class="color-swatch">
		<div class="color-preview bg-{name}" class:border={border} class:border-border={border}></div>
		<span class="color-label">{name}</span>
	</div>
{/snippet}

{#snippet typeRow(style: string, sample: string, meta: string)}
	<div class="type-row">
		<span class="type-sample type-{style}">{sample}</span>
		<span class="type-meta">{meta}</span>
	</div>
{/snippet}

<GridParent>
	<Hero100vh
		heroTitle="UI Catalog"
		heroSubTitle="Component library for this starter template."
	/>

	<!-- Colors Section -->
	<section class="section grid-main">
		<h2 class="section-title">Colors</h2>
		<p class="section-desc">Semantic color tokens from the design system.</p>

		<div class="color-grid">
			{#each colors as { name, border } (name)}
				{@render colorSwatch(name, border)}
			{/each}
		</div>

	</section>

	<!-- Typography Section -->
	<section class="section grid-main">
		<h2 class="section-title">Typography</h2>
		<p class="section-desc">Text styles from the type system. Use with <code>@text</code> directive.</p>

		{#each typeSections as { title, styles } (title)}
			<div class="subsection">
				<h3 class="subsection-title">{title}</h3>
				<div class="type-stack">
					{#each styles as { style, meta } (style)}
						{@render typeRow(style, style, meta)}
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<section class="section grid-main">
		<h2 class="section-title">Misc.</h2>
		<p class="section-desc">Other misc UI components.</p>

		<div class="subsection">
			<h3 class="subsection-title">Enhanced Image</h3>
			<p class="subsection-desc">SvelteKit's <code>&lt;enhanced:img&gt;</code> for automatic image optimization.</p>
			<div class="image-demo">
				<enhanced:img src="$lib/assets/hammerhead-shark_16x9.png" alt="Placeholder landscape image" />
			</div>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">Separator</h3>
			<Separator orientation="horizontal"/>
		</div>

		<div class="subsection">
			<h3 class="subsection-title">Checkbox</h3>
			<div class="input-stack">
				<Checkbox id="terms-checkbox" label="I agree to the terms and conditions" />
				<Checkbox id="newsletter-checkbox" label="Subscribe to newsletter" checked />
				<Checkbox id="disabled-checkbox" label="Disabled option" disabled />
			</div>
		</div>
	</section>

	<!-- Input & Textarea Section (side by side) -->
	<div class="two-col-section grid-main">
		<section class="section">
			<h2 class="section-title">Input</h2>
			<p class="section-desc">Text fields for user input.</p>

			<div class="subsection">
				<h3 class="subsection-title">With Labels</h3>
				<div class="input-stack">
					<Input id="full-name-input" label="Full name" type="text" placeholder="John Doe" />
					<Input id="email-addr-input" label="Email address" type="email" placeholder="you@example.com" />
					<Input id="password-input" label="Password" type="password" placeholder="••••••••" />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">States</h3>
				<div class="input-stack">
					<Input id="default-input" label="Default" placeholder="Default input" />
					<Input id="disabled-input" label="Disabled" placeholder="Can't edit this" disabled />
					<Input id="invalid-input" label="Invalid" placeholder="Something's wrong" aria-invalid="true" />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">Required</h3>
				<div class="input-stack">
					<Input id="required-name-input" label="Name *" type="text" placeholder="Required field" required />
					<Input id="required-email-input" label="Email *" type="email" placeholder="you@example.com" required />
				</div>
			</div>

			<div class="subsection">
				<h3 class="subsection-title">File</h3>
				<Input id="upload-doc-input" label="Upload document" type="file" />
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Textarea</h2>
			<p class="section-desc">Multi-line text input.</p>

			<div class="subsection">
				<h3 class="subsection-title">With Labels</h3>
				<div class="input-stack">
					<Textarea label="Bio" placeholder="Tell us about yourself..." />
					<Textarea label="Comments" placeholder="Leave a comment..." />
					<Textarea label="Disabled" placeholder="Can't edit this" disabled />
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

	.subsection-desc {
		@responsive {
			@text p3;
			margin-bottom: 16px;
		}
		color: var(--muted-foreground);
	}

	.image-demo {
		@responsive {
			max-width: 400px;
			border-radius: var(--radius-md);
		}
		overflow: hidden;
	}
	.image-demo img {
		width: 100%;
		height: auto;
		display: block;
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

	.input-stack {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 12px;
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
			border-radius: var(--radius-md);
		}
	}

	.color-label {
		@responsive {
			@text p3;
		}
		color: var(--muted-foreground);
	}

	/* Typography */
	.type-stack {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	.type-row {
		@responsive {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 24px;
		}
	}

	.type-meta {
		@responsive {
			@text caption;
			flex-shrink: 0;
		}
		color: var(--muted-foreground);
	}

	.type-h1Desktop { @responsive { @text h1Desktop; } }
	.type-h2Desktop { @responsive { @text h2Desktop; } }
	.type-h3Desktop { @responsive { @text h3Desktop; } }
	.type-h4 { @responsive { @text h4; } }
	.type-h5 { @responsive { @text h5; } }
	.type-h6 { @responsive { @text h6; } }
	.type-p1 { @responsive { @text p1; } }
	.type-p2 { @responsive { @text p2; } }
	.type-p3 { @responsive { @text p3; } }
	.type-label { @responsive { @text label; } }
	.type-caption { @responsive { @text caption; } }
	.type-overline { @responsive { @text overline; } }
</style>
