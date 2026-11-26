import "./card.css";

/**
 * Card, opencode console's dashboard card with shadcn's part names. There is
 * no behaviour, so there is no component to register: mark plain elements
 * with `data-slot`; `card.css` does the rest. A link inside the title makes
 * the whole card clickable.
 *
 *   <section data-slot="card">
 *     <div data-slot="card-header">
 *       <h2 data-slot="card-title"><a href="/usage">My usage</a></h2>
 *       <p data-slot="card-description">Your requests, cost and limit</p>
 *       <div data-slot="card-action"><svg>…</svg></div>
 *     </div>
 *     <div data-slot="card-content">…</div>
 *     <div data-slot="card-footer">
 *       <dl data-slot="card-facts">
 *         <div><dt>Requests</dt><dd>2,624</dd></div>
 *       </dl>
 *       <div {...cardInsetAttrs({ variant: "warning" })}>Credit is running low</div>
 *     </div>
 *   </section>
 */

export type CardInsetVariant = "neutral" | "warning" | "danger";

export function cardInsetAttrs(options: { variant?: CardInsetVariant } = {}) {
  return {
    "data-slot": "card-inset",
    "data-variant": options.variant ?? "neutral",
  } as const;
}

/** Applies `cardInsetAttrs()` to an existing element (for web components / vanilla DOM). */
export function applyCardInset(el: HTMLElement, options: { variant?: CardInsetVariant } = {}) {
  for (const [key, value] of Object.entries(cardInsetAttrs(options))) el.setAttribute(key, value);
  return el;
}
