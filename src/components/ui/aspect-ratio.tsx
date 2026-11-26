import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./aspect-ratio.css";

/**
 * AspectRatio, shadcn's AspectRatio: shows its content at a fixed width to
 * height ratio, whatever width it is given.
 *
 *   <AspectRatio ratio={16 / 9}>
 *     <img src="/cover.png" alt="Dashboard cover" />
 *   </AspectRatio>
 *
 * shadcn's is Radix's padding-bottom wrapper; this one is a single element
 * with CSS `aspect-ratio` (see `aspect-ratio.css`). ui-sdk has no aspect-ratio
 * or media primitive (its only `aspect` options are on resize handles and
 * ImageCropper's crop box), and there is no behaviour, so it is plain markup.
 */

export type AspectRatioProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Width over height, like `16 / 9`. Defaults to 1. */
  ratio?: number;
};

export function AspectRatio(props: AspectRatioProps) {
  const rest = omit(props, "ratio", "style");

  const style = (): JSX.CSSProperties | string => {
    const ratio = String(props.ratio ?? 1);
    const own = props.style;

    return typeof own === "string"
      ? `${own};--aspect-ratio:${ratio}`
      : { ...own, "--aspect-ratio": ratio };
  };

  return <div {...rest} data-slot="aspect-ratio" style={style()} />;
}
