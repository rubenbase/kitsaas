import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./typography.css";

/**
 * Typography, opencode console's prose (the changelog's rendered markdown)
 * with shadcn's Typography names.
 *
 * shadcn ships Typography as a set of styled elements, one per role
 * (TypographyH1 … TypographyMuted). Kitsaas keeps those parts and adds the
 * console's container, because the console styles prose as a container that
 * spaces whatever HTML it holds (`> * + *`), which is also what rendered
 * markdown needs:
 *
 *   <Typography>
 *     <TypographyH1>Release notes</TypographyH1>
 *     <TypographyLead>What changed this month.</TypographyLead>
 *     <TypographyP>Workspaces now share a <TypographyInlineCode>budget</TypographyInlineCode>.</TypographyP>
 *   </Typography>
 *
 *   <Typography innerHTML={renderedMarkdown} />
 *
 * The parts set a font only; Typography adds the flow spacing between them,
 * and `size="compact"` is the console's smaller variant (13px body).
 *
 * There is no behaviour, so there is no ui-sdk primitive under it: the parts
 * are plain markup and the look lives in `typography.css`.
 */

export type TypographySize = "default" | "compact";

export type TypographyProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Defaults to `default` (15px body); `compact` is 13px. */
  size?: TypographySize;
};

/** Styles and spaces the HTML inside it, parts or raw markdown output. */
export function Typography(props: TypographyProps) {
  const rest = omit(props, "size");

  return <div {...rest} data-slot="typography" data-size={props.size ?? "default"} />;
}

export type TypographyHeadingProps = JSX.HTMLAttributes<HTMLHeadingElement>;

/** The page title: the console's Activity heading, 21px. */
export function TypographyH1(props: TypographyHeadingProps) {
  return <h1 {...props} data-slot="typography-h1" />;
}

/** A section heading: the changelog's heading, 20px. */
export function TypographyH2(props: TypographyHeadingProps) {
  return <h2 {...props} data-slot="typography-h2" />;
}

/** A card or sub-section heading, 15px. */
export function TypographyH3(props: TypographyHeadingProps) {
  return <h3 {...props} data-slot="typography-h3" />;
}

/** The smallest heading, 14px. */
export function TypographyH4(props: TypographyHeadingProps) {
  return <h4 {...props} data-slot="typography-h4" />;
}

export type TypographyPProps = JSX.HTMLAttributes<HTMLParagraphElement>;

/** Body text: the changelog's 15px / 28px muted paragraph. */
export function TypographyP(props: TypographyPProps) {
  return <p {...props} data-slot="typography-p" />;
}

export type TypographyBlockquoteProps = JSX.BlockquoteHTMLAttributes<HTMLQuoteElement>;

/** A quotation with a hairline on its start edge. */
export function TypographyBlockquote(props: TypographyBlockquoteProps) {
  return <blockquote {...props} data-slot="typography-blockquote" />;
}

export type TypographyListProps = JSX.HTMLAttributes<HTMLUListElement>;

/** A bulleted list. Holds plain <li> elements. */
export function TypographyList(props: TypographyListProps) {
  return <ul {...props} data-slot="typography-list" />;
}

export type TypographyInlineCodeProps = JSX.HTMLAttributes<HTMLElement>;

/** Inline code in a mono chip. */
export function TypographyInlineCode(props: TypographyInlineCodeProps) {
  return <code {...props} data-slot="typography-inline-code" />;
}

/** An introductory paragraph, larger and muted. */
export function TypographyLead(props: TypographyPProps) {
  return <p {...props} data-slot="typography-lead" />;
}

export type TypographyLargeProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Emphasised text a step above body size. */
export function TypographyLarge(props: TypographyLargeProps) {
  return <div {...props} data-slot="typography-large" />;
}

export type TypographySmallProps = JSX.HTMLAttributes<HTMLElement>;

/** Fine print, 12px. */
export function TypographySmall(props: TypographySmallProps) {
  return <small {...props} data-slot="typography-small" />;
}

/** Secondary text: the console's 13px muted caption. */
export function TypographyMuted(props: TypographyPProps) {
  return <p {...props} data-slot="typography-muted" />;
}
