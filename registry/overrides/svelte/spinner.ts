import { syncSpinPhase } from "./spinner-primitive";

import "./spinner.css";

/**
 * Spinner, a port of opencode's Loader (`@opencode/ui`, `feedback/loader`): a
 * 16px ring with `role="status"` and `aria-label="Loading"`. There is no
 * behaviour, so there is no component to register: spread the attrs on an
 * <svg> and its two circles; `spinner.css` does the rest. Pass
 * `{ hidden: true }` inside something already marked busy (a Button with
 * `aria-busy`). Reduced motion stops the turn. Add `use:spinPhase` so every
 * spinner on screen turns in step and one out of view pauses.
 *
 *   <svg {...spinnerAttrs()} use:spinPhase>
 *     <circle {...spinnerTrackAttrs} />
 *     <circle {...spinnerIndicatorAttrs} />
 *   </svg>
 */

export type SpinnerOptions = {
  /** Accessible label. Defaults to "Loading". */
  label?: string;
  /** Inside something already marked busy: no role or label, `aria-hidden`. */
  hidden?: boolean;
  /** Width and height in px. Defaults to 16. */
  size?: number;
};

export function spinnerAttrs(options: SpinnerOptions = {}) {
  const size = options.size ?? 16;
  const a11y = options.hidden
    ? { "aria-hidden": "true" }
    : { role: "status", "aria-label": options.label ?? "Loading" };

  return {
    ...a11y,
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "data-slot": "spinner",
  } as const;
}

export const spinnerTrackAttrs = {
  cx: 8,
  cy: 8,
  r: 6,
  "data-slot": "spinner-track",
  "stroke-width": 2,
} as const;

export const spinnerIndicatorAttrs = {
  cx: 8,
  cy: 8,
  r: 6,
  "data-slot": "spinner-indicator",
  pathLength: 100,
  "stroke-width": 2,
  "stroke-dasharray": "33 67",
} as const;

/** Svelte action: keeps the spinner in the shared phase, pauses it offscreen. */
export function spinPhase(node: Element) {
  return { destroy: syncSpinPhase(node) };
}
