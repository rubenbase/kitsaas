import { createSignal, For } from 'solid-js'

import { DownloadIcon, PlusIcon, SearchIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '#/components/ui/menu'

import { Group } from '../demo-group'

export function MenuDemo() {
  const [wordWrap, setWordWrap] = createSignal(true)
  const [minimap, setMinimap] = createSignal(false)
  const [theme, setTheme] = createSignal('system')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Items with icons">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Open file
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuItem value="new">
              <MenuItemIcon>
                <PlusIcon />
              </MenuItemIcon>
              New file
            </MenuItem>
            <MenuItem value="open">
              <MenuItemIcon>
                <SearchIcon />
              </MenuItemIcon>
              Open file
            </MenuItem>
            <MenuItem value="download">
              <MenuItemIcon>
                <DownloadIcon />
              </MenuItemIcon>
              Download
            </MenuItem>
            <MenuItem value="share">Share…</MenuItem>
          </MenuContent>
        </Menu>
      </Group>

      <Group label="Shortcuts">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                File
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuItem value="new-tab" shortcut="mod+t">
              New tab
            </MenuItem>
            <MenuItem value="new-window" shortcut="mod+n">
              New window
            </MenuItem>
            <MenuItem value="open" shortcut="mod+o">
              Open…
            </MenuItem>
            <MenuSeparator />
            <MenuItem value="save" shortcut="mod+s">
              Save
            </MenuItem>
            <MenuItem value="save-as" shortcut="mod+shift+s">
              Save as…
            </MenuItem>
          </MenuContent>
        </Menu>
      </Group>

      <Group label="Checkbox item">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                View
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuCheckboxItem
              value="word-wrap"
              checked={wordWrap()}
              onCheckedChange={setWordWrap}
            >
              Word wrap
            </MenuCheckboxItem>
            <MenuCheckboxItem
              value="minimap"
              checked={minimap()}
              onCheckedChange={setMinimap}
            >
              Minimap
            </MenuCheckboxItem>
          </MenuContent>
        </Menu>
      </Group>

      <Group label="Radio group">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Theme
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuGroup>
              <MenuGroupLabel>Appearance</MenuGroupLabel>
              <MenuRadioGroup
                value={theme()}
                onValueChange={(value) => setTheme(value)}
              >
                <For
                  each={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ]}
                >
                  {(option) => (
                    <MenuRadioItem value={option.value}>
                      {option.label}
                    </MenuRadioItem>
                  )}
                </For>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuContent>
        </Menu>
      </Group>

      <Group label="Disabled item">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Document
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuItem value="undo" shortcut="mod+z" disabled>
              Undo
            </MenuItem>
            <MenuItem value="redo" shortcut="mod+shift+z">
              Redo
            </MenuItem>
            <MenuSeparator />
            <MenuItem value="delete" variant="critical">
              Delete
            </MenuItem>
            <MenuItem value="print" disabled>
              Print…
            </MenuItem>
          </MenuContent>
        </Menu>
      </Group>

      <Group label="Submenu">
        <Menu>
          <MenuTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Edit
              </Button>
            )}
          />
          <MenuContent sideOffset={6}>
            <MenuItem value="undo" shortcut="mod+z">
              Undo
            </MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>Find</MenuSubTrigger>
              <MenuSubContent sideOffset={6}>
                <MenuItem value="find" shortcut="mod+f">
                  Find…
                </MenuItem>
                <MenuItem value="find-next" shortcut="mod+g">
                  Find next
                </MenuItem>
                <MenuItem value="find-previous" shortcut="mod+shift+g">
                  Find previous
                </MenuItem>
              </MenuSubContent>
            </MenuSub>
            <MenuSub>
              <MenuSubTrigger>Transform</MenuSubTrigger>
              <MenuSubContent sideOffset={6}>
                <MenuItem value="uppercase">Uppercase</MenuItem>
                <MenuItem value="lowercase">Lowercase</MenuItem>
                <MenuItem value="trim">Trim whitespace</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>
      </Group>
    </div>
  )
}
