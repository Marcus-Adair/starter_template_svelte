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
  </script>

  <script lang="ts">
    let {
      class: className,
      variant = "primary",
      size = "default",
      href = undefined,
      type = "button",
      disabled,
      children,
      ...restProps
    }: ButtonProps = $props();
  </script>
  {#if href}
    <a
      class={cn(buttonVariants({ variant, size }), className)}
      href={disabled ? undefined : href}
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
    Button base
    ========================================================= */
    :where(.base-button) {
        @responsive {
            border-radius: var(--radius-md);
            border: 1px solid transparent;

            /* bg-clip-padding */
            background-clip: padding-box;

            /* text-sm */
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;

            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            white-space: nowrap;

            transition: background-color 0.15s ease;
            outline: none;
            user-select: none;
            cursor: pointer;
        }
    }

    :where(.base-button:focus-visible) {
        @responsive {
            border-color: var(--ring);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
        }
    }

    :where(.base-button[aria-invalid]) {
        @responsive {
            border-color: var(--destructive);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }

    :where(.dark .base-button[aria-invalid]) {
        @responsive {
            border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }

    :where(.base-button:disabled) {
        @responsive {
            pointer-events: none;
            opacity: 0.5;
        }
    }

    :where(.base-button svg) {
        @responsive {
            pointer-events: none;
            flex-shrink: 0;
        }
    }

    /* =========================================================
    Variants
    ========================================================= */

    :where(.base-button--primary) {
        @responsive {
            background-color: var(--primary);
            color: var(--primary-foreground);
        }
    }
    :where(.base-button--primary:hover) {
        @responsive {
            background-color: color-mix(in srgb, var(--primary) 80%, transparent);
        }
    }
    :where(.base-button--primary:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--primary) 90%, transparent);
        }
    }

    :where(.base-button--outline) {
        @responsive {
            border-color: var(--border);
            background-color: var(--background);
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
    }
    :where(.base-button--outline:hover),
    :where(.base-button--outline[aria-expanded="true"]) {
        @responsive {
            background-color: var(--muted);
            color: var(--foreground);
        }
    }
    :where(.base-button--outline:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--muted) 40%, transparent);
        }
    }
    :where(.dark .base-button--outline) {
        @responsive {
            border-color: var(--input);
            background-color: color-mix(in srgb, var(--input) 30%, transparent);
        }
    }
    :where(.dark .base-button--outline:hover) {
        @responsive {
            background-color: color-mix(in srgb, var(--input) 50%, transparent);
        }
    }
    :where(.dark .base-button--outline:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--input) 60%, transparent);
        }
    }
    :where(.base-button--secondary) {
        @responsive {
            background-color: var(--secondary);
            color: var(--secondary-foreground);
        }
    }
    :where(.base-button--secondary:hover),
    :where(.base-button--secondary[aria-expanded="true"]) {
        @responsive {
            background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
            color: var(--secondary-foreground);
        }
    }
    :where(.base-button--secondary:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--secondary) 90%, transparent);
        }
    }

    :where(.base-button--ghost:hover),
    :where(.base-button--ghost[aria-expanded="true"]) {
        @responsive {
            background-color: var(--muted);
            color: var(--foreground);
        }
    }
    :where(.dark .base-button--ghost:hover) {
        @responsive {
            background-color: color-mix(in srgb, var(--muted) 50%, transparent);
        }
    }
    :where(.base-button--ghost:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--muted) 60%, transparent);
        }
    }

    :where(.base-button--destructive) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
            color: var(--destructive);
        }
    }
    :where(.base-button--destructive:hover) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }
    :where(.base-button--destructive:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 30%, transparent);
        }
    }
    :where(.base-button--destructive:focus-visible) {
        @responsive {
            border-color: color-mix(in srgb, var(--destructive) 40%, transparent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }
    :where(.dark .base-button--destructive) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
        }
    }
    :where(.dark .base-button--destructive:hover) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 30%, transparent);
        }
    }
    :where(.dark .base-button--destructive:active) {
        @responsive {
            background-color: color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }
    :where(.dark .base-button--destructive:focus-visible) {
        @responsive {
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
        }
    }

    :where(.base-button--link) {
        @responsive {
            color: var(--primary);
            text-underline-offset: 4px;
        }
    }
    :where(.base-button--link:hover) {
        @responsive {
            text-decoration: underline;
        }
    }

    /* =========================================================
    Sizes
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
            font-size: 12px;
            line-height: 16px;
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
            width: 36px;
            height: 36px;
        }
    }
  </style>