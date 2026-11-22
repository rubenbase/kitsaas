import type { ComponentProps } from "react";

import "./empty.css";

/**
 * Empty, opencode console's empty list state with shadcn's part names. There
 * is no behaviour, so the parts are plain markup styled by `empty.css`. Pass
 * `role="status"` to Empty when it replaces a list after a user action.
 */

export function Empty(props: ComponentProps<"div">) {
  return <div {...props} data-slot="empty" />;
}

export function EmptyHeader(props: ComponentProps<"div">) {
  return <div {...props} data-slot="empty-header" />;
}

export type EmptyMediaVariant = "default" | "icon";

export function EmptyMedia({
  variant = "default",
  ...props
}: ComponentProps<"div"> & { variant?: EmptyMediaVariant }) {
  return <div {...props} data-slot="empty-media" data-variant={variant} />;
}

export function EmptyTitle(props: ComponentProps<"p">) {
  return <p {...props} data-slot="empty-title" />;
}

export function EmptyDescription(props: ComponentProps<"p">) {
  return <p {...props} data-slot="empty-description" />;
}

export function EmptyContent(props: ComponentProps<"div">) {
  return <div {...props} data-slot="empty-content" />;
}
