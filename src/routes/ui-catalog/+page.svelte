<script lang="ts">
	import { resolve } from "$app/paths";
	import Hero100vh from "$lib/components/sections/Hero100vh.svelte";
	import Badge from "$lib/components/ui-primitives/Badge.svelte";
	import Button from "$lib/components/ui-primitives/Button.svelte";
	import Card from "$lib/components/ui-primitives/Card.svelte";
	import Checkbox from "$lib/components/ui-primitives/Checkbox.svelte";
	import { RadioGroup, RadioItem } from "$lib/components/ui-primitives/Radio";
	import { GridParent } from "$lib/components/ui-primitives/Grid";
	import { Input, Textarea } from "$lib/components/ui-primitives/Form";
	import Separator from "$lib/components/ui-primitives/Separator.svelte";

	// Search input demo state
	let searchValue = $state("");

	// Color utility functions
	function parseRgb(str: string): [number, number, number] | null {
		const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
	}

	function rgbToHex(r: number, g: number, b: number): string {
		return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
	}

	function luminance(r: number, g: number, b: number): number {
		const [rs, gs, bs] = [r, g, b].map(c => {
			c = c / 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
	}

	// Svelte action to populate color info
	function colorInfo(node: HTMLElement) {
		const style = getComputedStyle(node);
		const rgb = parseRgb(style.backgroundColor);
		if (!rgb) return;

		const [r, g, b] = rgb;
		const isDark = luminance(r, g, b) < 0.5;
		const hex = rgbToHex(r, g, b);

		node.style.color = isDark ? 'var(--primary-foreground)' : 'var(--foreground)';
		const valuesEl = node.querySelector('.color-values') as HTMLElement;
		if (valuesEl) {
			valuesEl.textContent = hex;
		}
	}

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
	<div class="flex flex-col gap-sm">
		<div
			class="color-preview"
			class:border={border}
			class:border-border={border}
			style="background-color: var(--{name});"
			use:colorInfo
		>
			<div class="color-values"></div>
		</div>
		<span class="type-p4 text-muted-foreground">{name}</span>
	</div>
{/snippet}

{#snippet specRow(label: string, value: string)}
	<div class="spec-row flex justify-between py-sm">
		<span class="type-p4 text-muted-foreground">{label}</span>
		<span class="type-p4">{value}</span>
	</div>
{/snippet}

{#snippet typeCard(item: typeof typeStyles[0])}
	<div class="type-card-mobile flex justify-between items-start gap-xl">
		<span class="flex-1 type-{item.style}">{item.sample}</span>
		<div class="flex flex-col">
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
	<section class="section py-3xl grid-main">
		<h2 class="type-h5 mb-sm">Misc.</h2>
		<p class="type-p3 mb-2xl text-muted-foreground">Other misc UI components.</p>

		<div class="subsection mb-2xl">
			<h3 class="type-h8 mb-lg">Enhanced Image</h3>
			<p class="type-p3 mb-lg text-muted-foreground">SvelteKit's <code>&lt;enhanced:img&gt;</code> is the go-to for automatic image optimization.</p>
			<div class="image-demo overflow-hidden rounded-md" style="max-width: 400px;">
				<enhanced:img 
					class="w-full h-auto block" 
					src="$lib/assets/hammerhead-shark_16x9.png" 
					alt="Placeholder landscape image" 
				/>
			</div>
		</div>

		<div class="subsection mb-2xl">
			<h3 class="type-h8 mb-lg">Separator</h3>
			<Separator orientation="horizontal"/>
		</div>
	</section>

	<!-- Checkbox & Radio Section (side by side) -->
	<div class="two-col-section grid desktop:grid-cols-2 gap-3xl grid-main">
		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Checkbox</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Multi-select options.</p>

			<div class="flex flex-col gap-md">
				<Checkbox id="check1" label="Default checkbox" />
				<Checkbox id="check2" label="Checked by default" checked={true} />
				<Checkbox id="check3" label="Disabled checkbox" disabled />
			</div>
		</section>

		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Radio</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Single-select options.</p>

			<RadioGroup value="option1">
				<RadioItem value="option1" id="radio1" label="Option 1" />
				<RadioItem value="option2" id="radio2" label="Option 2" />
				<RadioItem value="option3" id="radio3" label="Option 3" />
			</RadioGroup>
		</section>
	</div>

	<!-- Input & Textarea Section (side by side) -->
	<div class="two-col-section grid desktop:grid-cols-2 gap-3xl grid-main">
		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Input</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Text fields with capsize text, responsive px values.</p>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Basic</h3>
				<div class="flex flex-col gap-xl">
					<Input id="full-name-input" label="Full Name" type="text" placeholder="John Doe" />
					<Input id="email-addr-input" label="Email Address" type="email" placeholder="you@example.com" hint="We'll never share your email." />
				</div>
			</div>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Required</h3>
				<div class="flex flex-col gap-xl">
					<Input id="required-name-input" label="Name" type="text" placeholder="Required field" required />
					<Input id="required-email-input" label="Email" type="email" placeholder="you@example.com" required hint="Required fields are marked with *" />
				</div>
			</div>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">States</h3>
				<div class="flex flex-col gap-xl">
					<Input id="default-input" label="Default" placeholder="Default input" />
					<Input id="disabled-input" label="Disabled" placeholder="Can't edit this" disabled hint="This field is disabled." />
					<Input id="invalid-input" label="Invalid" placeholder="Something's wrong" aria-invalid="true" hint="Please check this field." />
				</div>
			</div>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">File</h3>
				<Input id="upload-doc-input" label="Upload Document" type="file" hint="PNG, JPG up to 10MB" />
			</div>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">With Trailing (Search)</h3>
				<Input id="search-input" type="search" placeholder="Search..." bind:value={searchValue}>
					{#snippet trailing()}
						{#if searchValue}
							<Button size="icon" variant="ghost" onclick={() => searchValue = ''} aria-label="Clear search">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
							</Button>
						{/if}
					{/snippet}
				</Input>
			</div>
		</section>

		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Textarea</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Multi-line text input with auto-sizing.</p>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Basic</h3>
				<div class="flex flex-col gap-xl">
					<Textarea id="bio-textarea" label="Bio" placeholder="Tell us about yourself..." hint="Brief description of yourself." />
					<Textarea id="comments-textarea" label="Comments" placeholder="Leave a comment..." required />
				</div>
			</div>

			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">States</h3>
				<div class="flex flex-col gap-xl">
					<Textarea id="disabled-textarea" label="Disabled" placeholder="Can't edit this" disabled hint="This field is disabled." />
					<Textarea id="invalid-textarea" label="Invalid" placeholder="Something's wrong" aria-invalid="true" />
				</div>
			</div>
		</section>
	</div>

	<!-- Button & Badge Section (side by side) -->
	<div class="two-col-section grid desktop:grid-cols-2 gap-3xl grid-main">
		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Button</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Variants, sizes, and states.</p>

			<!-- Variants -->
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Variants</h3>
				<div class="flex flex-wrap gap-md">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>

			<!-- Sizes -->
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Sizes</h3>
				<div class="flex flex-wrap items-center gap-md">
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
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">States</h3>
				<div class="flex flex-wrap gap-md">
					<Button>Default</Button>
					<Button disabled>Disabled</Button>
				</div>
			</div>

			<!-- As Link -->
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">As Link</h3>
				<div class="flex flex-wrap gap-md">
					<Button variant="link" href="https://svelte.dev" target="_blank">External Link</Button>
					<Button variant="link" href={resolve("/")}>Internal Link</Button>
				</div>
			</div>
		</section>

		<section class="section py-3xl">
			<h2 class="type-h5 mb-sm">Badge</h2>
			<p class="type-p3 mb-2xl text-muted-foreground">Labels, tags, and status indicators.</p>

			<!-- Variants -->
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Variants</h3>
				<div class="flex flex-wrap items-center gap-md">
					<Badge variant="default">Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="ghost">Ghost</Badge>
				</div>
			</div>

			<!-- Sizes -->
			<div class="subsection mb-2xl">
				<h3 class="type-h8 mb-lg">Sizes</h3>
				<div class="flex flex-wrap items-center gap-md">
					<Badge size="sm">Small</Badge>
					<Badge size="default">Default</Badge>
					<Badge size="lg">Large</Badge>
				</div>
			</div>

			</section>
	</div>

	<!-- Card Section -->
	<section class="section py-3xl grid-main">
		<h2 class="type-h5 mb-sm">Card</h2>
		<p class="type-p3 mb-2xl text-muted-foreground">Container for grouping related content.</p>

		<div class="subsection mb-2xl">
			<h3 class="type-h8 mb-lg">Sizes</h3>
			<div class="grid desktop:grid-cols-2 gap-xl items-start">
				<Card>
					<strong class="type-p2">Default Card</strong>
					<p class="type-p3">This card uses the default spacing.</p>
				</Card>
				<Card size="sm">
					<strong class="type-p2">Small Card</strong>
					<p class="type-p3">This card uses smaller spacing ("sm").</p>
				</Card>
			</div>
		</div>
	</section>

	<!-- Colors Section -->
	<section class="section py-3xl grid-main">
		<h2 class="type-h5 mb-sm">Colors</h2>
		<p class="type-p3 mb-2xl text-muted-foreground">Primitive and semantic color tokens from the design system.</p>

		<!-- Primitive Colors -->
		<div class="subsection mb-2xl">
			<h3 class="type-h8 mb-lg">Primitives</h3>
			<div class="grid desktop:grid-cols-2 gap-xl">
				{#each primitiveColors as { group, colors, border } (group)}
					<div class="flex flex-col gap-sm">
						<span class="type-kicker2 text-muted-foreground uppercase">{group}</span>
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
		<div class="subsection mb-2xl">
			<h3 class="type-h8 mb-lg">Semantic</h3>
			<div class="color-group-grid">
				{#each semanticColors as { name, border } (name)}
					{@render colorSwatch(name, border)}
				{/each}
			</div>
		</div>
	</section>

	<!-- Typography Section -->
	<section class="section py-3xl grid-main">
		<h2 class="type-h5 mb-sm">Typography</h2>
		<p class="type-p3 mb-2xl text-muted-foreground">Text styles from the type system. Use with <code>@text</code> directive.</p>

		<div class="flex flex-col gap-3xl">
			{#each typeStyles as item (item.style)}
				{@render typeCard(item)}
			{/each}
		</div>
	</section>

	<div class="nav-row py-3xl border-t border-border grid-main">
		<Button href={resolve("/")} variant="outline">Back to Home</Button>
	</div>
</GridParent>

<style>
	.color-preview {
		position: relative;
		width: 100%;
		@responsive {
			height: 75px;
			border-radius: var(--radius-md);
		}
	}

	.color-values {
		position: absolute;
		bottom: var(--space-xs);
		right: var(--space-xs);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		
		opacity: 0.85;
		@responsive { 
			gap: 2px;
			@text p4; 
		}
	}

	.color-group-grid {
		@responsive {
			display: grid;
			grid-template-columns: repeat(4, 135px);
			gap: var(--space-lg);
		}
		@small { grid-template-columns: repeat(2, 1fr); }
	}

	.type-card-mobile {
		@small { flex-direction: column; gap: var(--space-md); }
	}

	.spec-row {
		@responsive { border-bottom: 1px solid var(--border); }
		@large { min-width: 260px; }
	}

	/* Type styles */
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
	.type-p1 { @responsive { @text p1; } }
	.type-p2 { @responsive { @text p2; } }
	.type-p3 { @responsive { @text p3; } }
	.type-p4 { @responsive { @text p4; } }
	.type-kicker1 { @responsive { @text kicker1; } }
	.type-kicker2 { @responsive { @text kicker2; } }
	.type-link1 { @responsive { @text link1; } }
	.type-link2 { @responsive { @text link2; } }
</style>
