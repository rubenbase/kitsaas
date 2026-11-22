import "./empty.css";

/**
 * Empty, opencode console's empty list state with shadcn's part names. There
 * is no behaviour, so there is no component to register: mark plain elements
 * with `data-slot`; `empty.css` does the rest. Add `role="status"` to the root
 * when it replaces a list after a user action.
 *
 *   <div data-slot="empty">
 *     <div data-slot="empty-header">
 *       <div {...emptyMediaAttrs({ variant: "icon" })}><svg>…</svg></div>
 *       <p data-slot="empty-title">No API keys yet</p>
 *       <p data-slot="empty-description">Create a key to call the API.</p>
 *     </div>
 *     <div data-slot="empty-content"><button>…</button></div>
 *   </div>
 */

export type EmptyMediaVariant = "default" | "icon";

export function emptyMediaAttrs(options: { variant?: EmptyMediaVariant } = {}) {
  return {
    "data-slot": "empty-media",
    "data-variant": options.variant ?? "default",
  } as const;
}

/** Applies `emptyMediaAttrs()` to an existing element (for web components / vanilla DOM). */
export function applyEmptyMedia(el: HTMLElement, options: { variant?: EmptyMediaVariant } = {}) {
  for (const [key, value] of Object.entries(emptyMediaAttrs(options))) el.setAttribute(key, value);
  return el;
}
