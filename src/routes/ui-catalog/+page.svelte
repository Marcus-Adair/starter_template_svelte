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

	const primitiveColors = [
		{ group: "Dark", colors: ["dark-1", "dark-2", "dark-3", "dark-4"] },
		{ group: "Neutral", colors: ["neutral-1", "neutral-2", "neutral-3", "neutral-4", "neutral-5"] },
		{ group: "Light", colors: ["light-1", "light-2", "light-3", "light-4", "light-5", "light-6", "light-7"], border: true },
		{ group: "Teal", colors: ["teal-1", "teal-2", "teal-3"] },
		{ group: "Rose", colors: ["rose-1", "rose-2"], border: true },
		{ group: "Red", colors: ["red-1", "red-2"] },
	];

	const semanticColors = [
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
		{ name: "card", border: true },
		{ name: "card-foreground" },
		{ name: "border" },
		{ name: "input" },
		{ name: "ring" },
		{ name: "destructive" },
	];

	// Typography specs:
	const typeStyles = [
		{ style: "h1", sample: "Heading 01", font: "Aktura", weight: "Bold", spacing: "-4%", lineHeight: "94%", size: "160px" },
		{ style: "h2", sample: "Heading 02", font: "Aktura", weight: "Bold", spacing: "-4%", lineHeight: "110%", size: "112px" },
		{ style: "h3", sample: "Heading 03", font: "Aktura", weight: "Regular", spacing: "-4%", lineHeight: "94%", size: "96px" },
		{ style: "h4", sample: "Heading 04", font: "Aktura", weight: "Regular", spacing: "-4%", lineHeight: "110%", size: "64px" },
		{ style: "h5", sample: "Heading 05", font: "Aktura", weight: "Bold", spacing: "-4%", lineHeight: "94%", size: "48px" },
		{ style: "h6", sample: "Heading 06", font: "Aktura", weight: "Regular", spacing: "-4%", lineHeight: "110%", size: "36px" },
		{ style: "h7", sample: "Heading 07", font: "Aktura", weight: "Regular", spacing: "-4%", lineHeight: "110%", size: "28px" },
		{ style: "h8", sample: "Heading 08", font: "Aktura", weight: "Regular", spacing: "-4%", lineHeight: "110%", size: "22px" },
		{ style: "h9", sample: "Heading 09", font: "Aktura", weight: "Regular", spacing: "-1%", lineHeight: "110%", size: "24px" },
		{ style: "h10", sample: "Heading 10", font: "Aktura", weight: "Regular", spacing: "-1%", lineHeight: "140%", size: "18px" },
		{ style: "p1", sample: "Paragraph 01", font: "Satoshi", weight: "Regular", spacing: "-4%", lineHeight: "140%", size: "24px" },
		{ style: "p2", sample: "Paragraph 02", font: "Satoshi", weight: "Regular", spacing: "-4%", lineHeight: "155%", size: "22px" },
		{ style: "p3", sample: "Paragraph 03", font: "Satoshi", weight: "Regular", spacing: "-4%", lineHeight: "150%", size: "18px" },
		{ style: "p4", sample: "Paragraph 04", font: "Satoshi", weight: "Regular", spacing: "-4%", lineHeight: "150%", size: "12px" },
		{ style: "kicker1", sample: "Kicker 01", font: "Satoshi", weight: "Medium", spacing: "+4%", lineHeight: "110%", size: "17px" },
		{ style: "kicker2", sample: "Kicker 02", font: "Satoshi", weight: "Medium", spacing: "+4%", lineHeight: "130%", size: "12px" },
		{ style: "link1", sample: "Link 01", font: "Satoshi", weight: "Medium", spacing: "-2%", lineHeight: "140%", size: "18px" },
		{ style: "link2", sample: "Link 02", font: "Satoshi", weight: "Medium", spacing: "-4%", lineHeight: "130%", size: "14px" },
		{ style: "label", sample: "Label", font: "Satoshi", weight: "Medium", spacing: "0%", lineHeight: "140%", size: "14px" },
	];
</script>

