import type { JSX } from '@solidjs/web'
import { createSignal, For, Show } from 'solid-js'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
} from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandInputWrapper,
  CommandItem,
  CommandItemIcon,
  CommandItemText,
  CommandList,
  CommandPage,
  CommandSeparator,
  CommandShortcut,
  createCommandController,
} from '#/components/ui/command'
import { Kbd } from '#/components/ui/kbd'
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'

import { Group } from '../demo-group'

function SmallIcon(props: { children: JSX.Element }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  )
}

const FileIcon = () => (
  <SmallIcon>
    <path d="M4.5 2.5h5l3 3v8a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
    <path d="M9.5 2.5v3h3" />
  </SmallIcon>
)

const GearIcon = () => (
  <SmallIcon>
    <circle cx="8" cy="8" r="2.25" />
    <path d="M8 2.25v1.5M8 12.25v1.5M2.25 8h1.5M12.25 8h1.5M3.9 3.9l1.1 1.1M11 11l1.1 1.1M12.1 3.9 11 5M5 11l-1.1 1.1" />
  </SmallIcon>
)

const MoonIcon = () => (
  <SmallIcon>
    <path d="M12.8 9.9A5.25 5.25 0 0 1 6.1 3.2a5.25 5.25 0 1 0 6.7 6.7Z" />
  </SmallIcon>
)

const UsersIcon = () => (
  <SmallIcon>
    <circle cx="6.25" cy="5.75" r="2" />
    <path d="M2.75 12.5a3.5 3.5 0 0 1 7 0" />
    <circle cx="11" cy="6.25" r="1.5" />
    <path d="M10.75 9.25a2.75 2.75 0 0 1 2.75 2.75" />
  </SmallIcon>
)

const TerminalIcon = () => (
  <SmallIcon>
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <path d="m4.75 6.5 2 1.75-2 1.75M8.25 10h3" />
  </SmallIcon>
)

const quickActions = [
  {
    value: 'new-file',
    label: 'New document',
    keywords: ['create', 'file'],
    icon: PlusIcon,
    shortcut: 'mod+n',
  },
  {
    value: 'open-terminal',
    label: 'Toggle terminal',
    keywords: ['console', 'shell'],
    icon: TerminalIcon,
    shortcut: 'mod+j',
  },
  {
    value: 'export-csv',
    label: 'Export report',
    keywords: ['download', 'csv'],
    icon: DownloadIcon,
  },
]

const workspaceActions = [
  {
    value: 'project-settings',
    label: 'Workspace settings',
    keywords: ['preferences', 'config'],
    icon: GearIcon,
    shortcut: 'mod+,',
  },
  {
    value: 'invite-members',
    label: 'Invite team members',
    keywords: ['users', 'people'],
    icon: UsersIcon,
  },
  {
    value: 'billing-archive',
    label: 'Archived invoices',
    icon: FileIcon,
    disabled: true,
  },
]

const themes = [
  { value: 'theme-light', label: 'Light' },
  { value: 'theme-dark', label: 'Dark' },
  { value: 'theme-system', label: 'System' },
]

const teams = [
  { value: 'team-design', label: 'Design Systems' },
  { value: 'team-core', label: 'Core Engineering' },
  { value: 'team-docs', label: 'Developer Docs' },
]

