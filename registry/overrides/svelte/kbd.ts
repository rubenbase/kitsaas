import { formatShortcut } from "@ui-sdk/core";

import "./kbd.css";

/**
 * Kbd, a port of opencode's Keybind (`@opencode/ui/keybind`) with shadcn's
 * part names: a key cap for a keyboard shortcut. There is no behaviour, so
 * there is no component to register: spread the attrs on a <kbd>; `kbd.css`
 * does the rest.
 *
 *   <kbd {...kbdGroupAttrs()}>
 *     <kbd {...kbdAttrs()}>Ctrl</kbd>
 *     <kbd {...kbdAttrs()}>B</kbd>
 *   </kbd>
 *
 * For a platform-aware shortcut (`mod` is ⌘ on Apple platforms, Ctrl
 * elsewhere), render `kbdText("mod+k")` for one cap or `kbdKeys("mod+k")` for
 * one cap per key. Both use ui-sdk's `formatShortcut`; pass `apple = false`
 * during SSR and recompute in `onMount` so hydration matches. A Kbd is display
 * only: inside a control, add `aria-hidden` and set `aria-keyshortcuts`.
 */

export type KbdVariant = "neutral" | "ghost" | "outline";

export type KbdOptions = { variant?: KbdVariant };

export function kbdAttrs(options: KbdOptions = {}) {
  return { "data-slot": "kbd", "data-variant": options.variant ?? "neutral" } as const;
}

export function kbdGroupAttrs() {
  return { "data-slot": "kbd-group" } as const;
}

/** One cap's text for a shortcut: "⌘K" on Apple platforms, "Ctrl+K" elsewhere. */
export function kbdText(shortcut: string, apple?: boolean) {
  return formatShortcut(shortcut, apple);
}

/** One label per key, for a group: ["⌘", "K"] or ["Ctrl", "K"]. Render it `dir="ltr"`. */
export function kbdKeys(shortcut: string, apple?: boolean) {
  return shortcut.split("+").map((key) => formatShortcut(key, apple));
}
