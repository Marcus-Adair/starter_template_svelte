<!-- An example of a simple re-usable section -->
<script lang="ts">
	import GridFullBleed from "../ui-primitives/GridFullBleed.svelte";
	import GridParent from "../ui-primitives/GridParent.svelte";
	import Separator from "../ui-primitives/Separator.svelte";

    let {
		heroTitle,
		heroSubTitle,
	}: {
		heroTitle: string;
		heroSubTitle: string
	} = $props()
</script>

<GridFullBleed 
    class={[
        "hero-100vh flex items-center justify-center",
        "bg-primary text-primary-foreground"
    ]}
>
    <GridParent>
        <div class="grid-main flex flex-col">
            <h1 class="hero-100vh-title">{heroTitle}</h1>

			<!-- class="bg-primary-foreground" -->
			<Separator />

			<div class="flex justify-end">
            	<p class="hero-100vh-subtitle font-medium italic">
					{heroSubTitle}
				</p>
			</div>
        </div>
    </GridParent>
</GridFullBleed>


<style>
	/* Hero (GridFullBleed component - requires :global for class prop) */
	:global(.hero-100vh) {
		@responsive {
			height: 100vh;
			min-height: 400px;
		}
	}
	.hero-100vh-title {
		@responsive {
			font-family: Aktura;
			font-size: 200px;
			line-height: 1px;
			margin-bottom: 10px;
		}
		@small {
			font-size: 54px;
		}
	}

	.hero-100vh-subtitle {
		@responsive {
			font-size: 32px;
			line-height: 48px;
			margin-top: 16px;
			text-align: right;
			max-width: 900px;
		}
		@small {
			font-size: 20px;
			line-height: 28px;
		}
	}
</style>