import { formatShortcut } from "@ui-sdk/core";
import { defineComponent, h, onMounted, ref, type PropType } from "vue";

import "./kbd.css";

/**
 * Kbd, a port of opencode's Keybind (`@opencode/ui/keybind`) with shadcn's
 * part names: a key cap for a keyboard shortcut. A plain <kbd> styled by
 * `kbd.css` through `data-slot` / `data-variant`.
 *
 * `shortcut` takes ui-sdk's syntax (`mod+k`: ⌘ on Apple platforms, Ctrl
 * elsewhere), formatted with ui-sdk's `formatShortcut`. The first render uses
 * the non-Apple form so SSR hydration matches; it switches after mount. A Kbd
 * is display only: inside a control, pass `aria-hidden` and set
 * `aria-keyshortcuts` on the control.
 */

export type KbdVariant = "neutral" | "ghost" | "outline";

export const Kbd = defineComponent({
  name: "Kbd",
  props: {
    shortcut: { type: String, default: undefined },
    variant: { type: String as PropType<KbdVariant>, default: "neutral" },
  },
  setup(props, { slots, attrs }) {
    const apple = ref<boolean | undefined>(false);
    onMounted(() => {
      apple.value = undefined; // let formatShortcut read the platform
    });
    return () =>
      h(
        "kbd",
        { ...attrs, "data-slot": "kbd", "data-variant": props.variant },
        props.shortcut ? formatShortcut(props.shortcut, apple.value) : slots.default?.(),
      );
  },
  inheritAttrs: false,
});

/** A key combination: Kbds side by side, kept left to right when built from `shortcut`. */
export const KbdGroup = defineComponent({
  name: "KbdGroup",
  props: {
    shortcut: { type: String, default: undefined },
    variant: { type: String as PropType<KbdVariant>, default: "neutral" },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "kbd",
        { dir: props.shortcut ? "ltr" : undefined, ...attrs, "data-slot": "kbd-group" },
        props.shortcut
          ? props.shortcut.split("+").map((key) => h(Kbd, { shortcut: key, variant: props.variant }))
          : slots.default?.(),
      );
  },
  inheritAttrs: false,
});
