import { syncSpinPhase } from "./spinner-primitive";

import "./spinner.css";

/**
 * Spinner, a port of opencode's Loader (`@opencode/ui`, `feedback/loader`): a
 * 16px ring with `role="status"` and `aria-label="Loading"`. There is no
 * behaviour, so there is no component to register: spread the attrs on an
 * <svg> and its two circles; `spinner.css` does the rest. Pass
 * `{ hidden: true }` inside something already marked busy (a Button with
 * `aria-busy`). Reduced motion stops the turn.
 *
 *   <svg {...spinnerAttrs()}>
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

const SVG_NS = "http://www.w3.org/2000/svg";

function setAll(el: Element, attrs: { [key: string]: string | number | undefined }) {
  for (const [key, value] of Object.entries(attrs)) {
    if (key !== "xmlns" && value !== undefined) el.setAttribute(key, String(value));
  }
  return el;
}

/** Builds the spinner <svg> with both circles (for web components / vanilla DOM). */
export function createSpinner(options: SpinnerOptions = {}, doc: Document = document) {
  const svg = setAll(doc.createElementNS(SVG_NS, "svg"), spinnerAttrs(options)) as SVGSVGElement;
  svg.append(
    setAll(doc.createElementNS(SVG_NS, "circle"), spinnerTrackAttrs),
    setAll(doc.createElementNS(SVG_NS, "circle"), spinnerIndicatorAttrs),
  );
  return svg;
}

/**
 * Keeps a spinner in the shared phase and pauses it offscreen, so every
 * spinner on screen turns in step. Returns the cleanup; call it on removal.
 */
export function syncSpinner(el: Element): () => void {
  return syncSpinPhase(el);
}
