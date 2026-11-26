import "./badge.css";

/**
 * Badge, a port of opencode's Badge (`@opencode/ui/badge`): a small inline
 * label. ui-sdk has no badge and there is no behaviour, so there is no
 * component to register: spread `badgeAttrs()` on a plain element;
 * `badge.css` does the rest.
 *
 *   <span {...badgeAttrs({ variant: "accent", appearance: "standard" })}>New</span>
 *
 * Add `data-high-contrast` to strengthen the neutral border.
 */

export type BadgeAppearance = "compact" | "standard";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "subtle"
  | "danger"
  | "info"
  | "success"
  | "warning";

export type BadgeOptions = { appearance?: BadgeAppearance; variant?: BadgeVariant };

export function badgeAttrs(options: BadgeOptions = {}) {
  return {
    "data-slot": "badge",
    "data-appearance": options.appearance ?? "compact",
    "data-variant": options.variant ?? "neutral",
  } as const;
}

/** Applies `badgeAttrs()` to an existing element (for web components / vanilla DOM). */
export function applyBadge(el: HTMLElement, options: BadgeOptions = {}) {
  for (const [key, value] of Object.entries(badgeAttrs(options))) el.setAttribute(key, value);
  return el;
}
