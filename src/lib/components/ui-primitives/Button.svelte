<!-- 
    Responsive-styled Button component with different variants and sizes
    Comes with CSS for accessibility, dark theme, and SVG handling.

    Inspired by shadcn-svelte.
-->
<script lang="ts" module>
    import { cn } from "$lib/utils/misc";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

    export type ButtonProps = HTMLButtonAttributes & HTMLAnchorAttributes & {
        variant?:  "primary" | "outline" | "secondary" | "ghost" | "destructive" | "link";
        size?: "default" | "xs" | "sm" | "lg" | "icon";
      };

      function buttonVariants({
        variant = "primary",
        size = "default",
        }: Pick<ButtonProps, "variant" | "size">) {
            return cn(
                "base-button",
                `base-button--${variant}`,
                `base-button--size-${size}`,
            );
        }

    /** Check if href is external (different origin or starts with http/https) */
    function isExternalHref(href: string | undefined): boolean {
        if (!href) return false;
        if (href.startsWith("http://") || href.startsWith("https://")) {
            try {
                const url = new URL(href);
                return typeof window !== "undefined" && url.origin !== window.location.origin;
            } catch {
                return false;
            }
        }
        return false;
    }
  </script>

  <script lang="ts">
    let {
      class: className,
      variant = "primary",
      size = "default",
      href = undefined,
      target,
      rel,
      type = "button",
      disabled,
      children,
      ...restProps
    }: ButtonProps = $props();

    // Auto-detect external links and set target/rel if not explicitly provided
    const isExternal = $derived(isExternalHref(href ?? undefined));
    const resolvedTarget = $derived(target ?? (isExternal ? "_blank" : undefined));
    const resolvedRel = $derived(rel ?? (isExternal ? "noopener noreferrer" : undefined));
  </script>
  {#if href}
    <a
      class={cn(buttonVariants({ variant, size }), className)}
      href={disabled ? undefined : href}
      target={resolvedTarget}
      rel={resolvedRel}
      aria-disabled={disabled}
      role={disabled ? "link" : undefined}
      tabindex={disabled ? -1 : undefined}
      {...restProps}
    >
      {@render children?.()}
    </a>
  {:else}
    <button
      class={cn(buttonVariants({ variant, size }), className)}
      {type}
      {disabled}
      {...restProps}
    >
      {@render children?.()}
    </button>
  {/if}

  <!-- :where() zeroes specificity so consumer classes can override without chaining -->
  <style>
    /* =========================================================
       Button base - sizing (needs @responsive)
       ========================================================= */
    :where(.base-button) {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        background-clip: padding-box;
        transition: background-color 0.15s ease;
        outline: none;
        user-select: none;
        cursor: pointer;
        @responsive {
            border-radius: var(--radius-md);
            border: 1px solid transparent;
            @text label;
        }
    }

    :where(.base-button:focus-visible) {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
    }

    :where(.base-button[aria-invalid]) {
        border-color: var(--destructive);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.dark .base-button[aria-invalid]) {
        border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    :where(.base-button:disabled) {
        pointer-events: none;
        opacity: 0.5;
    }

    :where(.base-button svg) {
        pointer-events: none;
        flex-shrink: 0;
    }

    /* =========================================================
       Variants - colors only (no @responsive needed)
       ========================================================= */

    :where(.base-button--primary) {
        background-color: var(--primary);
        color: var(--primary-foreground);
    }
    :where(.base-button--primary:hover) {
        background-color: color-mix(in srgb, var(--primary) 80%, transparent);
    }
    :where(.base-button--primary:active) {
        background-color: color-mix(in srgb, var(--primary) 90%, transparent);
    }

    :where(.base-button--outline) {
        border-color: var(--border);
        background-color: var(--background);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    :where(.base-button--outline:hover),
    :where(.base-button--outline[aria-expanded="true"]) {
        background-color: var(--muted);
        color: var(--foreground);
    }
    :where(.base-button--outline:active) {
        background-color: color-mix(in srgb, var(--muted) 40%, transparent);
    }
    :where(.dark .base-button--outline) {
        border-color: var(--input);
        background-color: color-mix(in srgb, var(--input) 30%, transparent);
    }
    :where(.dark .base-button--outline:hover) {
        background-color: color-mix(in srgb, var(--input) 50%, transparent);
    }
    :where(.dark .base-button--outline:active) {
        background-color: color-mix(in srgb, var(--input) 60%, transparent);
    }

    :where(.base-button--secondary) {
        background-color: var(--secondary);
        color: var(--secondary-foreground);
    }
    :where(.base-button--secondary:hover),
    :where(.base-button--secondary[aria-expanded="true"]) {
        background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
        color: var(--secondary-foreground);
    }
    :where(.base-button--secondary:active) {
        background-color: color-mix(in srgb, var(--secondary) 90%, transparent);
    }

    :where(.base-button--ghost:hover),
    :where(.base-button--ghost[aria-expanded="true"]) {
        background-color: var(--muted);
        color: var(--foreground);
    }
    :where(.dark .base-button--ghost:hover) {
        background-color: color-mix(in srgb, var(--muted) 50%, transparent);
    }
    :where(.base-button--ghost:active) {
        background-color: color-mix(in srgb, var(--muted) 60%, transparent);
    }

    :where(.base-button--destructive) {
        background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
        color: var(--destructive);
    }
    :where(.base-button--destructive:hover) {
        background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.base-button--destructive:active) {
        background-color: color-mix(in srgb, var(--destructive) 30%, transparent);
    }
    :where(.base-button--destructive:focus-visible) {
        border-color: color-mix(in srgb, var(--destructive) 40%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.dark .base-button--destructive) {
        background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
    }
    :where(.dark .base-button--destructive:hover) {
        background-color: color-mix(in srgb, var(--destructive) 30%, transparent);
    }
    :where(.dark .base-button--destructive:active) {
        background-color: color-mix(in srgb, var(--destructive) 40%, transparent);
    }
    :where(.dark .base-button--destructive:focus-visible) {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
    }

    :where(.base-button--link) {
        color: var(--primary);
        text-underline-offset: 4px;
    }
    :where(.base-button--link:hover) {
        text-decoration: underline;
    }

    /* =========================================================
       Sizes - pixel values (needs @responsive)
       ========================================================= */

    /* default (h-9 gap-1.5 px-2.5) */
    :where(.base-button--size-default) {
        @responsive {
            height: 36px;
            gap: 6px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    /* xs (h-6 gap-1 px-2 text-xs) */
    :where(.base-button--size-xs) {
        @responsive {
            border-radius: min(var(--radius-md), 8px);
            @text caption;
            font-weight: 500;
            height: 24px;
            gap: 4px;
            padding-left: 8px;
            padding-right: 8px;
        }
    }

    /* sm (h-8 gap-1 px-2.5) */
    :where(.base-button--size-sm) {
        @responsive {
            border-radius: min(var(--radius-md), 10px);
            height: 32px;
            gap: 4px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    /* lg (h-10 gap-1.5 px-2.5) */
    :where(.base-button--size-lg) {
        @responsive {
            height: 40px;
            gap: 6px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    /* icon (size-9) */
    :where(.base-button--size-icon) {
        @responsive {
            border-radius: min(var(--radius-md), 10px);
            width: 36px;
            height: 36px;
        }
    }

    /* Reset size styles to be inline like a span for "link" variant (after sizes so it wins) */
    :where(.base-button--link) {
        @responsive {
            height: auto;
            padding: 0;
            gap: 0;
        }
    }
  </style>