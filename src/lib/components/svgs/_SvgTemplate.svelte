<!--
	SVG Template - Copy this file and replace the paths.

	Usage:
		<MySvg />                        - default 24x24
		<MySvg width={32} height={32} /> - fixed size via props
		<MySvg fillContainer />          - fills parent container (use @responsive on parent)
		<MySvg class="custom" />         - custom classes
-->
<script lang="ts">
	import { cn } from "$lib/utils/misc";

	let {
		class: className,
		width = 24,
		height = 24,
		fillContainer = false,
	}: {
		class?: string;
		width?: number;
		height?: number;
		fillContainer?: boolean;
	} = $props();
</script>

<svg
	class={cn("svg-icon", fillContainer && "svg-icon--fill", className)}
	width={fillContainer ? undefined : width}
	height={fillContainer ? undefined : height}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- TODO: Replace with your paths -->
	<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
	<path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>

<style>
	.svg-icon {
		flex-shrink: 0;
	}

	.svg-icon--fill {
		width: 100%;
		height: 100%;
	}
</style>
