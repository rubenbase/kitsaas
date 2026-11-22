import type { ComponentProps, ReactNode } from "react";

import "./card.css";

/**
 * Card, opencode console's dashboard card with shadcn's part names. There is
 * no behaviour, so the parts are plain markup styled by `card.css`. A link
 * inside CardTitle makes the whole card clickable.
 */

export function Card(props: ComponentProps<"section">) {
  return <section {...props} data-slot="card" />;
}

export function CardHeader(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-header" />;
}

export function CardTitle(props: ComponentProps<"h2">) {
  return <h2 {...props} data-slot="card-title" />;
}

export function CardDescription(props: ComponentProps<"p">) {
  return <p {...props} data-slot="card-description" />;
}

export function CardAction(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-action" />;
}

export function CardContent(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-content" />;
}

export function CardFooter(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-footer" />;
}

export type CardInsetVariant = "neutral" | "warning" | "danger";

export function CardInset({
  variant = "neutral",
  ...props
}: ComponentProps<"div"> & { variant?: CardInsetVariant }) {
  return <div {...props} data-slot="card-inset" data-variant={variant} />;
}

export function CardFacts(props: ComponentProps<"dl">) {
  return <dl {...props} data-slot="card-facts" />;
}

export function CardFact({
  label,
  children,
  ...props
}: Omit<ComponentProps<"div">, "children"> & { label: ReactNode; children?: ReactNode }) {
  return (
    <div {...props}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
