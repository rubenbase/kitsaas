import { useShortcutHint } from "@ui-sdk/solid/shortcuts";

import { Button } from "#/components/ui/button";
import { Kbd, KbdGroup } from "#/components/ui/kbd";

import { Group } from "../demo-group";

export function KbdDemo() {
  const saveHint = useShortcutHint("mod+s");

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Variants">
        <div class="flex flex-wrap items-center gap-4">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>B</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="ghost">Ctrl</Kbd>
            <Kbd variant="ghost">B</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="outline">Ctrl</Kbd>
            <Kbd variant="outline">B</Kbd>
          </KbdGroup>
        </div>
      </Group>

      <Group
        label="Platform shortcut"
        description="`shortcut` formats ui-sdk keys for the visitor's platform: ⌘ on Mac, Ctrl elsewhere."
      >
        <div class="flex flex-wrap items-center gap-4">
          <Kbd shortcut="mod+k" />
          <KbdGroup shortcut="mod+shift+p" />
          <KbdGroup shortcut="alt+enter" variant="outline" />
        </div>
      </Group>

      <Group label="In a sentence">
        <p class="text-[13px] text-muted">
          Press <Kbd shortcut="mod+k" /> to search, or <Kbd>Esc</Kbd> to close the drawer.
        </p>
      </Group>

      <Group label="In a button">
        <Button variant="neutral" aria-keyshortcuts={saveHint.ariaKeyshortcuts()}>
          Save draft
          <Kbd aria-hidden="true" shortcut="mod+s" />
        </Button>
      </Group>

      <Group label="Footer hints">
        <div class="flex items-center gap-4 text-[11px] text-faint [font-weight:530]">
          <span class="flex items-center gap-2">
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            Navigate
          </span>
          <span class="flex items-center gap-2">
            <Kbd>Esc</Kbd>
            Close
          </span>
        </div>
      </Group>
    </div>
  );
}
