import { createParts } from "@ui-sdk/svelte/primitive";

import { itemGroupPrimitive } from "./item-primitive";

import "./item.css";

/**
 * Item, opencode console's list row with shadcn's part names. The row and its
 * parts are plain markup: spread `itemAttrs()`, `itemMediaAttrs()` and the
 * `data-slot`s below on your own elements; `item.css` does the rest.
 *
 *   <div {...itemGroupAttrs()}>
 *     <div {...itemAttrs({ variant: "outline", inGroup: true })}>
 *       <div {...itemMediaAttrs({ variant: "icon" })}><svg>…</svg></div>
 *       <div data-slot="item-content">
 *         <div data-slot="item-title">One-time credits</div>
 *         <p data-slot="item-description">Purchase additional workspace credits</p>
 *       </div>
 *       <div data-slot="item-actions"><button>Add credits</button></div>
 *     </div>
 *     <Separator decorative data-item-separator />
 *   </div>
 *
 * A link row is an `<a {...itemAttrs()}>`; inside a group, wrap it in
 * `<div role="listitem" data-slot="item-listitem">` so it keeps its link role.
 * `item-header` and `item-footer` are full-width lines.
 *
 * For one Tab stop with Up, Down, Home and End between the link rows, render
 * the group as `ItemGroupRoot` and each link row as `ItemGroupItem` (still in
 * its listitem wrapper), from the shared `@ui-sdk/core` primitive in
 * `item-primitive.ts`.
 */

const { Root: ItemGroupRoot, Item: ItemGroupItem } = createParts(itemGroupPrimitive, {
  root: "div",
  item: "a",
});

export { ItemGroupItem, ItemGroupRoot, itemGroupPrimitive };

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm";
export type ItemMediaVariant = "default" | "icon" | "image";

export function itemGroupAttrs() {
  return { role: "list", "data-slot": "item-group" } as const;
}

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
