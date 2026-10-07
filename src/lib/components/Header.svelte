<script lang="ts">
	import { resolve } from "$app/paths";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	// import { toggleMode, mode } from "mode-watcher";
	// import { Lightbulb, LightbulbOff } from "@lucide/svelte";

	import { GridMain, GridParent } from "./ui-primitives/Grid";
	import { isSmall } from "$lib/utils/breakpoints.svelte";
	gsap.registerPlugin(ScrollTrigger);

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
	let menuEl: HTMLElement;
	let isHidden = $state(false);
	let menuOpen = $state(false);
	let isAnimating = false;
	let wantsHidden = false; // desired state based on scroll
	let lastScrollY = 0;
	let scrolledDown = 0;
	let scrolledUp = 0;

	const small = isSmall();

	function closeMobileMenu() {
		if (!menuOpen || !menuEl) return;
		menuOpen = false;
		gsap.to(menuEl, {
			gridTemplateRows: "0fr",
			duration: 0.2,
			ease: "power1.in"
		});
	}

	function toggleMobileMenu() {
		if (menuOpen) {
			closeMobileMenu();
		} else {
			menuOpen = true;
			gsap.to(menuEl, {
				gridTemplateRows: "1fr",
				duration: 0.3,
				ease: "power1.out"
			});
		}
	}

	// Reset menu state when switching to desktop
	$effect(() => {
		if (!small.matches && menuOpen) {
			menuOpen = false; // Direct reset since menuEl is null when desktop
		}
	});

	$effect(() => {
		

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
						closeMobileMenu();
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
					<span class="header-text">LEFT-SIDE</span>
				</div>

				<div class="flex items-center justify-center">
					<!-- Logo -->
					<a href={resolve("/")} class="header-h3">TODO</a>
				</div>

				<div class="flex items-center justify-end">
					{#if small.matches}
						<!-- Mobile: Hamburger button -->
						<button
							class="hamburger"
							class:open={menuOpen}
							onclick={toggleMobileMenu}
							aria-label="Toggle menu"
							aria-expanded={menuOpen}
						>
							<span class="hamburger-line"></span>
							<span class="hamburger-line"></span>
							<span class="hamburger-line"></span>
						</button>
					{:else}
						<span class="header-text">RIGHT-SIDE</span>
					{/if}
				</div>
			</nav>
		</GridMain>
	</GridParent>

	<!-- Mobile menu -->
	{#if small.matches}
		<div
			class="mobile-menu"
			class:open={menuOpen}
			bind:this={menuEl}
		>
			<div class="overflow-hidden">
				<nav class="mobile-menu-nav">
					<a href={resolve("/")} class="mobile-anchor" onclick={toggleMobileMenu}>Home</a>
					<a href={resolve("/ui-catalog")} class="mobile-anchor" onclick={toggleMobileMenu}>UI Catalog</a>
				</nav>
			</div>
		</div>
	{/if}
</header>

<style>
	.header-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
	}

	.header-wrapper > :global(:first-child) {
		background-color: rgb(var(--background-rgb) / 0.5);
		-webkit-backdrop-filter: blur(12px);
		backdrop-filter: blur(12px);
		@responsive {
			border-bottom: 1px solid var(--border);
		}
	}

	.header {
		@responsive {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			padding: 16px 0;
		}
	}

	:global(.header-size-container) {
		@responsive {
			padding: 8px 10px;
			border: 2px dashed var(--destructive);
		}
	}
	:global(.header-icon-size) {
		@responsive {
			height: 36px;
			width: 36px;
		}
	}

	.header-h3 {
		@responsive {
			@text h7;
			border: 2px dashed var(--primary);
		}
	}

	/* Hamburger button */
	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		background: none;
		border: none;
		padding: 8px;
		@responsive {
			width: 32px;
			height: 32px;
			gap: 5px;
		}
	}

	.hamburger-line {
		display: block;
		background-color: var(--foreground);
		transition: transform 0.3s ease, opacity 0.3s ease;
		transform-origin: center;
		@responsive {
			width: 100%;
			height: 1.5px;
			border-radius: 1px;
		}
	}

	/* Animate to X - offset = gap + line-height */
	.hamburger.open .hamburger-line:nth-child(1) {
		@responsive { transform: translateY(6.5px) rotate(45deg); }
	}
	.hamburger.open .hamburger-line:nth-child(2) {
		opacity: 0;
	}
	.hamburger.open .hamburger-line:nth-child(3) {
		@responsive { transform: translateY(-6.5px) rotate(-45deg); }
	}

	/* Mobile menu - grid collapse technique */
	.mobile-menu {
		display: grid;
		grid-template-rows: 0fr;
		pointer-events: none;
	}
	.mobile-menu.open {
		pointer-events: auto;
	}

	.mobile-menu-nav {
		display: flex;
		flex-direction: column;
	}
	.mobile-menu-nav a { @responsive { @text link1; } }

	.mobile-anchor {
		background-color: rgb(var(--background-rgb) / 0.5);
		-webkit-backdrop-filter: blur(12px);
		backdrop-filter: blur(12px);
		@responsive {
			padding: 24px;
			@text h10;
		}
	}
	.mobile-anchor:not(:last-child) {
		border-bottom: 1px solid var(--border);
	}

	.header-text { @responsive { @text p3; } }
</style>