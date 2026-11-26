import { defineComponent, h, onMounted, onUnmounted, ref } from "vue";

import { syncSpinPhase } from "./spinner-primitive";

import "./spinner.css";

/**
 * Spinner, a port of opencode's Loader (`@opencode/ui`, `feedback/loader`): a
 * 16px ring with `role="status"` and `aria-label="Loading"`. Size it with
 * `width`/`height` or a class; colour it with `color`. Inside something that
 * already says it is busy (a Button with `aria-busy`), pass
 * `aria-hidden="true"` and it drops its role and label.
 */

export const Spinner = defineComponent({
  name: "Spinner",
  props: {
    width: { type: [Number, String], default: 16 },
    height: { type: [Number, String], default: 16 },
  },
  setup(props, { attrs }) {
    // Every spinner turns in step and one out of view pauses (spinner-primitive.ts).
    const el = ref<SVGSVGElement>();
    let stop: (() => void) | undefined;
    onMounted(() => {
      if (el.value) stop = syncSpinPhase(el.value);
    });
    onUnmounted(() => stop?.());

    return () => {
      const hidden = attrs["aria-hidden"] === true || attrs["aria-hidden"] === "true";

      return h(
        "svg",
        {
          ...attrs,
          ref: el,
          width: props.width,
          height: props.height,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "data-slot": "spinner",
          role: hidden ? undefined : (attrs.role ?? "status"),
          "aria-label": hidden ? undefined : (attrs["aria-label"] ?? "Loading"),
          "aria-hidden": hidden ? "true" : undefined,
        },
        [
          h("circle", { cx: 8, cy: 8, r: 6, "data-slot": "spinner-track", "stroke-width": 2 }),
          h("circle", {
            cx: 8,
            cy: 8,
            r: 6,
            "data-slot": "spinner-indicator",
            pathLength: 100,
            "stroke-width": 2,
            "stroke-dasharray": "33 67",
          }),
        ],
      );
    };
  },
  inheritAttrs: false,
});
