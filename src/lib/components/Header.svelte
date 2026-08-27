<script lang="ts">
	import { resolve } from "$app/paths";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { toggleMode, mode } from "mode-watcher";

	import GridMain from "./ui-primitives/GridMain.svelte";
	import GridParent from "./ui-primitives/GridParent.svelte";
	import Button from "./ui-primitives/Button.svelte";
	import { Lightbulb, LightbulbOff } from "@lucide/svelte";

	// Scroll behavior config
	const HIDE_THRESHOLD = 50; // px to scroll down before hiding
	const SHOW_THRESHOLD = 30; // px to scroll up before showing
	const SHOW_AT_TOP = 100; // always show header when within this many px of top

	// Animation config (customize eases independently)
	const HIDE_DURATION = 0.3;
	const HIDE_EASE = "power2.in";
	const SHOW_DURATION = 0.3;
	const SHOW_EASE = "power1.out";

	let headerEl: HTMLElement;
	let isHidden = $state(false);
	let isAnimating = false;
	let wantsHidden = false; // desired state based on scroll
	let lastScrollY = 0;
	let scrolledDown = 0;
	let scrolledUp = 0;

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const trigger = ScrollTrigger.create({
			onUpdate: (self) => {
				const currentScrollY = self.scroll();
				const delta = currentScrollY - lastScrollY;

				// Always show near top
				if (currentScrollY < SHOW_AT_TOP) {
					requestState(false);
					scrolledDown = 0;
					lastScrollY = currentScrollY;
					return;
				}

				if (delta > 0) {
					// Scrolling down
					scrolledDown += delta;
					scrolledUp = 0;
					if (scrolledDown > HIDE_THRESHOLD) {
						requestState(true);
					}
				} else if (delta < 0) {
					// Scrolling up
					scrolledUp += Math.abs(delta);
					scrolledDown = 0;
					if (scrolledUp > SHOW_THRESHOLD) {
						requestState(false);
					}
				}

				lastScrollY = currentScrollY;
			}
		});

		return () => {
			trigger.kill();
		};
	});

	function requestState(hidden: boolean) {
		wantsHidden = hidden;
		if (!isAnimating && isHidden !== wantsHidden) {
			runAnimation();
		}
	}

	function runAnimation() {
		if (isHidden === wantsHidden) return;

		isAnimating = true;

		if (wantsHidden) {
			// Hide animation
			gsap.to(headerEl, {
				y: "-100%",
				duration: HIDE_DURATION,
				ease: HIDE_EASE,
				onComplete: onAnimationComplete
			});
			isHidden = true;
		} else {
			// Show animation
			gsap.to(headerEl, {
				y: 0,
				duration: SHOW_DURATION,
				ease: SHOW_EASE,
				onComplete: onAnimationComplete
			});
			isHidden = false;
		}
	}

	function onAnimationComplete() {
		isAnimating = false;
		// Check if user changed direction during animation
		if (isHidden !== wantsHidden) {
			runAnimation();
		}
	}
</script>

<header class="header-wrapper" bind:this={headerEl}>
	<GridParent>
		<GridMain>
			<nav class="header">
				<div class="flex items-center">
					<!-- Buttons 1 -->
					<Button onclick={toggleMode} size="icon">
						{#if (mode.current === "light")}
							<Lightbulb class="header-icon-size" />
						{:else}
							<LightbulbOff class="header-icon-size" />
						{/if}
					</Button>
				</div>

				<div class="flex items-center justify-center">
					<!-- Logo -->
					<a href={resolve("/")} class="header-h3">TODO</a>
				</div>

				<div class="flex items-center justify-end">
					<!-- Buttons 2 -->
					RIGHT-SIDE
				</div>
			</nav>
		</GridMain>
	</GridParent>
</header>

<style>
	.header-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background-color: color-mix(in srgb, var(--background) 50%, transparent);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.header {
		@responsive {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			padding: 16px 0;
		}
	}

	:global(.header-icon-size) {
		@responsive {
			height: 24px;
			width: 24px;
		}
	}

	.header-h3 { 
		@responsive { 
			@text h3Desktop; 
			border: 2px dashed var(--primary);
			padding: 6px 10px;
		} 
	}
</style>