{#snippet colorSwatch(name: string, border?: boolean)}
	<div class="color-swatch">
		<div
			class="color-preview"
			class:border={border}
			class:border-border={border}
			style="background-color: var(--{name});"
		></div>
		<span class="color-label">{name}</span>
	</div>
{/snippet}

{#snippet specRow(label: string, value: string)}
	<div class="spec-row">
		<span class="spec-label">{label}</span>
		<span class="spec-value">{value}</span>
	</div>
{/snippet}

{#snippet typeCard(item: typeof typeStyles[0])}
	<div class="type-card">
		<span class="type-sample type-{item.style}">{item.sample}</span>
		<div class="spec-table">
			{@render specRow("Font", item.font)}
			{@render specRow("Weight", item.weight)}
			{@render specRow("Spacing", item.spacing)}
			{@render specRow("Line Height", item.lineHeight)}
			{@render specRow("Size", item.size)}
		</div>
	</div>
{/snippet}

<Hero100vh
	heroTitle="UI Catalog"
	heroSubTitle="Component library for this starter template."
/>

<GridParent class="page-content">
	<!-- Misc. -->
	<section class="section grid-main">
		<h2 class="section-title">Misc.</h2>
		<p class="section-desc">Other misc UI components.</p>

		<div class="subsection">
			<h3 class="subsection-title">Enhanced Image</h3>
			<p class="subsection-desc">SvelteKit's <code>&lt;enhanced:img&gt;</code> is the go-to for automatic image optimization.</p>
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

			<!-- Sizes -->
			<div class="subsection">
				<h3 class="subsection-title">Sizes</h3>
				<div class="badge-row">
					<Badge size="sm">Small</Badge>
					<Badge size="default">Default</Badge>
					<Badge size="lg">Large</Badge>
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
					<p>This card uses the default spacing.</p>
				</Card>
				<Card size="sm">
					<strong>Small Card</strong>
					<p>This card uses smaller spacing ("sm").</p>
				</Card>
			</div>
		</div>
	</section>

	<!-- Colors Section -->
	<section class="section grid-main">
		<h2 class="section-title">Colors</h2>
		<p class="section-desc">Primitive and semantic color tokens from the design system.</p>

		<!-- Primitive Colors -->
		<div class="subsection">
			<h3 class="subsection-title">Primitives</h3>
			<div class="primitives-wrapper">
				{#each primitiveColors as { group, colors, border } (group)}
					<div class="color-group">
						<span class="color-group-label">{group}</span>
						<div class="color-group-grid">
							{#each colors as name (name)}
								{@render colorSwatch(name, border)}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Semantic Colors -->
		<div class="subsection">
			<h3 class="subsection-title">Semantic</h3>
			<div class="color-group-grid">
				{#each semanticColors as { name, border } (name)}
					{@render colorSwatch(name, border)}
				{/each}
			</div>
		</div>
	</section>

	<!-- Typography Section -->
	<section class="section grid-main">
		<h2 class="section-title">Typography</h2>
		<p class="section-desc">Text styles from the type system. Use with <code>@text</code> directive.</p>

		<div class="type-grid">
			{#each typeStyles as item (item.style)}
				{@render typeCard(item)}
			{/each}
		</div>
	</section>

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
			@text h5;
			margin-bottom: 8px;
		}
	}

	.section-desc {
		@responsive {
			@text p3;
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
			@text h8;
			margin-bottom: 16px;
		}
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

	.color-preview {
		@responsive {
			width: 100%;
			height: 75px;
			border-radius: var(--radius-md);
		}
	}
	
	.color-group-grid {
		@responsive {
			display: grid;
			grid-template-columns: repeat(4, 100px);
			gap: var(--space-lg);
		}
		@small {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.color-swatch {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
		}
	}

	.color-group {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
		}
	}

	.color-group-label {
		@responsive {
			@text kicker2;
		}
		color: var(--muted-foreground);
		text-transform: uppercase;
	}

	.color-label {
		@responsive {
			@text p4;
		}
		color: var(--muted-foreground);
	}

	/* Typography */
	.type-grid {
		@responsive {
			display: flex;
			flex-direction: column;
			gap: var(--space-3xl);
		}
	}

	.type-card {
		@responsive {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: var(--space-xl);
		}
		@small {
			flex-direction: column;
			gap: var(--space-md);
		}
	}

	.type-sample {
		flex: 1;
	}

	.spec-table {
		@responsive {
			display: flex;
			flex-direction: column;
		}
	}

	.spec-row {
		@responsive {
			display: flex;
			
			justify-content: space-between;
			padding: var(--space-sm) 0;
			border-bottom: 1px solid var(--border);
		}
		@large {
			min-width: 260px;
		}
	}

	.spec-label {
		@responsive {
			@text p4;
		}
		color: var(--muted-foreground);
	}

	.spec-value {
		@responsive {
			@text p4;
		}
	}

	/* Headings */
	.type-h1 { @responsive { @text h1; } }
	.type-h2 { @responsive { @text h2; } }
	.type-h3 { @responsive { @text h3; } }
	.type-h4 { @responsive { @text h4; } }
	.type-h5 { @responsive { @text h5; } }
	.type-h6 { @responsive { @text h6; } }
	.type-h7 { @responsive { @text h7; } }
	.type-h8 { @responsive { @text h8; } }
	.type-h9 { @responsive { @text h9; } }
	.type-h10 { @responsive { @text h10; } }

	/* Paragraph */
	.type-p1 { @responsive { @text p1; } }
	.type-p2 { @responsive { @text p2; } }
	.type-p3 { @responsive { @text p3; } }
	.type-p4 { @responsive { @text p4; } }

	/* Kicker */
	.type-kicker1 { @responsive { @text kicker1; } }
	.type-kicker2 { @responsive { @text kicker2; } }

	/* Link */
	.type-link1 { @responsive { @text link1; } }
	.type-link2 { @responsive { @text link2; } }

	/* Utility */
	.type-label { @responsive { @text label; } }

	/* Primitives wrapper - 2 cols on desktop, 1 on mobile */
	.primitives-wrapper {
		@responsive {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-xl);
		}
		@small {
			grid-template-columns: 1fr;
		}
	}
</style>
