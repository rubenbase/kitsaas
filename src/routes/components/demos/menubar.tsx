import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from '#/components/ui/menu'
import { createMenubarController, Menubar } from '#/components/ui/menubar'

import { Group } from '../demo-group'

const recentDocs = ['Q4 roadmap.md', 'Release checklist.md', 'Design tokens.css']
const exportFormats = ['PDF', 'Markdown', 'HTML']
const appearances = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export function MenubarDemo() {
  const [lastAction, setLastAction] = createSignal('None yet')
  const [showRuler, setShowRuler] = createSignal(false)
  const [showWordCount, setShowWordCount] = createSignal(true)
  const [appearance, setAppearance] = createSignal('system')
  const controller = createMenubarController()

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Application menubar">
          <div class="flex w-full flex-col gap-3">
            <div class="flex flex-wrap items-center gap-3">
              <Menubar aria-label="Application" controller={controller}>
                <Menu onAction={(value) => setLastAction(`File → ${value}`)}>
                  <MenuTrigger>File</MenuTrigger>
                  <MenuContent sideOffset={6}>
                    <MenuItem value="New document" shortcut="mod+n">
                      New Document
                    </MenuItem>
                    <MenuItem value="Open" shortcut="mod+o">
                      Open…
                    </MenuItem>
                    <MenuSub>
                      <MenuSubTrigger>Open Recent</MenuSubTrigger>
                      <MenuSubContent sideOffset={4}>
                        <For each={recentDocs}>
                          {(name) => <MenuItem value={name}>{name}</MenuItem>}
                        </For>
                      </MenuSubContent>
                    </MenuSub>
                    <MenuSeparator />
                    <MenuSub>
                      <MenuSubTrigger>Export</MenuSubTrigger>
                      <MenuSubContent sideOffset={4}>
                        <For each={exportFormats}>
                          {(format) => (
                            <MenuItem value={`Export as ${format}`}>
                              {format}
                            </MenuItem>
                          )}
                        </For>
                      </MenuSubContent>
                    </MenuSub>
                    <MenuItem value="Print" shortcut="mod+p">
                      Print…
                    </MenuItem>
                  </MenuContent>
                </Menu>

                <Menu onAction={(value) => setLastAction(`Edit → ${value}`)}>
                  <MenuTrigger>Edit</MenuTrigger>
                  <MenuContent sideOffset={6}>
                    <MenuItem value="Undo" shortcut="mod+z" disabled>
                      Undo
                    </MenuItem>
                    <MenuItem value="Redo" shortcut="mod+shift+z">
                      Redo
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem value="Cut" shortcut="mod+x">
                      Cut
                    </MenuItem>
                    <MenuItem value="Copy" shortcut="mod+c">
                      Copy
                    </MenuItem>
                    <MenuItem value="Paste" shortcut="mod+v">
                      Paste
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem value="Delete" variant="critical">
                      Delete
                    </MenuItem>
                  </MenuContent>
                </Menu>

                <Menu>
                  <MenuTrigger>View</MenuTrigger>
                  <MenuContent sideOffset={6}>
                    <MenuCheckboxItem
                      value="ruler"
                      checked={showRuler()}
                      onCheckedChange={(checked) => {
                        setShowRuler(checked)
                        setLastAction(`View → Ruler ${checked ? 'on' : 'off'}`)
                      }}
                    >
                      Show Ruler
                    </MenuCheckboxItem>
                    <MenuCheckboxItem
                      value="word-count"
                      checked={showWordCount()}
                      onCheckedChange={(checked) => {
                        setShowWordCount(checked)
                        setLastAction(
                          `View → Word count ${checked ? 'on' : 'off'}`,
                        )
                      }}
                    >
                      Show Word Count
                    </MenuCheckboxItem>
                    <MenuSeparator />
                    <MenuGroup>
                      <MenuGroupLabel>Appearance</MenuGroupLabel>
                      <MenuRadioGroup
                        value={appearance()}
                        onValueChange={(value) => {
                          setAppearance(value)
                          setLastAction(`View → ${value} appearance`)
                        }}
                      >
                        <For each={appearances}>
                          {(item) => (
                            <MenuRadioItem value={item.value}>
                              {item.label}
                            </MenuRadioItem>
                          )}
                        </For>
                      </MenuRadioGroup>
                    </MenuGroup>
                  </MenuContent>
                </Menu>

                <Menu onAction={(value) => setLastAction(`Help → ${value}`)}>
                  <MenuTrigger>Help</MenuTrigger>
                  <MenuContent sideOffset={6}>
                    <MenuItem value="Documentation">Documentation</MenuItem>
                    <MenuItem value="Keyboard shortcuts" shortcut="mod+/">
                      Keyboard Shortcuts
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem value="About Kitsaas">About Kitsaas</MenuItem>
                  </MenuContent>
                </Menu>
              </Menubar>

              <Button
                variant="outline"
                size="small"
                onClick={() => controller.focus()}
              >
                Focus bar
              </Button>
            </div>

            <p class="text-[12px] text-muted tabular-nums">
              Last action: <span class="text-foreground">{lastAction()}</span> ·
              Ruler: {showRuler() ? 'on' : 'off'} · Word count:{' '}
              {showWordCount() ? 'on' : 'off'} · Appearance: {appearance()}
            </p>
          </div>
        </Group>
      </div>

      <Group label="Vertical orientation">
        <Menubar aria-label="Mailbox actions" orientation="vertical">
          <For each={['Inbox', 'Drafts', 'Archive']}>
            {(label) => (
              <Menu onAction={(value) => setLastAction(`${label} → ${value}`)}>
                <MenuTrigger>{label}</MenuTrigger>
                <MenuContent sideOffset={6}>
                  <MenuItem value={`Open ${label}`}>Open {label}</MenuItem>
                  <MenuItem value="Mark all read">Mark all as read</MenuItem>
                  <MenuSeparator />
                  <MenuItem value="Settings">Folder settings</MenuItem>
                </MenuContent>
              </Menu>
            )}
          </For>
        </Menubar>
      </Group>

      <Group label="Disabled states">
        <div class="flex flex-col gap-2.5">
          <Menubar aria-label="Partial disabled">
            <Menu>
              <MenuTrigger>Workspace</MenuTrigger>
              <MenuContent sideOffset={6}>
                <MenuItem value="switch">Switch workspace</MenuItem>
                <MenuItem value="members">Members</MenuItem>
              </MenuContent>
            </Menu>
            <Menu>
              <MenuTrigger disabled>Billing</MenuTrigger>
              <MenuContent sideOffset={6}>
                <MenuItem value="plan">Plan</MenuItem>
              </MenuContent>
            </Menu>
            <Menu>
              <MenuTrigger>Settings</MenuTrigger>
              <MenuContent sideOffset={6}>
                <MenuItem value="general">General</MenuItem>
              </MenuContent>
            </Menu>
          </Menubar>

          <Menubar aria-label="Disabled menubar" disabled>
            <Menu>
              <MenuTrigger>File</MenuTrigger>
              <MenuContent sideOffset={6}>
                <MenuItem value="new">New</MenuItem>
              </MenuContent>
            </Menu>
            <Menu>
              <MenuTrigger>Edit</MenuTrigger>
              <MenuContent sideOffset={6}>
                <MenuItem value="undo">Undo</MenuItem>
              </MenuContent>
            </Menu>
          </Menubar>
        </div>
      </Group>
    </div>
  )
}
