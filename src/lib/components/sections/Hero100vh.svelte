<!--
	Hero100vh - Fixed content that page scrolls over

	Structure:
	- Hero background: 100vh spacer with bg color
	- Hero content: Fixed in center of viewport (via portal-like pattern)
	- Page content after this component clips over the fixed content
-->
<script lang="ts">
	import ScrolldownArrowSvg from "../svgs/ScrolldownArrowSvg.svelte";
	import GridParent from "../ui-primitives/GridParent.svelte";

	let {
		heroTitle,
		heroSubTitle,
	}: {
		heroTitle: string;
		heroSubTitle: string
	} = $props()


</script>

<!-- Fixed hero content - stays in center while page scrolls over -->
<div class="hero-fixed-content">
	<GridParent class="">
		<div class="grid-main flex flex-col dashed-inner relative">
			<h1 class="hero-100vh-title">{heroTitle}</h1>

			<div class="flex justify-end">
				<p class="hero-100vh-subtitle font-medium italic">
					{heroSubTitle}
				</p>
			</div>

			<div class="arrow-svg-container grid-fullbleed absolute">
				<ScrolldownArrowSvg/>
			</div>
		</div>
	</GridParent>
</div>

<!-- Hero background spacer - creates the 100vh of colored space -->
<div class="hero-background"></div>

<style>
	/* Fixed content - centered in viewport */
	.hero-fixed-content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
		pointer-events: none;
		@responsive {
			min-height: 760px;
		}@small {
			min-height: 360px;
		}
	}

	/* Allow interactions with content inside */
	.hero-fixed-content :global(*) {
		pointer-events: auto;
	}

	/* Background spacer - this is what gets scrolled past */
	.hero-background {
		@responsive {
			height: 100vh;
			min-height: 400px;
		}
		background-color: var(--primary);
	}

	.hero-100vh-title {
		color: var(--primary-foreground);
		@responsive {
			@text h1Desktop;
		}
		@small {
			@text h1Mobile;
		}
	}

	.hero-100vh-subtitle {
		color: var(--primary-foreground);
		@responsive {
			font-size: 32px;
			line-height: 48px;
			margin-top: 16px;
			text-align: right;
			max-width: 960px;
			margin-top: 42px;
		}
		@small {
			font-size: 20px;
			line-height: 28px;
			max-width: 320px;
		}
	}
	.arrow-svg-container {
		@responsive {
			height: auto;
			width: 48px;
			border: 2px dashed var(--destructive);
			bottom: -18px;
			left: -12px;
		}
		@small {
			width: 20px;
			border: 1px dashed var(--destructive);
			left: -6px;
		}
	}
	.dashed-inner {
		@responsive {
			border: 3px dashed var(--border);
			padding-bottom: 208px;
		}
		@small {
			border: 2px dashed var(--border);
			padding-bottom: 0;
		}
	}
</style>