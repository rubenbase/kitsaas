import type { ComponentProps } from "react";

import "./alert.css";

/**
 * Alert, Kitsaas's take on shadcn's Alert: a static, inline callout such as
 * opencode console's "Your credit balance is running low" banner. Use Toast
 * for a transient message and Alert Dialog when the user has to answer.
 *
 * ui-sdk has no alert, and the only behaviour is its ARIA role, so the root is
 * plain markup and the look lives in `alert.css` as attribute rules
 * (`data-variant`), shared with every framework.
 *
 * `role` defaults to `alert`, which screen readers announce when the element
 * is inserted. For a callout that is on the page from the first paint and is
 * not urgent, pass `role="status"` (polite) or `role="note"` (not announced).
 *
 * An icon passed as the first child sits in its own column, as in shadcn.
 */

export type AlertVariant = "neutral" | "info" | "success" | "warning" | "danger";

export type AlertProps = ComponentProps<"div"> & {
  /** Defaults to `neutral`. */
  variant?: AlertVariant;
};

export function Alert({ variant = "neutral", ...props }: AlertProps) {
  return <div role="alert" {...props} data-slot="alert" data-variant={variant} />;
}

/** A short, emphasised first line. Optional: a one-line alert can skip it. */
export function AlertTitle(props: ComponentProps<"div">) {
  return <div {...props} data-slot="alert-title" />;
}

/** The body text. Paragraphs and links inside it inherit the variant colour. */
export function AlertDescription(props: ComponentProps<"div">) {
  return <div {...props} data-slot="alert-description" />;
}

/** Trailing actions (a Button, a link), pinned to the end of the row. */
export function AlertAction(props: ComponentProps<"div">) {
  return <div {...props} data-slot="alert-action" />;
}
