import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./empty.css";

/**
 * Empty, opencode console's empty list state with shadcn's part names:
 *
 *   <Empty>
 *     <EmptyHeader>
 *       <EmptyMedia variant="icon"><TerminalIcon /></EmptyMedia>
 *       <EmptyTitle>No API keys yet</EmptyTitle>
 *       <EmptyDescription>Create a key to call the API.</EmptyDescription>
 *     </EmptyHeader>
 *     <EmptyContent>
 *       <Button size="small">Create key</Button>
 *     </EmptyContent>
 *   </Empty>
 *
 * Empty has no behaviour, so there is no ui-sdk primitive under it: the parts
 * are plain markup and the look lives in `empty.css`.
 *
 * It is not a live region. When a list becomes empty because of something the
 * user did (a filter, a delete), either pass `role="status"` so the new text
 * is read, or call ui-sdk's `announce()` from `@ui-sdk/core` in the handler.
 */

export type EmptyProps = JSX.HTMLAttributes<HTMLDivElement>;

/** The panel: layer-01 fill, hairline, 200px tall, everything centred. */
export function Empty(props: EmptyProps) {
  return <div {...props} data-slot="empty" />;
}

export type EmptyHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Media, title and description, stacked and centred. */
export function EmptyHeader(props: EmptyHeaderProps) {
  return <div {...props} data-slot="empty-header" />;
}

export type EmptyMediaVariant = "default" | "icon";

export type EmptyMediaProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /**
   * `default` shows the child as is (an svg is sized to 20px); `icon` puts it
   * on the console's raised 32px tile. Defaults to `default`.
   */
  variant?: EmptyMediaVariant;
};

/** An icon, avatar or image above the title. */
export function EmptyMedia(props: EmptyMediaProps) {
  const rest = omit(props, "variant");

  return <div {...rest} data-slot="empty-media" data-variant={props.variant ?? "default"} />;
}

export type EmptyTitleProps = JSX.HTMLAttributes<HTMLParagraphElement>;

/** A <p>, as in the console, so it does not add to the page outline. */
export function EmptyTitle(props: EmptyTitleProps) {
  return <p {...props} data-slot="empty-title" />;
}

export type EmptyDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

/** Muted text under the title, up to 360px wide. Links are underlined. */
export function EmptyDescription(props: EmptyDescriptionProps) {
  return <p {...props} data-slot="empty-description" />;
}

export type EmptyContentProps = JSX.HTMLAttributes<HTMLDivElement>;

/** The action row: buttons or a link, 16px under the header. */
export function EmptyContent(props: EmptyContentProps) {
  return <div {...props} data-slot="empty-content" />;
}
