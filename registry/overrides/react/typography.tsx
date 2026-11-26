import type { ComponentProps } from "react";

import "./typography.css";

/**
 * Typography, opencode console's prose (the changelog's rendered markdown)
 * with shadcn's Typography names. The parts set a font; wrap them (or
 * rendered markdown) in Typography for the console's flow spacing. There is
 * no behaviour, so the parts are plain markup styled by `typography.css`.
 */

export type TypographySize = "default" | "compact";

export function Typography({
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: TypographySize }) {
  return <div {...props} data-slot="typography" data-size={size} />;
}

export function TypographyH1(props: ComponentProps<"h1">) {
  return <h1 {...props} data-slot="typography-h1" />;
}

export function TypographyH2(props: ComponentProps<"h2">) {
  return <h2 {...props} data-slot="typography-h2" />;
}

export function TypographyH3(props: ComponentProps<"h3">) {
  return <h3 {...props} data-slot="typography-h3" />;
}

export function TypographyH4(props: ComponentProps<"h4">) {
  return <h4 {...props} data-slot="typography-h4" />;
}

export function TypographyP(props: ComponentProps<"p">) {
  return <p {...props} data-slot="typography-p" />;
}

export function TypographyBlockquote(props: ComponentProps<"blockquote">) {
  return <blockquote {...props} data-slot="typography-blockquote" />;
}

export function TypographyList(props: ComponentProps<"ul">) {
  return <ul {...props} data-slot="typography-list" />;
}

export function TypographyInlineCode(props: ComponentProps<"code">) {
  return <code {...props} data-slot="typography-inline-code" />;
}

export function TypographyLead(props: ComponentProps<"p">) {
  return <p {...props} data-slot="typography-lead" />;
}

export function TypographyLarge(props: ComponentProps<"div">) {
  return <div {...props} data-slot="typography-large" />;
}

export function TypographySmall(props: ComponentProps<"small">) {
  return <small {...props} data-slot="typography-small" />;
}

export function TypographyMuted(props: ComponentProps<"p">) {
  return <p {...props} data-slot="typography-muted" />;
}
