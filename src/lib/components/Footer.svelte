<script>
	import { resolve } from "$app/paths";
	import Button from "./ui-primitives/Button.svelte";
	import GridFullBleed from "./ui-primitives/GridFullBleed.svelte";
	import GridMain from "./ui-primitives/GridMain.svelte";
	import GridParent from "./ui-primitives/GridParent.svelte";
</script>

<footer>
    <GridParent>
        <GridFullBleed class="footer-bg">
            <GridParent>
                <GridMain class="footer-content">
                    <!-- Top (Main columns)-->
                    <div class="footer-columns">
                        <!-- Brand -->
                        <div class="footer-col footer-col--brand">
                            <span class="footer-logo">LOGO</span>
                            <p class="footer-tagline">This is an open-source starter template for implementing pixel-perfect designs & creative dev websites - Implemented with TypeScript, HTML/CSS, SvelteKit, GSAP, and more.</p>
                        </div>

                        <!-- Col 1 -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Pages</h4>
                            <div class="footer-links">
                                <Button href={resolve("/")} variant="link" class="footer-link">Home</Button>
                                <Button href={resolve("/about")} variant="link" class="footer-link">About</Button>
                                <Button href={resolve("/ui-catalog")} variant="link" class="footer-link">UI Catalog</Button>
                            </div>
                        </div>

                        <!-- Col 2 -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Company</h4>
                            <div class="footer-links">
                                <Button href="#" variant="link" class="footer-link">About</Button>
                                <Button href="#" variant="link" class="footer-link">Blog</Button>
                                <Button href="#" variant="link" class="footer-link">Careers</Button>
                                <Button href="#" variant="link" class="footer-link">Contact</Button>
                            </div>
                        </div>

                        <!-- Col 3 -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Legal</h4>
                            <div class="footer-links">
                                <Button href="#" variant="link" class="footer-link">Privacy</Button>
                                <Button href="#" variant="link" class="footer-link">Terms</Button>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom row -->
                    <div class="footer-bottom">
                        <span>© 2026 Acme Corp. All rights reserved.</span>
                        <div class="footer-social">
                            <Button href="https://www.instagram.com/marcusadairdigital/" variant="link" class="footer-link">Instagram</Button>
                            <Button href="https://github.com/Marcus-Adair/" variant="link" class="footer-link">GitHub</Button>
                            <Button href="https://www.linkedin.com/in/marcus-adair/" variant="link" class="footer-link">LinkedIn</Button>
                        </div>
                    </div>
                </GridMain>
            </GridParent>
        </GridFullBleed>
    </GridParent>
</footer>

<style>
    /* Base styles */
    :global(.footer-bg) {
        @responsive {
            background-color: var(--muted);
        }
    }

    :global(.footer-content) {
        @responsive {
            @text p3;
            display: flex;
            flex-direction: column;
            gap: 48px;
            padding: 64px 0 32px;
        }
    }

    /* Layout */
    .footer-columns {
        @responsive {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 48px;
        }
        @small {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }
    }

    .footer-col {
        @responsive {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
    }

    .footer-col--brand {
        @responsive {
            gap: 12px;
        }
        @small {
            grid-column: span 2;
        }
    }

    .footer-bottom {
        @responsive {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 24px;
            padding-top: 32px;
            border-top: 1px solid var(--border);
        }
        @small {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
        }
    }

    .footer-social {
        @responsive {
            display: flex;
            gap: 16px;
        }
    }

    /* Typography */
    .footer-logo {
        @responsive {
            @text h4;
        }
    }

    .footer-heading {
        @responsive {
            @text label;
        }
    }

    .footer-tagline {
        color: var(--muted-foreground);
    }

    /* Links */
    .footer-links {
        @responsive {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
    }

    :global(.footer-link) {
        @responsive {
            color: var(--muted-foreground);
        }
    }

    :global(.footer-link:hover) {
        @responsive {
            color: var(--foreground);
        }
    }
</style>
