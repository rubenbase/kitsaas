import type { ComponentProps } from "react";

import "./badge.css";

/**
 * Badge, a port of opencode's Badge (`@opencode/ui/badge`): a small inline
 * label for metadata and status chips.
 *
 * ui-sdk has no badge and there is no behaviour, so the root is plain markup
 * and the look lives in `badge.css` as attribute rules, shared with every
 * framework. `compact` (16px, default) uses tabular numbers; `standard`
 * (18px) is roomier. Pass `data-high-contrast` to strengthen the border.
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

export type BadgeProps = ComponentProps<"span"> & {
  /** Defaults to `compact`. */
  appearance?: BadgeAppearance;
  /** Defaults to `neutral`. */
  variant?: BadgeVariant;
};

export function Badge({ appearance = "compact", variant = "neutral", ...props }: BadgeProps) {
  return <span {...props} data-slot="badge" data-appearance={appearance} data-variant={variant} />;
}
