import { createParts } from "@ui-sdk/vue/primitive";
import { defineComponent, h, inject, provide, type InjectionKey, type PropType } from "vue";

import { itemGroupPrimitive } from "./item-primitive";
import { Separator } from "./separator";

import "./item.css";

/**
 * Item, opencode console's list row with shadcn's part names. The parts are
 * plain markup styled by `item.css`; `href` renders the row as a link.
 *
 * ItemGroup is a `role="list"`. Pass `roving` to make its link rows one Tab
 * stop with Up, Down, Home and End between them, from the shared
 * `@ui-sdk/core` primitive in `item-primitive.ts`.
 */

const parts = createParts(itemGroupPrimitive, { root: "div", item: "a" });

const ItemGroupKey: InjectionKey<{ roving: boolean }> = Symbol("kitsaas-item-group");

function part(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(tag, { ...attrs, "data-slot": slot }, slots.default?.());
    },
    inheritAttrs: false,
  });
}

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm";

export const Item = defineComponent({
  name: "Item",
  props: {
    variant: { type: String as PropType<ItemVariant>, default: "default" },
    size: { type: String as PropType<ItemSize>, default: "default" },
    href: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const group = inject(ItemGroupKey, null);

    return () => {
      const look = { "data-variant": props.variant, "data-size": props.size };

      if (props.href === undefined) {
        return h(
          "div",
          { role: group ? "listitem" : undefined, ...attrs, ...look, "data-slot": "item" },
          slots.default?.(),
        );
      }

      const link = group?.roving
        ? h(parts.Item, { ...attrs, ...look, href: props.href }, slots)
        : h("a", { ...attrs, ...look, href: props.href, "data-slot": "item" }, slots.default?.());

      return group ? h("div", { role: "listitem", "data-slot": "item-listitem" }, [link]) : link;
    };
  },
  inheritAttrs: false,
});

export const ItemGroup = defineComponent({
  name: "ItemGroup",
  props: {
    /** One Tab stop for the link rows, with Up, Down, Home and End between them. */
    roving: { type: Boolean, default: false },
    /** With `roving`, wrap from the last row to the first, and back. */
    loop: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    provide(ItemGroupKey, { roving: props.roving });

    return () =>
      props.roving
        ? h(parts.Root, { ...attrs, loop: props.loop }, slots)
        : h("div", { role: "list", ...attrs, "data-slot": "item-group" }, slots.default?.());
  },
  inheritAttrs: false,
});

export const ItemSeparator = defineComponent({
  name: "ItemSeparator",
  setup(_, { attrs }) {
    return () => h(Separator, { decorative: true, ...attrs, "data-item-separator": "" });
  },
  inheritAttrs: false,
});

export type ItemMediaVariant = "default" | "icon" | "image";

export const ItemMedia = defineComponent({
  name: "ItemMedia",
  props: { variant: { type: String as PropType<ItemMediaVariant>, default: "default" } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "div",
        { ...attrs, "data-slot": "item-media", "data-variant": props.variant },
        slots.default?.(),
      );
  },
  inheritAttrs: false,
});

export const ItemContent = part("ItemContent", "div", "item-content");
export const ItemTitle = part("ItemTitle", "div", "item-title");
export const ItemDescription = part("ItemDescription", "p", "item-description");
export const ItemActions = part("ItemActions", "div", "item-actions");
export const ItemHeader = part("ItemHeader", "div", "item-header");
export const ItemFooter = part("ItemFooter", "div", "item-footer");
