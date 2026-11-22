import { defineComponent, h } from "vue";

import "./skeleton.css";

/**
 * Skeleton, opencode console's loading placeholder with shadcn's API: a faint
 * bar with a slow shimmer, faded in after 120ms. An inline-block <span>, 0.7em
 * tall, with no width of its own: size it with a class.
 *
 * Decorative (`aria-hidden` by default): mark the loading region with
 * `aria-busy="true"` instead. `SkeletonFade` wraps a stack of rows and fades
 * out its last 9rem.
 */

export const Skeleton = defineComponent({
  name: "Skeleton",
  setup(_, { attrs }) {
    return () => h("span", { "aria-hidden": "true", ...attrs, "data-slot": "skeleton" });
  },
  inheritAttrs: false,
});

export const SkeletonFade = defineComponent({
  name: "SkeletonFade",
  setup(_, { slots, attrs }) {
    return () =>
      h("div", { "aria-hidden": "true", ...attrs, "data-slot": "skeleton-fade" }, slots.default?.());
  },
  inheritAttrs: false,
});
