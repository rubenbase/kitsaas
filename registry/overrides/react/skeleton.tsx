import type { ComponentProps } from "react";

import "./skeleton.css";

/**
 * Skeleton, opencode console's loading placeholder with shadcn's API: a faint
 * bar with a slow shimmer, faded in after 120ms. An inline-block <span>, 0.7em
 * tall, with no width of its own: size it with a class.
 *
 * Decorative (`aria-hidden` by default): mark the loading region with
 * `aria-busy="true"` instead. Reduced motion keeps the fade-in and drops the
 * sweep. `SkeletonFade` wraps a stack of rows and fades out its last 9rem.
 */

export type SkeletonProps = ComponentProps<"span">;

export function Skeleton(props: SkeletonProps) {
  return <span aria-hidden="true" {...props} data-slot="skeleton" />;
}

export type SkeletonFadeProps = ComponentProps<"div">;

export function SkeletonFade(props: SkeletonFadeProps) {
  return <div aria-hidden="true" {...props} data-slot="skeleton-fade" />;
}
