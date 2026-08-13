<script lang="ts">
	import { responsiveStyled } from '$lib/utils/responsive';
</script>

<div class="grid-content">
	<!-- Full bleed hero -->
	<div
		class="grid-fullbleed bg-primary text-primary-foreground"
		style={responsiveStyled(`padding: 80px 0;`)}
	>
		<div class="grid-content">
			<div class="grid-main">
				<h1 style={responsiveStyled(`font-size: 64px; font-weight: 700; line-height: 1.1;`)}>
					Grid System Demo
				</h1>
				<p style={responsiveStyled(`font-size: 20px; margin-top: 16px; opacity: 0.8;`)}>
					Full-bleed hero section. Content respects gutters.
				</p>
			</div>
		</div>
	</div>

	<!-- Content section -->
	<div class="grid-main border border-dashed border-pink-300" style={responsiveStyled(`padding: 40px 0;`)}>
		<h2 style={responsiveStyled(`font-size: 32px; font-weight: 600; margin-bottom: 24px;`)}>
			Content Section
		</h2>
		<p style={responsiveStyled(`font-size: 18px; line-height: 1.6; max-width: 600px;`)}>
			This section uses .grid-main so it respects the gutters.
			8 columns on desktop, 4 on mobile. Resize to see it change.
		</p>
	</div>

	<!-- Grid items demo -->
	<div
		class="grid-main"
		style="display: grid; grid-template-columns: repeat(var(--grid-columns), 1fr); gap: var(--grid-gap);"
	>
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array(8) as _, i (i)}
			<div
				class="bg-secondary text-secondary-foreground rounded-lg"
				style={responsiveStyled(`padding: 24px;`)}
			>
				<p style={responsiveStyled(`font-size: 14px;`)}>Col {i + 1}</p>
			</div>
		{/each}
	</div>

	<!-- Another full bleed -->
	<div
		class="grid-fullbleed bg-accent"
		style={responsiveStyled(`padding: 60px 0; margin-top: 40px;`)}
	>
		<div class="grid-content">
			<div class="grid-main">
				<p class="text-accent-foreground" style={responsiveStyled(`font-size: 18px;`)}>
					Another full-bleed section. Great for backgrounds, images, etc.
				</p>
			</div>
		</div>
	</div>

	<!-- Footer info -->
	<div class="grid-main text-muted-foreground" style={responsiveStyled(`padding: 40px 0; font-size: 14px;`)}>
		<p>Grid: var(--grid-columns) columns, var(--grid-gap) gap, var(--grid-gutter) gutter</p>
		<p>Desktop: 8 cols, 24px gap, 64px gutter</p>
		<p>Mobile: 4 cols, 16px gap, 20px gutter</p>
	</div>
</div>
