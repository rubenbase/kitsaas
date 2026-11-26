import "./skeleton.css";

/**
 * Skeleton, opencode console's loading placeholder. There is no behaviour, so
 * there is no component to register: spread `skeletonAttrs()` on an empty
 * <span> and give it a width; `skeleton.css` does the rest. It is decorative,
 * so mark the loading region with `aria-busy="true"` instead.
 *
 *   <span {...skeletonAttrs()} class="w-[120px]"></span>
 *   <div {...skeletonFadeAttrs()}>…rows…</div>
 */

export function skeletonAttrs() {
  return { "data-slot": "skeleton", "aria-hidden": "true" } as const;
}

/** For a wrapper around a stack of skeleton rows: fades out its last 9rem. */
export function skeletonFadeAttrs() {
  return { "data-slot": "skeleton-fade", "aria-hidden": "true" } as const;
}

/** Applies `skeletonAttrs()` to an existing element (for web components / vanilla DOM). */
export function applySkeleton(el: HTMLElement) {
  for (const [key, value] of Object.entries(skeletonAttrs())) el.setAttribute(key, value);
  return el;
}
