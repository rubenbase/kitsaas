"use client";

import { createContext, useContext, useId, type ComponentProps } from "react";
import { usePart, usePrimitive } from "@ui-sdk/react/primitive";

import { itemGroupPrimitive } from "./item-primitive";
import { Separator, type SeparatorProps } from "./separator";

import "./item.css";

/**
 * Item, opencode console's list row with shadcn's part names. The parts are
 * plain markup styled by `item.css`; `href` renders the row as a link.
 *
 * ItemGroup is a `role="list"`. Pass `roving` to make its link rows one Tab
 * stop with Up, Down, Home and End between them, from the shared
 * `@ui-sdk/core` primitive in `item-primitive.ts`.
 */

const ItemGroupContext = createContext<{ roving: boolean } | null>(null);

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm";

export type ItemProps = ComponentProps<"a"> & {
  variant?: ItemVariant;
  size?: ItemSize;
};

function RovingLink(props: ComponentProps<"a">) {
  // Its own key: without one, every row is the same part and keeps tabindex 0.
  const value = useId();
  return usePart(itemGroupPrimitive, "item", { value }, props as never, "a");
}

export function Item({ variant = "default", size = "default", ...props }: ItemProps) {
  const group = useContext(ItemGroupContext);
  const look = { "data-variant": variant, "data-size": size };

  if (props.href === undefined) {
    return (
      <div
        role={group ? "listitem" : undefined}
        {...(props as ComponentProps<"div">)}
        {...look}
        data-slot="item"
      />
    );
  }

  const link = group?.roving ? (
    <RovingLink {...props} {...look} />
  ) : (
    <a {...props} {...look} data-slot="item" />
  );

  return group ? (
    <div role="listitem" data-slot="item-listitem">
      {link}
    </div>
  ) : (
    link
  );
}

export type ItemGroupProps = ComponentProps<"div"> & {
  /** One Tab stop for the link rows, with Up, Down, Home and End between them. */
  roving?: boolean;
  /** With `roving`, wrap from the last row to the first, and back. */
  loop?: boolean;
};

function RovingGroup({ loop, ...props }: Omit<ItemGroupProps, "roving">) {
  const handle = usePrimitive(itemGroupPrimitive, { loop });
  return usePart(handle, "root", undefined, props as never, "div");
}

export function ItemGroup({ roving = false, ...props }: ItemGroupProps) {
  return (
    <ItemGroupContext.Provider value={{ roving }}>
      {roving ? <RovingGroup {...props} /> : <div role="list" {...props} data-slot="item-group" />}
    </ItemGroupContext.Provider>
  );
}

export function ItemSeparator(props: SeparatorProps) {
  return <Separator decorative {...props} data-item-separator="" />;
}

export type ItemMediaVariant = "default" | "icon" | "image";

export function ItemMedia({
  variant = "default",
  ...props
}: ComponentProps<"div"> & { variant?: ItemMediaVariant }) {
  return <div {...props} data-slot="item-media" data-variant={variant} />;
}

export function ItemContent(props: ComponentProps<"div">) {
  return <div {...props} data-slot="item-content" />;
}

export function ItemTitle(props: ComponentProps<"div">) {
  return <div {...props} data-slot="item-title" />;
}

export function ItemDescription(props: ComponentProps<"p">) {
  return <p {...props} data-slot="item-description" />;
}

export function ItemActions(props: ComponentProps<"div">) {
  return <div {...props} data-slot="item-actions" />;
}

export function ItemHeader(props: ComponentProps<"div">) {
  return <div {...props} data-slot="item-header" />;
}

export function ItemFooter(props: ComponentProps<"div">) {
  return <div {...props} data-slot="item-footer" />;
}
