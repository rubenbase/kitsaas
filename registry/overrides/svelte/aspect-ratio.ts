import "./aspect-ratio.css";

/**
 * AspectRatio, shadcn's AspectRatio on CSS `aspect-ratio` instead of Radix's
 * padding hack. There is no behaviour, so there is no component to register:
 * spread `aspectRatioAttrs()` on a plain element; `aspect-ratio.css` does the
 * rest. `ratio` is width over height, like `16 / 9` (default 1).
 *
 *   <div {...aspectRatioAttrs({ ratio: 16 / 9 })}>
 *     <img src="/cover.png" alt="Dashboard cover" />
 *   </div>
 */

export function aspectRatioAttrs(options: { ratio?: number } = {}) {
  return {
    "data-slot": "aspect-ratio",
    style: `--aspect-ratio: ${options.ratio ?? 1}`,
  } as const;
}
