import "./typography.css";

/**
 * Typography, opencode console's prose (the changelog's rendered markdown)
 * with shadcn's Typography names. There is no behaviour, so there is no
 * component to register: mark plain elements with `data-slot`;
 * `typography.css` does the rest. The parts set a font; the container adds
 * the console's flow spacing and styles raw markdown HTML inside it.
 *
 *   <div {...typographyAttrs({ size: "compact" })}>
 *     <h1 data-slot="typography-h1">Release notes</h1>
 *     <p data-slot="typography-lead">What changed this month.</p>
 *     <p data-slot="typography-p">Budgets now use <code data-slot="typography-inline-code">key</code>.</p>
 *   </div>
 *
 * Parts: typography-h1 … -h4, -p, -blockquote, -list (a <ul>),
 * -inline-code, -lead, -large, -small and -muted.
 */

export type TypographySize = "default" | "compact";

export function typographyAttrs(options: { size?: TypographySize } = {}) {
  return {
    "data-slot": "typography",
    "data-size": options.size ?? "default",
  } as const;
}
