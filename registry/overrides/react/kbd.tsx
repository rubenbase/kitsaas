import { formatShortcut } from "@ui-sdk/core";
import { useEffect, useState, type ComponentProps } from "react";

import "./kbd.css";

/**
 * Kbd, a port of opencode's Keybind (`@opencode/ui/keybind`) with shadcn's
 * part names: a key cap for a keyboard shortcut.
 *
 *   <Kbd>Esc</Kbd>
 *   <Kbd shortcut="mod+k" />            // "⌘K" on Mac, "Ctrl+K" elsewhere
 *   <KbdGroup shortcut="mod+shift+p" /> // one cap per key
 *
 * `shortcut` takes ui-sdk's syntax (`mod` is Command on Apple platforms,
 * Control elsewhere) and is formatted with ui-sdk's `formatShortcut`. The
 * first render uses the non-Apple form, so server and client match, and the
 * keys switch to the user's platform after mount. A Kbd is display only:
 * inside a control, pass `aria-hidden` and set `aria-keyshortcuts` on it.
 */

export type KbdVariant = "neutral" | "ghost" | "outline";

function useShortcutText(shortcut: string | undefined) {
  const [text, setText] = useState(() => (shortcut ? formatShortcut(shortcut, false) : ""));
  useEffect(() => {
    setText(shortcut ? formatShortcut(shortcut) : "");
  }, [shortcut]);
  return text;
}

export type KbdProps = ComponentProps<"kbd"> & {
  /** Keys in ui-sdk's syntax, like `mod+k`; replaces children. */
  shortcut?: string;
  /** Defaults to `neutral`. */
  variant?: KbdVariant;
};

export function Kbd({ shortcut, variant = "neutral", children, ...props }: KbdProps) {
  const text = useShortcutText(shortcut);

  return (
    <kbd {...props} data-slot="kbd" data-variant={variant}>
      {shortcut ? text : children}
    </kbd>
  );
}

export type KbdGroupProps = ComponentProps<"kbd"> & {
  /** Keys like `mod+shift+p`, rendered as one Kbd each; replaces children. */
  shortcut?: string;
  /** The variant of the Kbds made from `shortcut`. */
  variant?: KbdVariant;
};

/** A key combination: Kbds side by side, kept left to right when built from `shortcut`. */
export function KbdGroup({ shortcut, variant, children, dir, ...props }: KbdGroupProps) {
  return (
    <kbd {...props} data-slot="kbd-group" dir={dir ?? (shortcut ? "ltr" : undefined)}>
      {shortcut
        ? shortcut.split("+").map((key, i) => <Kbd key={i} shortcut={key} variant={variant} />)
        : children}
    </kbd>
  );
}
