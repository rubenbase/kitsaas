import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./card.css";

/**
 * Card, opencode console's dashboard card (the My usage / Leaderboard /
 * Billing row on Activity) with shadcn's part names:
 *
 *   <Card>
 *     <CardHeader>
 *       <CardTitle><a href="/usage">My usage</a></CardTitle>
 *       <CardDescription>Your requests, cost and limit</CardDescription>
 *       <CardAction><ChevronRightIcon /></CardAction>
 *     </CardHeader>
 *     <CardContent>…</CardContent>
 *     <CardFooter>
 *       <CardFacts>
 *         <CardFact label="Requests">2,624</CardFact>
 *       </CardFacts>
 *     </CardFooter>
 *   </Card>
 *
 * A link inside CardTitle makes the whole card clickable, with the console's
 * hover fill and press. Other links and buttons in the card stay clickable.
 *
 * Card has no behaviour, so there is no ui-sdk primitive under it: the parts
 * are plain markup and the look lives in `card.css`. CardInset and CardFacts
 * are the console's inset tile and label/value list; shadcn has neither.
 */

export type CardProps = JSX.HTMLAttributes<HTMLElement>;

/** A <section>, as in the console. Give it an `aria-label` or a CardTitle. */
export function Card(props: CardProps) {
  return <section {...props} data-slot="card" />;
}

export type CardHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Title and description on the left, CardAction pinned top right. */
export function CardHeader(props: CardHeaderProps) {
  return <div {...props} data-slot="card-header" />;
}

export type CardTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>;

/** An <h2>. Wrap the text in a link to make the whole card clickable. */
export function CardTitle(props: CardTitleProps) {
  return <h2 {...props} data-slot="card-title" />;
}

export type CardDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

/** One muted line under the title. */
export function CardDescription(props: CardDescriptionProps) {
  return <p {...props} data-slot="card-description" />;
}

export type CardActionProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Top-right slot: the console's chevron, or a small button. */
export function CardAction(props: CardActionProps) {
  return <div {...props} data-slot="card-action" />;
}

export type CardContentProps = JSX.HTMLAttributes<HTMLDivElement>;

/** The body, 16px under the header. */
export function CardContent(props: CardContentProps) {
  return <div {...props} data-slot="card-content" />;
}

export type CardFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Pinned to the bottom of the card, so footers line up across a row of cards. */
export function CardFooter(props: CardFooterProps) {
  return <div {...props} data-slot="card-footer" />;
}

export type CardInsetVariant = "neutral" | "warning" | "danger";

export type CardInsetProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Defaults to `neutral`. */
  variant?: CardInsetVariant;
};

/** A raised tile inside the card, such as the Leaderboard's "Average spent". */
export function CardInset(props: CardInsetProps) {
  const rest = omit(props, "variant");

  return <div {...rest} data-slot="card-inset" data-variant={props.variant ?? "neutral"} />;
}

export type CardFactsProps = JSX.HTMLAttributes<HTMLDListElement>;

/** A label/value list with hairlines between rows. Holds CardFact rows. */
export function CardFacts(props: CardFactsProps) {
  return <dl {...props} data-slot="card-facts" />;
}

export type CardFactProps = JSX.HTMLAttributes<HTMLDivElement> & {
  label: JSX.Element;
};

/** One row of CardFacts: `label` on the left, children on the right. */
export function CardFact(props: CardFactProps) {
  const rest = omit(props, "label", "children");

  return (
    <div {...rest}>
      <dt>{props.label}</dt>
      <dd>{props.children}</dd>
    </div>
  );
}
