import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./alert.css";

/**
 * Alert, Kitsaas's take on shadcn's Alert: a static, inline callout such as
 * opencode console's "Your credit balance is running low" banner. Use Toast
 * for a transient message and Alert Dialog when the user has to answer.
 *
 * ui-sdk has no alert, and the only behaviour is its ARIA role, so the root is
 * plain markup (like ButtonGroup) and the look lives in `alert.css` as
 * attribute rules (`data-variant`). The colours are opencode's state tokens
 * (`--v2-state-bg-*` / `--v2-state-fg-*`), which give the console banner's
 * yellow-1200 fill and yellow-500 text in dark mode.
 *
 * `role` defaults to `alert`, which screen readers announce when the element
 * is inserted. For a callout that is on the page from the first paint and is
 * not urgent, pass `role="status"` (polite) or `role="note"` (not announced).
 *
 * An icon passed as the first child sits in its own column, as in shadcn.
 */

export type AlertVariant = "neutral" | "info" | "success" | "warning" | "danger";

export type AlertProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Defaults to `neutral`. */
  variant?: AlertVariant;
};

export function Alert(props: AlertProps) {
  const rest = omit(props, "variant");

  return <div role="alert" {...rest} data-slot="alert" data-variant={props.variant ?? "neutral"} />;
}

export type AlertTitleProps = JSX.HTMLAttributes<HTMLDivElement>;

/** A short, emphasised first line. Optional: a one-line alert can skip it. */
export function AlertTitle(props: AlertTitleProps) {
  return <div {...props} data-slot="alert-title" />;
}

export type AlertDescriptionProps = JSX.HTMLAttributes<HTMLDivElement>;

/** The body text. Paragraphs and links inside it inherit the variant colour. */
export function AlertDescription(props: AlertDescriptionProps) {
  return <div {...props} data-slot="alert-description" />;
}

export type AlertActionProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Trailing actions (a Button, a link), pinned to the end of the row. */
export function AlertAction(props: AlertActionProps) {
  return <div {...props} data-slot="alert-action" />;
}
