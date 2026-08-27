<script lang="ts">
	import { cn } from "$lib/utils/misc";
	import { useAnimation } from "$lib/utils/useAnimation.svelte";
	import gsap from "gsap";

	let { class: className }: { class?: string } = $props();

	let paths: SVGPathElement[] = [];

	useAnimation(() => {
		if (paths.length === 0) return;

		// Sequential timeline - each path pulses one after another
		const tl = gsap.timeline({ repeat: -1 });

		// Start from top (index 4) and work down to arrowhead (index 0)
		for (let i = paths.length - 1; i >= 0; i--) {
			tl.to(paths[i], { opacity: 0, duration: 0.1, delay: 0.6 })
			  .to(paths[i], { opacity: 1, duration: 0.1 , delay: 0.8 }, "+=0.5"); // hidden duration
		}

		// Pause before repeating
		tl.to({}, { duration: 0.5 });
	}, { delay: true });
</script>

<svg
	class={cn("scrolldown-arrow-svg", className)}
	viewBox="0 0 28 163"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
    <path bind:this={paths[0]} d="M20.3567 162.348L27.9041 134.485L4.15681e-06 141.88L20.3567 162.348ZM9.35666 120.843L6.94009 121.484L12.176 141.24L14.5925 140.599L17.0091 139.959L11.7732 120.203L9.35666 120.843Z" fill="currentColor"/>
    <path bind:this={paths[1]} d="M20.3568 83.8433L9.35666 113.843M20.3568 83.8432L9.3567 113.843" stroke="currentColor" stroke-width="5" stroke-linecap="square"/>
    <path bind:this={paths[2]} d="M12.3567 51.8432L23.3567 75.8432M12.3567 51.8432L23.3566 75.8431" stroke="currentColor" stroke-width="5" stroke-linecap="square"/>
    <path bind:this={paths[3]} d="M20.3568 29.8432L12.3567 43.8432M20.3568 29.8432L12.3567 43.8431" stroke="currentColor" stroke-width="5" stroke-linecap="square"/>
    <path bind:this={paths[4]} d="M20.3567 2.84324L23.3567 22.8432M20.3567 2.84319L23.3566 22.8431" stroke="currentColor" stroke-width="5" stroke-linecap="square"/>
</svg>

<style>
	.scrolldown-arrow-svg {
		width: 100%;
		height: 100%;
	}
</style>
