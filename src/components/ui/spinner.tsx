import type { JSX } from "@solidjs/web";
import { usePart, usePrimitive } from "@ui-sdk/solid/primitive";
import { merge, omit } from "solid-js";

import { spinnerPrimitive } from "./spinner-primitive";

import "./spinner.css";

/**
 * Spinner, a port of opencode's Loader (`@opencode/ui`, `feedback/loader`), the
 * ring the console shows while something loads, with shadcn's name and
 * accessibility: a 16px <svg> with `role="status"` and `aria-label="Loading"`.
 *
 *   <Spinner />
 *   <Spinner aria-label="Loading invoices" class="size-6" />
 *
 * Size it with `width`/`height` (default 16, as upstream) or a class; colour it
 * with `color` (default --v2-icon-icon-muted).
 *
 * Inside something that already says it is busy, like a Button with
 * `aria-busy`, pass `aria-hidden="true"`: the spinner then drops its role and
 * label, so the button's name stays its own text.
 *
 *   <Button variant="loading" icon={<Spinner aria-hidden="true" />}>Saving</Button>
 *
 * Every spinner on screen turns in step, and one out of view pauses: the root
 * is a part of `spinnerPrimitive` (spinner-primitive.ts, on @ui-sdk/core), a
 * port of opencode's `syncSpinPhase`. Reduced motion stops the turn.
 */

export type SpinnerProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function Spinner(props: SpinnerProps) {
  const rest = omit(props, "width", "height", "role", "aria-label", "aria-hidden");
  const hidden = () => props["aria-hidden"] === "true";

  const handle = usePrimitive(spinnerPrimitive, () => ({}));

  const own = {
    get width() {
      return props.width ?? 16;
    },
    get height() {
      return props.height ?? 16;
    },
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    get role() {
      return hidden() ? undefined : (props.role ?? "status");
    },
    get "aria-label"() {
      return hidden() ? undefined : (props["aria-label"] ?? "Loading");
    },
    get "aria-hidden"() {
      return hidden() ? "true" : undefined;
    },
    get children() {
      return [
        <circle cx="8" cy="8" r="6" data-slot="spinner-track" stroke-width="2" />,
        <circle
          cx="8"
          cy="8"
          r="6"
          data-slot="spinner-indicator"
          pathLength="100"
          stroke-width="2"
          stroke-dasharray="33 67"
        />,
      ];
    },
  };

  return usePart(handle, "root", undefined, merge(rest, own) as never, "svg");
}
