import { itemGroupPrimitive } from "./item-primitive";

import "./item.css";

/**
 * Item, opencode console's list row with shadcn's part names. The row and its
 * parts are plain markup: mark plain elements with `itemAttrs()`,
 * `itemMediaAttrs()` and the `data-slot`s below; `item.css` does the rest.
 *
 *   <div role="list" data-slot="item-group">
 *     <div role="listitem" data-slot="item" data-variant="outline" data-size="default">
 *       <div data-slot="item-media" data-variant="icon"><svg>…</svg></div>
 *       <div data-slot="item-content">
 *         <div data-slot="item-title">One-time credits</div>
 *         <p data-slot="item-description">Purchase additional workspace credits</p>
 *       </div>
 *       <div data-slot="item-actions"><button>Add credits</button></div>
 *     </div>
 *   </div>
 *
 * A link row is an `<a data-slot="item" href="…">`; inside a group, wrap it in
 * `<div role="listitem" data-slot="item-listitem">` so it keeps its link role.
 * Between rows, a decorative separator with `data-item-separator` joins them.
 *
 * Rows here are each their own Tab stop. The roving behaviour Solid, React,
 * Vue and Svelte offer (`roving` on ItemGroup) lives in the shared
 * `@ui-sdk/core` primitive `itemGroupPrimitive` (`item-primitive.ts`): its
 * `item` slot must land on the `<a>` itself, so no custom element is
 * registered for it here.
 */

export { itemGroupPrimitive };

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm";
export type ItemMediaVariant = "default" | "icon" | "image";

export function itemAttrs(
  options: { variant?: ItemVariant; size?: ItemSize; inGroup?: boolean } = {},
) {
  return {
    ...(options.inGroup ? { role: "listitem" } : {}),
    "data-slot": "item",
    "data-variant": options.variant ?? "default",
    "data-size": options.size ?? "default",
  } as const;
}

export function itemMediaAttrs(options: { variant?: ItemMediaVariant } = {}) {
  return { "data-slot": "item-media", "data-variant": options.variant ?? "default" } as const;
}

/** Applies `itemAttrs()` to an existing element (for web components / vanilla DOM). */
export function applyItem(
  el: HTMLElement,
  options: { variant?: ItemVariant; size?: ItemSize; inGroup?: boolean } = {},
) {
  for (const [key, value] of Object.entries(itemAttrs(options))) el.setAttribute(key, value);
  return el;
}

/** Applies `itemMediaAttrs()` to an existing element. */
export function applyItemMedia(el: HTMLElement, options: { variant?: ItemMediaVariant } = {}) {
  for (const [key, value] of Object.entries(itemMediaAttrs(options))) el.setAttribute(key, value);
  return el;
}
