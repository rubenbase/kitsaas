import type { JSX } from "@solidjs/web";
import { usePart, usePrimitive } from "@ui-sdk/solid/primitive";
import { createContext, createUniqueId, merge, omit, useContext } from "solid-js";

import { itemGroupPrimitive } from "./item-primitive";
import { Separator, type SeparatorProps } from "./separator";

import "./item.css";

/**
 * Item, opencode console's list row (the Controls and Extensions rows, the
 * Activity log, Billing's "One-time credits · Add credits") with shadcn's part
 * names:
 *
 *   <ItemGroup>
 *     <Item variant="outline">
 *       <ItemMedia variant="icon"><CoinIcon /></ItemMedia>
 *       <ItemContent>
 *         <ItemTitle>One-time credits</ItemTitle>
 *         <ItemDescription>Purchase additional workspace credits</ItemDescription>
 *       </ItemContent>
 *       <ItemActions><Button size="small">Add credits</Button></ItemActions>
 *     </Item>
 *   </ItemGroup>
 *
 * The parts are plain markup and the look lives in `item.css`. `href` renders
 * the row as a link, with the console's hover overlay.
 *
 * ItemGroup is a `role="list"`; each Item in it is a list item. Pass `roving`
 * to make its link rows one Tab stop with Up, Down, Home and End between them
 * (ui-sdk's roving focus, see `item-primitive.ts`). Without it, every link row
 * is its own Tab stop, as on a page of links.
 */

type ItemGroupContextValue = { roving: boolean };

// `null` default: an Item outside an ItemGroup is valid (Solid 2 throws on a
// missing provider when the context has no default).
const ItemGroupContext = createContext<ItemGroupContextValue | null>(null);

export type ItemVariant = "default" | "outline" | "muted";

export type ItemSize = "default" | "sm";

export type ItemProps = JSX.AnchorHTMLAttributes<HTMLElement> & {
  /** Defaults to `default`: no fill or border. */
  variant?: ItemVariant;
  /** Defaults to `default` (12px 16px). `sm` is the console's 6px 8px log row. */
  size?: ItemSize;
  /** Renders the row as an `<a>`. Don't put other links or buttons inside it. */
  href?: string;
};

export function Item(props: ItemProps) {
  const group = useContext(ItemGroupContext);
  const rest = omit(props, "variant", "size");
  const look = {
    get "data-variant"() {
      return props.variant ?? "default";
    },
    get "data-size"() {
      return props.size ?? "default";
    },
  };

  if (props.href === undefined) {
    return (
      <div
        role={group ? "listitem" : undefined}
        {...(rest as JSX.HTMLAttributes<HTMLDivElement>)}
        {...look}
        data-slot="item"
      />
    );
  }

  // A roving row needs its own key: without one, every row is the same part
  // (key "") and they all keep tabindex 0.
  const rowKey = createUniqueId();
  const link = group?.roving ? (
    usePart(itemGroupPrimitive, "item", () => ({ value: rowKey }), merge(rest, look) as never, "a")
  ) : (
    <a {...(rest as JSX.AnchorHTMLAttributes<HTMLAnchorElement>)} {...look} data-slot="item" />
  );

  // A link keeps its role, so a list item wraps it (`display: contents`).
  return group ? (
    <div role="listitem" data-slot="item-listitem">
      {link}
    </div>
  ) : (
    link
  );
}

export type ItemGroupProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /**
   * One Tab stop for the group's link rows, with Up, Down, Home and End
   * between them. Read once, when the group renders. Defaults to `false`.
   */
  roving?: boolean;
  /** With `roving`, wrap from the last row to the first, and back. */
  loop?: boolean;
};

/** A `role="list"` of Items, 8px apart; ItemSeparators join them instead. */
export function ItemGroup(props: ItemGroupProps) {
  const rest = omit(props, "roving", "loop");

  if (!props.roving) {
    return (
      <ItemGroupContext value={{ roving: false }}>
        <div role="list" {...rest} data-slot="item-group" />
      </ItemGroupContext>
    );
  }

  const handle = usePrimitive(itemGroupPrimitive, () => ({ loop: props.loop }));

  return (
    <ItemGroupContext value={{ roving: true }}>
      {usePart(handle, "root", undefined, rest as never, "div")}
    </ItemGroupContext>
  );
}

export type ItemSeparatorProps = SeparatorProps;

/** The hairline between Items in a group. Decorative, so the list stays a list. */
export function ItemSeparator(props: ItemSeparatorProps) {
  return <Separator decorative {...props} data-item-separator="" />;
}

export type ItemMediaVariant = "default" | "icon" | "image";

export type ItemMediaProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /**
   * `default` holds an Avatar or a status chip as is; `icon` is the console's
   * raised 32px tile for a 16px icon; `image` crops an <img> to 32px.
   */
  variant?: ItemMediaVariant;
};

export function ItemMedia(props: ItemMediaProps) {
  const rest = omit(props, "variant");

  return <div {...rest} data-slot="item-media" data-variant={props.variant ?? "default"} />;
}

export type ItemContentProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Title and description; takes the row's free width. */
export function ItemContent(props: ItemContentProps) {
  return <div {...props} data-slot="item-content" />;
}

export type ItemTitleProps = JSX.HTMLAttributes<HTMLDivElement>;

/** The row's name, 530 weight. A Badge beside it sits 8px away. */
export function ItemTitle(props: ItemTitleProps) {
  return <div {...props} data-slot="item-title" />;
}

export type ItemDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

/** Muted text under the title, clamped to two lines. */
export function ItemDescription(props: ItemDescriptionProps) {
  return <p {...props} data-slot="item-description" />;
}

export type ItemActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

/** Buttons or a chevron at the end of the row, 8px apart. */
export function ItemActions(props: ItemActionsProps) {
  return <div {...props} data-slot="item-actions" />;
}

export type ItemHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

/** A full-width line above the row's media and content. */
export function ItemHeader(props: ItemHeaderProps) {
  return <div {...props} data-slot="item-header" />;
}

export type ItemFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

/** A full-width line below the row's media and content. */
export function ItemFooter(props: ItemFooterProps) {
  return <div {...props} data-slot="item-footer" />;
}
