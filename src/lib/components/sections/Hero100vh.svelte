<!--
	Hero100vh - Fixed content that page scrolls over

	Structure:
	- Hero background: 100vh spacer with bg color
	- Hero content: Fixed in center of viewport (via portal-like pattern)
	- Page content after this component clips over the fixed content
-->
<script lang="ts">
	import ScrolldownArrowSvg from "../svgs/ScrolldownArrowSvg.svelte";
	import { GridParent } from "../ui-primitives/Grid";

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

<!-- 100vh of colored space -->
<div class="hero-background"></div>

<style>
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

	.hero-background {
		height: 100vh;
		background-color: var(--primary);
		@responsive { min-height: 400px; }
	}

	.hero-100vh-title {
		color: var(--primary-foreground);
		white-space: nowrap;
		@responsive { @text h1; }
		@small { @text h5; }
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