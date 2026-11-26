import "./alert.css";

/**
 * Alert, Kitsaas's take on shadcn's Alert: a static, inline callout. ui-sdk
 * has no alert and the only behaviour is its ARIA role, so there is no
 * component to register: spread `alertAttrs()` on a plain element and mark
 * its children with `data-slot`; `alert.css` does the rest.
 *
 *   <div {...alertAttrs({ variant: "warning", role: "status" })}>
 *     <svg>…</svg>                                   (optional leading icon)
 *     <div data-slot="alert-title">Low balance</div>
 *     <div data-slot="alert-description">Add credits to avoid interruptions.</div>
 *     <div data-slot="alert-action"><button>Add credits</button></div>
 *   </div>
 *
 * `role` defaults to `alert`; pass `status` or `note` for a callout that is
 * on the page from the first paint and is not urgent.
 */

export type AlertVariant = "neutral" | "info" | "success" | "warning" | "danger";

export type AlertRole = "alert" | "status" | "note";

export function alertAttrs(
  options: { variant?: AlertVariant; role?: AlertRole } = {},
) {
  return {
    role: options.role ?? "alert",
    "data-slot": "alert",
    "data-variant": options.variant ?? "neutral",
  } as const;
}


/** Applies `alertAttrs()` to an existing element (for web components / vanilla DOM). */
export function applyAlert(
  el: HTMLElement,
  options: { variant?: AlertVariant; role?: AlertRole } = {},
) {
  for (const [key, value] of Object.entries(alertAttrs(options))) el.setAttribute(key, value)
  return el
}