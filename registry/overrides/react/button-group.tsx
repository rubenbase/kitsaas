"use client";

import type { ComponentProps } from "react";
import { Separator as UiSeparator } from "@ui-sdk/react/separator";

import "./button-group.css";

/**
 * ButtonGroup, Kitsaas's take on shadcn's ButtonGroup: joins related actions
 * (buttons, input groups, select triggers, text) into one segmented row or
 * column.
 *
 * ui-sdk has no button group, so the root is a plain `role="group"` and the
 * joining lives in `button-group.css` as attribute rules. The separator is
 * ui-sdk's headless Separator (`role="separator"`, `aria-orientation`) with
 * Kitsaas's hairline from `separator.css`.
 *
 * Purely visual: each control keeps its own tab stop. Use `Toolbar` when the
 * set should be one tab stop with arrow keys, and `ToggleGroup` for buttons
 * that stay pressed. Nest ButtonGroups to space sets apart; each nested group
 * joins its own children.
 */

export type ButtonGroupOrientation = "horizontal" | "vertical";

export type ButtonGroupProps = ComponentProps<"div"> & {
  /** Defaults to `horizontal`. */
  orientation?: ButtonGroupOrientation;
};

export function ButtonGroup({ orientation = "horizontal", ...rest }: ButtonGroupProps) {
  return <div role="group" {...rest} data-slot="button-group" data-orientation={orientation} />;
}

export type ButtonGroupSeparatorProps = ComponentProps<typeof UiSeparator>;

/**
 * The seam between filled buttons (`neutral`, `contrast`…); `outline` buttons
 * draw their own. Pass `orientation="horizontal"` inside a vertical group.
 */
export function ButtonGroupSeparator({
  orientation = "vertical",
  ...rest
}: ButtonGroupSeparatorProps) {
  return <UiSeparator {...rest} orientation={orientation} />;
}

export type ButtonGroupTextProps = ComponentProps<"div">;

/** A static label or value joined into a ButtonGroup, e.g. a URL prefix. */
export function ButtonGroupText(props: ButtonGroupTextProps) {
  return <div {...props} data-slot="button-group-text" />;
}
