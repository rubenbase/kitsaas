import type { JSX } from "@solidjs/web";
import { useShortcutHint } from "@ui-sdk/solid/shortcuts";
import { For, omit } from "solid-js";

import "./kbd.css";

/**
 * Kbd, a port of opencode's Keybind (`@opencode/ui/keybind`) with shadcn's
 * part names: a key cap for a keyboard shortcut, in prose, a tooltip, a
 * button or a footer hint ("Esc to close").
 *
 *   <Kbd>Esc</Kbd>
 *   <Kbd shortcut="mod+k" />            // one cap: "⌘K" on Mac, "Ctrl+K" elsewhere
 *   <KbdGroup shortcut="mod+shift+p" /> // one cap per key: ⌘ ⇧ P / Ctrl Shift P
 *   <KbdGroup><Kbd>Ctrl</Kbd><Kbd>B</Kbd></KbdGroup>
 *
 * `shortcut` takes ui-sdk's shortcut syntax (keys joined with `+`, `mod` for
 * Command on Apple platforms and Control elsewhere) and formats it with
 * ui-sdk's `useShortcutHint`, so the server and first client render match and
 * the keys switch to the user's platform after mount.
 *
 * A Kbd is display only. Inside a control, pass `aria-hidden="true"` and put
 * the shortcut on the control with `aria-keyshortcuts`; `useShortcutHint`
 * from `@ui-sdk/solid/shortcuts` gives the value, and `useShortcut` registers
 * the keys.
 */

export type KbdVariant = "neutral" | "ghost" | "outline";

export type KbdProps = JSX.HTMLAttributes<HTMLElement> & {
  /** Keys in ui-sdk's syntax, like `mod+k`; replaces children. */
  shortcut?: string;
  /** Defaults to `neutral`. */
  variant?: KbdVariant;
};

export function Kbd(props: KbdProps) {
  const rest = omit(props, "shortcut", "variant", "children");
  const hint = useShortcutHint(() => props.shortcut ?? "");

  return (
    <kbd {...rest} data-slot="kbd" data-variant={props.variant ?? "neutral"}>
      {props.shortcut ? hint.text() : props.children}
    </kbd>
  );
}

export type KbdGroupProps = JSX.HTMLAttributes<HTMLElement> & {
  /** Keys in ui-sdk's syntax, like `mod+shift+p`, rendered as one Kbd each; replaces children. */
  shortcut?: string;
  /** The variant of the Kbds made from `shortcut`. Defaults to `neutral`. */
  variant?: KbdVariant;
};

/**
 * A key combination: Kbds side by side, 2px apart. With `shortcut`, it keeps
 * the keys left to right on a right-to-left page, as ui-sdk's hint does.
 */
export function KbdGroup(props: KbdGroupProps) {
  const rest = omit(props, "shortcut", "variant", "children");

  return (
    <kbd {...rest} data-slot="kbd-group" dir={props.dir ?? (props.shortcut ? "ltr" : undefined)}>
      {props.shortcut ? (
        <For each={props.shortcut.split("+")}>
          {(key) => <Kbd shortcut={key} variant={props.variant} />}
        </For>
      ) : (
        props.children
      )}
    </kbd>
  );
}
