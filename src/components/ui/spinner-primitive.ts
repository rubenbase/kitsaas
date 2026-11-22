import { definePrimitive } from "@ui-sdk/core";

/**
 * Spinner's phase sync, on `@ui-sdk/core` so every framework binding shares
 * it. A port of opencode's `syncSpinPhase` (`@opencode/ui`,
 * packages/ui/src/hooks/spin-phase.ts, MIT), which its Loader uses as a ref.
 *
 * Every spinner on screen turns in step: each infinite CSS animation inside a
 * bound element starts at the document timeline's origin, so two spinners
 * that mount at different times still line up. A spinner scrolled or clipped
 * out of view, under `display: none` or sized to nothing gets
 * `data-offscreen`, which spinner.css uses to pause it; coming back, it
 * resumes and re-pins to the shared phase.
 *
 * Upstream's only Solid-specific part is `onCleanup`; here `syncSpinPhase`
 * returns its cleanup, so it is a slot's `bind` and also works on its own (a
 * Svelte action, a plain element).
 */

let resize: ResizeObserver | undefined;
let visibility: IntersectionObserver | undefined;

// Created on first use, so server rendering never touches these globals.
function observers() {
  // ResizeObserver delivers after style and layout but before paint, so a
  // spinner that mounts or leaves `display: none` (which restarts its CSS
  // animation) paints its first frame already in phase.
  resize ??=
    typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver((entries) => entries.forEach((entry) => pinVisible(entry.target)));

  // `visibility: hidden` and `opacity: 0` still count as visible.
  visibility ??=
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) =>
          entries.forEach((entry) => {
            entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
            pinVisible(entry.target);
          }),
        );

  return { resize, visibility };
}

/** Keeps `el`'s looping animations in the shared phase. Returns the cleanup. */
export function syncSpinPhase(el: Element): () => void {
  const { resize, visibility } = observers();
  const restart = () => pinVisible(el);

  resize?.observe(el);
  visibility?.observe(el);
  // Turning reduced motion back off restarts the animation without resizing anything.
  el.addEventListener("animationstart", restart);

  return () => {
    resize?.unobserve(el);
    visibility?.unobserve(el);
    el.removeEventListener("animationstart", restart);
  };
}

// Setting the start time of a paused CSS animation resumes it and makes it
// ignore `animation-play-state` from then on, so a paused spinner is left
// alone until it is visible. `getAnimations` flushes style, so a spinner that
// has just lost `data-offscreen` is running again by the time it is pinned.
function pinVisible(el: Element) {
  if (el.hasAttribute("data-offscreen")) return;

  pinSpinPhase(el);
}

// Starting every infinite loop at the document timeline's origin puts all
// instances of one animation in phase.
export function pinSpinPhase(el: Element) {
  el.getAnimations({ subtree: true })
    .filter(
      (animation) =>
        animation.effect?.getTiming().iterations === Infinity && animation.startTime !== 0,
    )
    .forEach((animation) => {
      animation.startTime = 0;
    });
}

/** The Spinner root as a ui-sdk part: binding it runs `syncSpinPhase`. */
export const spinnerPrimitive = definePrimitive({
  name: "spinner",
  options: {},
  state: () => ({}),
  api: () => ({}),
  slots: (slot) => ({
    root: slot({
      // Spinner keeps spinner.css's slot, so every binding styles it unchanged.
      attrs: () => ({ "data-slot": "spinner" }),
      bind: (el) => syncSpinPhase(el),
    }),
  }),
});