export function CommandDemo() {
  const [lastAction, setLastAction] = createSignal<string | null>(null)
  const [paletteOpen, setPaletteOpen] = createSignal(false)
  const [paletteResult, setPaletteResult] = createSignal<string | null>(null)
  const [pages, setPages] = createSignal<string[]>([])
  const [pageAction, setPageAction] = createSignal<string | null>(null)
  const pageController = createCommandController()

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Inline command panel">
        <div class="flex w-full max-w-[440px] flex-col gap-2">
          <Command onAction={(value) => setLastAction(value)}>
            <CommandInputWrapper>
              <CommandInput
                aria-label="Search inline commands"
                placeholder="Type a command or search…"
              />
            </CommandInputWrapper>
            <CommandEmpty>No matching commands.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandGroupLabel>Quick actions</CommandGroupLabel>
                <For each={quickActions}>
                  {(item) => (
                    <CommandItem
                      value={item.value}
                      label={item.label}
                      keywords={item.keywords}
                      shortcut={item.shortcut}
                    >
                      <CommandItemIcon>
                        <item.icon />
                      </CommandItemIcon>
                      <CommandItemText />
                      {item.shortcut ? <CommandShortcut /> : null}
                    </CommandItem>
                  )}
                </For>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandGroupLabel>Workspace</CommandGroupLabel>
                <For each={workspaceActions}>
                  {(item) => (
                    <CommandItem
                      value={item.value}
                      label={item.label}
                      keywords={item.keywords}
                      shortcut={item.shortcut}
                      disabled={item.disabled}
                    >
                      <CommandItemIcon>
                        <item.icon />
                      </CommandItemIcon>
                      <CommandItemText />
                      {item.shortcut ? <CommandShortcut /> : null}
                    </CommandItem>
                  )}
                </For>
              </CommandGroup>
            </CommandList>
            <CommandFooter>
              <span class="inline-flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>Navigate</span>
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Kbd>↵</Kbd>
                <span>Run</span>
                <Kbd>Esc</Kbd>
                <span>Clear</span>
              </span>
            </CommandFooter>
          </Command>
          <p class="text-[11px] text-faint">
            Last action:{' '}
            <span class="font-mono text-secondary">{lastAction() ?? '—'}</span>
          </p>
        </div>
      </Group>

      <Group label="Nested pages & sub-views">
        <div class="flex w-full max-w-[440px] flex-col gap-2">
          <Command
            controller={pageController}
            pages={pages()}
            onPagesChange={setPages}
            onAction={(value) => {
              if (value === 'back') {
                pageController.pop()
                return
              }
              setPageAction(value)
            }}
          >
            <CommandInputWrapper>
              <Show when={pages().length > 0}>
                <div data-slot="command-breadcrumbs">
                  <For each={pages()}>
                    {(page) => (
                      <span data-slot="command-breadcrumb">{page}</span>
                    )}
                  </For>
                </div>
              </Show>
              <CommandInput
                aria-label="Search workspace pages"
                placeholder={
                  pages().length > 0
                    ? 'Filter options (Backspace to go back)…'
                    : 'Choose a section…'
                }
              />
            </CommandInputWrapper>
            <CommandEmpty>No matching options.</CommandEmpty>
            <CommandList>
              <CommandPage>
                <CommandGroup>
                  <CommandGroupLabel>Preferences</CommandGroupLabel>
                  <CommandItem value="theme" page="Theme">
                    <CommandItemIcon>
                      <MoonIcon />
                    </CommandItemIcon>
                    <CommandItemText>Change theme</CommandItemText>
                    <ChevronRightIcon class="ml-auto size-3.5 text-faint" />
                  </CommandItem>
                  <CommandItem value="teams" page="Team">
                    <CommandItemIcon>
                      <UsersIcon />
                    </CommandItemIcon>
                    <CommandItemText>Switch team</CommandItemText>
                    <ChevronRightIcon class="ml-auto size-3.5 text-faint" />
                  </CommandItem>
                </CommandGroup>
              </CommandPage>

              <CommandPage value="Theme">
                <CommandGroup>
                  <CommandGroupLabel>Color scheme</CommandGroupLabel>
                  <For each={themes}>
                    {(theme) => (
                      <CommandItem value={theme.value} label={theme.label}>
                        <CommandItemText />
                      </CommandItem>
                    )}
                  </For>
                </CommandGroup>
              </CommandPage>

              <CommandPage value="Team">
                <CommandGroup>
                  <CommandGroupLabel>Teams</CommandGroupLabel>
                  <For each={teams}>
                    {(team) => (
                      <CommandItem value={team.value} label={team.label}>
                        <CommandItemText />
                      </CommandItem>
                    )}
                  </For>
                </CommandGroup>
              </CommandPage>

              <Show when={pages().length > 0}>
                <CommandSeparator />
                <CommandItem value="back" label="Go back">
                  <CommandItemIcon mirror>
                    <ArrowLeftIcon />
                  </CommandItemIcon>
                  <CommandItemText>Go back</CommandItemText>
                  <CommandShortcut shortcut="Backspace" />
                </CommandItem>
              </Show>
            </CommandList>
          </Command>
          <p class="text-[11px] text-faint">
            Selected:{' '}
            <span class="font-mono text-secondary">{pageAction() ?? '—'}</span>
          </p>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Command palette dialog">
          <div class="flex flex-wrap items-center gap-3">
            <Dialog open={paletteOpen()} onOpenChange={setPaletteOpen}>
              <DialogTrigger
                shortcut="mod+k"
                render={(triggerProps) => (
                  <Button
                    {...triggerProps}
                    variant="outline"
                    icon={<SearchIcon />}
                  >
                    <span>Open command palette</span>
                    <Kbd shortcut="mod+k" aria-hidden="true" class="ml-2" />
                  </Button>
                )}
              />
              <DialogBackdrop />
              <DialogContent fit>
                <DialogTitle
                  render={(titleProps) => (
                    <h3 {...titleProps} class="sr-only" />
                  )}
                >
                  Command palette
                </DialogTitle>
                <Command
                  onAction={(value) => {
                    setPaletteResult(value)
                    setPaletteOpen(false)
                  }}
                >
                  <CommandInputWrapper>
                    <CommandInput
                      aria-label="Command palette search"
                      placeholder="Jump to a command…"
                    />
                  </CommandInputWrapper>
                  <CommandEmpty>No commands found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandGroupLabel>Suggestions</CommandGroupLabel>
                      <For each={quickActions}>
                        {(item) => (
                          <CommandItem
                            value={item.value}
                            label={item.label}
                            keywords={item.keywords}
                          >
                            <CommandItemIcon>
                              <item.icon />
                            </CommandItemIcon>
                            <CommandItemText />
                            {item.shortcut ? (
                              <CommandShortcut shortcut={item.shortcut} />
                            ) : null}
                          </CommandItem>
                        )}
                      </For>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandGroupLabel>Workspace</CommandGroupLabel>
                      <For each={workspaceActions}>
                        {(item) => (
                          <CommandItem
                            value={item.value}
                            label={item.label}
                            keywords={item.keywords}
                            disabled={item.disabled}
                          >
                            <CommandItemIcon>
                              <item.icon />
                            </CommandItemIcon>
                            <CommandItemText />
                          </CommandItem>
                        )}
                      </For>
                    </CommandGroup>
                  </CommandList>
                  <CommandFooter>
                    <span>Press Esc to dismiss</span>
                    <span class="inline-flex items-center gap-1.5">
                      <Kbd>↵</Kbd>
                      <span>Select</span>
                    </span>
                  </CommandFooter>
                </Command>
              </DialogContent>
            </Dialog>

            <Show when={paletteResult()}>
              {(res) => (
                <span class="text-[12px] text-faint">
                  Ran{' '}
                  <span class="font-mono text-secondary">{res()}</span>
                </span>
              )}
            </Show>
          </div>
        </Group>
      </div>
    </div>
  )
}
