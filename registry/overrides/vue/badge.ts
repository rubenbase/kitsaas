import { defineComponent, h, type PropType } from "vue";

import "./badge.css";

/**
 * Badge, a port of opencode's Badge (`@opencode/ui/badge`): a small inline
 * label. ui-sdk has no badge and there is no behaviour, so this is a plain
 * <span> styled by `badge.css` through `data-slot` / `data-appearance` /
 * `data-variant`. Pass `data-high-contrast` to strengthen the border.
 */

export type BadgeAppearance = "compact" | "standard";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "subtle"
  | "danger"
  | "info"
  | "success"
  | "warning";

export const Badge = defineComponent({
  name: "Badge",
  props: {
    appearance: { type: String as PropType<BadgeAppearance>, default: "compact" },
    variant: { type: String as PropType<BadgeVariant>, default: "neutral" },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "badge",
          "data-appearance": props.appearance,
          "data-variant": props.variant,
        },
        slots.default?.(),
      );
  },
  inheritAttrs: false,
});
