import type { ComponentProps, CSSProperties } from "react";

import "./aspect-ratio.css";

/**
 * AspectRatio, shadcn's AspectRatio on CSS `aspect-ratio` instead of Radix's
 * padding hack. `ratio` is width over height, like `16 / 9` (default 1).
 */

export function AspectRatio({
  ratio = 1,
  style,
  ...props
}: ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      {...props}
      data-slot="aspect-ratio"
      style={{ ...style, "--aspect-ratio": String(ratio) } as CSSProperties}
    />
  );
}
