<script lang="ts">
	import { resolve } from "$app/paths";

	import GridMain from "./ui-primitives/GridMain.svelte";
    import GridParent from "./ui-primitives/GridParent.svelte";

    let lastScrollY = $state(0);

    function handleScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                console.log("User scrolled UP");
                // Your scroll-up logic
            }

            lastScrollY = currentScrollY;
        }

        $effect(() => {
            lastScrollY = window.scrollY;

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        });
</script>

<GridParent class="top-0 z-500">
    <GridMain>
        <nav class="header">
            <div class="flex items-center">
                <!-- Buttons 1 -->
                LEFT-SIDE
            </div>

            <div class="flex items-center justify-center">
                <!-- Logo -->
                <a href={resolve("/")} class="type-h3Desktop">LOGO</a>
            </div>

            <div class="flex items-center justify-end">
                <!-- Buttons 2 -->
                LEFT-SIDE
            </div>
        </nav>
    </GridMain>
</GridParent>

<style>
    .header {
        @responsive {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 16px 0;
        }
    }

	.type-h3Desktop { @responsive { @text h3Desktop; } }
</style>