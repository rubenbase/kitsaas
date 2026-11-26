import { createRovingFocus, definePrimitive, selects } from "@ui-sdk/core";

/**
 * Item Group's opt-in keyboard behaviour, on `@ui-sdk/core` so every framework
 * binding shares it. A plain ItemGroup is a `role="list"` where each link row
 * is its own Tab stop. With this primitive the link rows become one Tab stop:
 * Up and Down move between them, Home and End jump to the ends, and Tab moves
 * on to the focused row's ItemActions, then out of the group.
 *
 * It follows ui-sdk's Timeline, a list whose items rove the same way: the
 * group keeps `role="list"`, items keep their own semantics (a link stays a
 * link), and arrows only move when the row itself has focus, so a control in
 * ItemActions keeps its own keys.
 *
 * Only rows that are links join (`slot: "item"`). Static rows, separators and
 * the buttons inside a row are left alone.
 */

export type ItemGroupOptions = {
  /** Whether moving past the last row wraps to the first, and back. Defaults to `false`. */
  loop?: boolean;
};

export const itemGroupPrimitive = definePrimitive({
  name: "item-group",
  options: { loop: "boolean" },
  state: (options: ItemGroupOptions) => ({
    loop: !!options.loop,
    stop: null as string | null,
  }),
  sync: (options: ItemGroupOptions) => ({ loop: !!options.loop }),
  api: (context) => {
    const roving = createRovingFocus(context, {
      slot: "item",
      key: "stop",
      loop: () => context.store.get().loop,
    });

    return {
      roving,
      keydown(event: KeyboardEvent, el: HTMLElement) {
        if (event.defaultPrevented || event.target !== el || event.shiftKey) return;
        roving.keydown(event, el);
      },
    };
  },
  slots: (slot) => ({
    root: slot({
      role: "list",
      selects: selects({ stop: [] }),
    }),
    // Each row needs its own `value`: a part's key is its `id` or `value`, and
    // rows without one all share the key "" (one part, one tabindex). The
    // adapters' generated parts fill an "id" prop; a hand-written `usePart`
    // must pass one, as Item does with createUniqueId / useId.
    item: slot<{ value?: string }>({
      props: { value: "id" },
      selects: selects({ stop: ({ key }) => [key, null] }),
      // The row keeps item.css's slot, so every binding styles it unchanged.
      attrs: (state, part) => ({
        "data-slot": "item",
        tabindex: part.api.roving.tabIndex(state, part),
      }),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.keydown(event as KeyboardEvent, el);
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
  }),
});
