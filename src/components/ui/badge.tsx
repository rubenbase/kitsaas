import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./badge.css";

/**
 * Badge, a port of opencode's Badge (`@opencode/ui/badge`): a small inline
 * label for metadata and status chips beside a heading or in a list ("Free",
 * "Latest", a workspace name, a count). Use SidebarMenuBadge for the count
 * pinned to the end of a sidebar row; this one sits in the text flow.
 *
 * ui-sdk has no badge and there is no behaviour, so the root is plain markup
 * (like Alert) and the look lives in `badge.css` as attribute rules
 * (`data-appearance`, `data-variant`, `data-high-contrast`).
 *
 * `compact` (16px, default) uses tabular numbers; `standard` (18px) is
 * roomier. Pass `data-high-contrast` to strengthen the neutral border. Give a
 * coloured badge meaningful text as well as its colour.
 */

export type BadgeAppearance = "compact" | "standard";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "subtle"
  | "danger"
  // Kitsaas additions, built like `danger` from the --v2-state-* tokens.
  | "info"
  | "success"
  | "warning";

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  /** Defaults to `compact`. */
  appearance?: BadgeAppearance;
  /** Defaults to `neutral`. */
  variant?: BadgeVariant;
};

export function Badge(props: BadgeProps) {
  const rest = omit(props, "appearance", "variant");

  return (
    <span
      {...rest}
      data-slot="badge"
      data-appearance={props.appearance ?? "compact"}
      data-variant={props.variant ?? "neutral"}
    />
  );
}
