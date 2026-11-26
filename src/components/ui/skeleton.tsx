import type { JSX } from "@solidjs/web";

import "./skeleton.css";

/**
 * Skeleton, opencode console's loading placeholder with shadcn's API: a bar in
 * a faint fill with a slow shimmer sweeping across it, faded in after 120ms so
 * a fast load never flashes it. Size it with a class:
 *
 *   <Skeleton class="w-[120px]" />                 a line of text (0.7em tall)
 *   <Skeleton class="size-8 rounded-full" />      an avatar
 *
 * The root is an inline-block <span>, so it sits in a line of text (inside a
 * heading or a <p>) at the text's size. It has no width of its own: give it one.
 *
 * It is decorative (`aria-hidden` by default). Mark the region that is loading
 * with `aria-busy="true"` instead, and drop it when the content arrives.
 *
 * Skeleton has no behaviour, so there is no ui-sdk primitive under it; the look
 * lives in `skeleton.css`. Reduced motion keeps the fade-in and drops the sweep.
 */

export type SkeletonProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function Skeleton(props: SkeletonProps) {
  return <span aria-hidden="true" {...props} data-slot="skeleton" />;
}

export type SkeletonFadeProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Wraps a stack of skeleton rows and fades it out over its last 9rem. */
export function SkeletonFade(props: SkeletonFadeProps) {
  return <div aria-hidden="true" {...props} data-slot="skeleton-fade" />;
}
