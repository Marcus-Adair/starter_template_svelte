<script lang="ts">
	import { capsize, fontMetrics } from '$lib/utils/capsize';
	import { responsiveStyled } from '$lib/utils/responsive';

	// Generate capsize styles for different text sizes
	const headingStyles = capsize(48, 56, fontMetrics);
	const bodyStyles = capsize(18, 28, fontMetrics);
	const smallStyles = capsize(14, 20, fontMetrics);

	console.log('Capsize output:', headingStyles);
</script>

<div class="grid-content">
	<div class="grid-main" style={responsiveStyled(`padding: 60px 0;`)}>
		<!-- Header -->
		<h1 class="grid-main" style={responsiveStyled(`font-size: 48px; font-weight: 700; margin-bottom: 40px;`)}>
			Capsize Demo
		</h1>

		<!-- Comparison section -->
		<div class="grid-main" style={responsiveStyled(`margin-bottom: 60px;`)}>
			<h2 style={responsiveStyled(`font-size: 24px; font-weight: 600; margin-bottom: 24px;`)}>
				With vs Without Capsize
			</h2>

			<div style="display: flex; gap: 40px; flex-wrap: wrap;">
				<!-- Without Capsize -->
				<div style="flex: 1; min-width: 280px;">
					<p style={responsiveStyled(`font-size: 14px; margin-bottom: 12px;`)} class="text-muted-foreground">
						Without Capsize (extra whitespace above/below)
					</p>
					<div class="bg-secondary" style="display: inline-block;">
						<p
							class="bg-accent"
							style={responsiveStyled(`font-size: 48px; line-height: 56px;`)}
						>
							Hello World
						</p>
					</div>
				</div>

				<!-- With Capsize -->
				<div style="flex: 1; min-width: 280px;">
					<p style={responsiveStyled(`font-size: 14px; margin-bottom: 12px;`)} class="text-muted-foreground">
						With Capsize (trimmed to actual text bounds)
					</p>
					<div class="bg-secondary" style="display: inline-block;">
						<p class="capsize-heading bg-accent">
							Hello World
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Visual guide -->
		<div class="grid-main" style={responsiveStyled(`margin-bottom: 60px;`)}>
			<h2 style={responsiveStyled(`font-size: 24px; font-weight: 600; margin-bottom: 24px;`)}>
				Why Capsize?
			</h2>
			<p style={responsiveStyled(`font-size: 18px; line-height: 1.6; max-width: 600px;`)}>
				Fonts have built-in metrics (ascender, descender, line-gap) that add extra space.
				This makes aligning text to a grid or other elements tricky.
				Capsize trims this space so text boxes match their visual bounds.
			</p>
		</div>

		<!-- Stacked example -->
		<div class="grid-main" style={responsiveStyled(`margin-bottom: 60px;`)}>
			<h2 style={responsiveStyled(`font-size: 24px; font-weight: 600; margin-bottom: 24px;`)}>
				Stacking Elements
			</h2>

			<div style="display: flex; gap: 60px; flex-wrap: wrap;">
				<!-- Without -->
				<div>
					<p style={responsiveStyled(`font-size: 14px; margin-bottom: 12px;`)} class="text-muted-foreground">
						Without (uneven gaps)
					</p>
					<div class="bg-secondary" style={responsiveStyled(`padding: 20px;`)}>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px; margin-bottom: 8px;`)}>
							<p style={responsiveStyled(`font-size: 18px; line-height: 28px;`)}>Item One</p>
						</div>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px; margin-bottom: 8px;`)}>
							<p style={responsiveStyled(`font-size: 18px; line-height: 28px;`)}>Item Two</p>
						</div>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px;`)}>
							<p style={responsiveStyled(`font-size: 18px; line-height: 28px;`)}>Item Three</p>
						</div>
					</div>
				</div>

				<!-- With -->
				<div>
					<p style={responsiveStyled(`font-size: 14px; margin-bottom: 12px;`)} class="text-muted-foreground">
						With Capsize (consistent gaps)
					</p>
					<div class="bg-secondary" style={responsiveStyled(`padding: 20px;`)}>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px; margin-bottom: 8px;`)}>
							<p class="capsize-body">Item One</p>
						</div>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px; margin-bottom: 8px;`)}>
							<p class="capsize-body">Item Two</p>
						</div>
						<div class="bg-primary text-primary-foreground" style={responsiveStyled(`padding: 8px;`)}>
							<p class="capsize-body">Item Three</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Code example -->
		<div class="grid-main">
			<h2 style={responsiveStyled(`font-size: 24px; font-weight: 600; margin-bottom: 24px;`)}>
				Usage
			</h2>
			<pre
				class="bg-secondary text-secondary-foreground rounded-lg"
				style={responsiveStyled(`padding: 24px; font-size: 14px; overflow-x: auto;`)}
			>
{`import { capsize, systemFontMetrics } from '$lib/utils/capsize';

// Generate styles
const styles = capsize(48, 56, systemFontMetrics);

// Use in <style> block with ::before/::after
// for full trim effect`}
			</pre>
		</div>
	</div>
</div>

<style>
	/* Capsize-trimmed heading: 48px / 56px line-height (Satoshi) */
	/* Values from: capsize(48, 56, fontMetrics) */
	.capsize-heading {
		font-size: 48px;
		line-height: 56px;
	}
	.capsize-heading::before {
		content: '';
		display: table;
		margin-bottom: -0.2283em;
	}
	.capsize-heading::after {
		content: '';
		display: table;
		margin-top: -0.1983em;
	}

	/* Capsize-trimmed body: 18px / 28px line-height (Satoshi) */
	/* Run: console.log(capsize(18, 28, fontMetrics)) to get values */
	.capsize-body {
		font-size: 18px;
		line-height: 28px;
	}
	.capsize-body::before {
		content: '';
		display: table;
		margin-bottom: -0.4061em;
	}
	.capsize-body::after {
		content: '';
		display: table;
		margin-top: -0.3761em;
	}
</style>
