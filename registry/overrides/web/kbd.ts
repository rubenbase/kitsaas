import { formatShortcut } from "@ui-sdk/core";

import "./kbd.css";

/**
 * Kbd, a port of opencode's Keybind (`@opencode/ui/keybind`) with shadcn's
 * part names: a key cap for a keyboard shortcut. There is no behaviour, so
 * there is no component to register: spread the attrs on a <kbd>; `kbd.css`
 * does the rest.
 *
 *   <kbd {...kbdAttrs()}>Esc</kbd>
 *
 * For a platform-aware shortcut (`mod` is ⌘ on Apple platforms, Ctrl
 * elsewhere), `applyKbd(el, { shortcut: "mod+k" })` fills one cap and
 * `applyKbdGroup(el, { shortcut: "mod+shift+p" })` fills one cap per key,
 * with ui-sdk's `formatShortcut`. A Kbd is display only: inside a control,
 * add `aria-hidden` and set `aria-keyshortcuts` on the control.
 */

export type KbdVariant = "neutral" | "ghost" | "outline";

export type KbdOptions = { variant?: KbdVariant; shortcut?: string };

export function kbdAttrs(options: Pick<KbdOptions, "variant"> = {}) {
  return { "data-slot": "kbd", "data-variant": options.variant ?? "neutral" } as const;
}

export function kbdGroupAttrs() {
  return { "data-slot": "kbd-group" } as const;
}

/** One cap's text for a shortcut: "⌘K" on Apple platforms, "Ctrl+K" elsewhere. */
export function kbdText(shortcut: string, apple?: boolean) {
  return formatShortcut(shortcut, apple);
}

/** One label per key, for a group: ["⌘", "K"] or ["Ctrl", "K"]. */
export function kbdKeys(shortcut: string, apple?: boolean) {
  return shortcut.split("+").map((key) => formatShortcut(key, apple));
}

/** Applies `kbdAttrs()` to an existing <kbd>, and its text when given `shortcut`. */
export function applyKbd(el: HTMLElement, options: KbdOptions = {}) {
  for (const [key, value] of Object.entries(kbdAttrs(options))) el.setAttribute(key, value);
  if (options.shortcut) el.textContent = kbdText(options.shortcut);
  return el;
}

/** Applies `kbdGroupAttrs()`; with `shortcut`, replaces its children with one cap per key. */
export function applyKbdGroup(el: HTMLElement, options: KbdOptions = {}) {
  for (const [key, value] of Object.entries(kbdGroupAttrs())) el.setAttribute(key, value);
  if (options.shortcut) {
    el.setAttribute("dir", "ltr");
    el.replaceChildren(
      ...kbdKeys(options.shortcut).map((text) => {
        const key = applyKbd(el.ownerDocument.createElement("kbd"), { variant: options.variant });
        key.textContent = text;
        return key;
      }),
    );
  }
  return el;
}
