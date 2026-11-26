import { useEffect, useRef, type ComponentProps } from "react";

import { syncSpinPhase } from "./spinner-primitive";

import "./spinner.css";

/**
 * Spinner, a port of opencode's Loader (`@opencode/ui`, `feedback/loader`): a
 * 16px ring with `role="status"` and `aria-label="Loading"`. Size it with
 * `width`/`height` or a class; colour it with `color`. Inside something that
 * already says it is busy (a Button with `aria-busy`), pass
 * `aria-hidden="true"` and it drops its role and label. Reduced motion stops
 * the turn.
 *
 * Every spinner on screen turns in step and one out of view pauses:
 * `syncSpinPhase` (spinner-primitive.ts, on @ui-sdk/core) runs on mount.
 */

export type SpinnerProps = ComponentProps<"svg">;

export function Spinner({
  width = 16,
  height = 16,
  role = "status",
  "aria-label": label = "Loading",
  "aria-hidden": ariaHidden,
  ...props
}: SpinnerProps) {
  const hidden = ariaHidden === true || ariaHidden === "true";
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => (ref.current ? syncSpinPhase(ref.current) : undefined), []);

  return (
    <svg
      {...props}
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-slot="spinner"
      role={hidden ? undefined : role}
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden ? true : undefined}
    >
      <circle cx="8" cy="8" r="6" data-slot="spinner-track" strokeWidth="2" />
      <circle
        cx="8"
        cy="8"
        r="6"
        data-slot="spinner-indicator"
        pathLength={100}
        strokeWidth="2"
        strokeDasharray="33 67"
      />
    </svg>
  );
}
