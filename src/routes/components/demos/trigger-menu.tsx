import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createTriggerMenuController,
  TriggerMenu,
  TriggerMenuContent,
  TriggerMenuEmpty,
  TriggerMenuGroup,
  TriggerMenuGroupLabel,
  TriggerMenuHint,
  TriggerMenuInput,
  TriggerMenuItem,
  TriggerMenuItemIcon,
  TriggerMenuList,
  TriggerMenuStatus,
  type TriggerDefinition,
  type TriggerMenuDataItem,
} from '#/components/ui/trigger-menu'

import { Group } from '../demo-group'

const people = [
  { value: 'hollis', label: 'Hollis Grant', role: 'Design' },
  { value: 'ines', label: 'Inès Moreau', role: 'Engineering' },
  { value: 'kofi', label: 'Kofi Mensah', role: 'Product' },
  { value: 'wren', label: 'Wren Takahashi', role: 'Infra' },
  { value: 'tomasz', label: 'Tomasz Wójcik', role: 'Away', disabled: true },
]

const channels = [
  { value: 'announcements', label: 'announcements' },
  { value: 'design-systems', label: 'design-systems' },
  { value: 'engineering', label: 'engineering' },
  { value: 'launches', label: 'launches' },
]

const slashCommands = [
  {
    value: 'status',
    label: 'status',
    arguments: [
      {
        name: 'state',
        hint: '<status>',
        required: true,
        items: ['available', 'busy', 'away'],
      },
      {
        name: 'until',
        hint: '[until]',
        items: ['30m', '1h', '4h', 'today'],
        allowCustomValue: false,
      },
    ],
  },
  {
    value: 'assign',
    label: 'assign',
    arguments: [
      {
        name: 'person',
        hint: '<person>',
        required: true,
        items: ['hollis', 'ines', 'kofi', 'wren'],
      },
    ],
  },
  {
    value: 'remind',
    label: 'remind',
    arguments: [{ name: 'note', hint: '<note>', required: true }],
  },
  { value: 'clear', label: 'clear' },
]

const composerTriggers: TriggerDefinition[] = [
  {
    char: '@',
    type: 'mention',
    items: people.map((p) => ({
      value: p.value,
      label: p.label,
      keywords: [p.role],
      disabled: p.disabled,
    })),
  },
  {
    char: '#',
    type: 'channel',
    items: channels,
  },
]

const personRole = new Map(people.map((p) => [p.value, p.role]))

function HashIcon() {
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
      <path d="M3 6h10M3 10h10M6.5 2.5 5.5 13.5M10.5 2.5l-1 11" />
    </svg>
  )
}

function SlashIcon() {
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
      <path d="M10.5 3 5.5 13" />
    </svg>
  )
}

export function TriggerMenuDemo() {
  const composerController = createTriggerMenuController()
  const [lastSelected, setLastSelected] = createSignal<string | null>(null)
  const [lastCommand, setLastCommand] = createSignal<string | null>(null)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Mentions (@) & channels (#)">
        <div class="flex w-full max-w-[380px] flex-col gap-2">
          <div class="flex items-center justify-between gap-2">
            <label
              for="trigger-composer"
              class="text-[13px] font-medium text-foreground"
            >
              Message
            </label>
            <div class="flex items-center gap-1">
              <Button
                size="small"
                variant="ghost"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => composerController.open({ trigger: '@' })}
              >
                @ Mention
              </Button>
              <Button
                size="small"
                variant="ghost"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => composerController.open({ trigger: '#' })}
              >
                # Channel
              </Button>
            </div>
          </div>

          <TriggerMenu
            controller={composerController}
            triggers={composerTriggers}
            onSelect={(value, details) => {
              setLastSelected(`${details.trigger}${value}`)
            }}
          >
            <TriggerMenuInput
              id="trigger-composer"
              placeholder="Type @ to mention someone or # for a channel…"
            />
            <div class="sr-only">
              <TriggerMenuStatus />
            </div>
            <TriggerMenuContent>
              <TriggerMenuEmpty>No matches found.</TriggerMenuEmpty>
              <TriggerMenuList>
                {(state) => (
                  <TriggerMenuGroup>
                    <TriggerMenuGroupLabel>
                      {state.trigger === '#' ? 'Channels' : 'People'}
                    </TriggerMenuGroupLabel>
                    <For each={state.items as TriggerMenuDataItem[]}>
                      {(item) => (
                        <TriggerMenuItem
                          value={item.value}
                          label={item.label}
                          disabled={item.disabled}
                        >
                          {state.trigger === '#' ? (
                            <TriggerMenuItemIcon>
                              <HashIcon />
                            </TriggerMenuItemIcon>
                          ) : (
                            <span
                              class="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-surface-2 text-[10px] font-medium text-secondary"
                              aria-hidden="true"
                            >
                              {item.label.slice(0, 1)}
                            </span>
                          )}
                          <span class="truncate">{item.label}</span>
                          {state.trigger === '@' && personRole.get(item.value) ? (
                            <span class="ml-auto text-[11px] text-faint">
                              {personRole.get(item.value)}
                            </span>
                          ) : null}
                        </TriggerMenuItem>
                      )}
                    </For>
                  </TriggerMenuGroup>
                )}
              </TriggerMenuList>
            </TriggerMenuContent>
          </TriggerMenu>

          <p class="text-[11px] text-faint">
            Last inserted:{' '}
            <span class="font-mono text-secondary">
              {lastSelected() ?? '—'}
            </span>
          </p>
        </div>
      </Group>

      <Group label="Slash commands (/) with arguments">
        <div class="flex w-full max-w-[380px] flex-col gap-2">
          <label
            for="trigger-slash"
            class="text-[13px] font-medium text-foreground"
          >
            Command input
          </label>

          <TriggerMenu
            triggers={[
              {
                char: '/',
                boundary: 'start',
                type: 'command',
                items: slashCommands,
              },
            ]}
            onSelect={(value, details) => {
              const args = Object.values(details.arguments).filter(Boolean)
              setLastCommand([`/${value}`, ...args].join(' '))
            }}
          >
            <TriggerMenuInput
              id="trigger-slash"
              placeholder="Start with / (try /status or /assign)…"
            />
            <TriggerMenuHint />
            <div class="sr-only">
              <TriggerMenuStatus />
            </div>
            <TriggerMenuContent>
              <TriggerMenuEmpty>No matching command.</TriggerMenuEmpty>
              <TriggerMenuList>
                {(state) => (
                  <TriggerMenuGroup>
                    <TriggerMenuGroupLabel>
                      {state.argument
                        ? `Argument: ${state.argument}`
                        : 'Commands'}
                    </TriggerMenuGroupLabel>
                    <For each={state.items as TriggerMenuDataItem[]}>
                      {(item) => (
                        <TriggerMenuItem value={item.value} label={item.label}>
                          {!state.argument ? (
                            <TriggerMenuItemIcon>
                              <SlashIcon />
                            </TriggerMenuItemIcon>
                          ) : null}
                          <span class="font-mono text-[12px]">
                            {item.label}
                          </span>
                        </TriggerMenuItem>
                      )}
                    </For>
                  </TriggerMenuGroup>
                )}
              </TriggerMenuList>
            </TriggerMenuContent>
          </TriggerMenu>

          <p class="text-[11px] text-faint">
            Tab accepts argument suggestions · Last command:{' '}
            <span class="font-mono text-secondary">
              {lastCommand() ?? '—'}
            </span>
          </p>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Single-line input mode">
          <div class="flex w-[320px] max-w-full flex-col gap-2">
            <label
              for="trigger-single-line"
              class="text-[13px] font-medium text-foreground"
            >
              Quick task title
            </label>
            <TriggerMenu
              triggers={[{ char: '@', items: people }]}
              autoHighlight={false}
              loop={false}
            >
              <TriggerMenuInput
                id="trigger-single-line"
                render={(inputProps) => <input {...inputProps} />}
                placeholder="Ship release notes with @…"
              />
              <div class="sr-only">
                <TriggerMenuStatus />
              </div>
              <TriggerMenuContent>
                <TriggerMenuEmpty>No people found.</TriggerMenuEmpty>
                <TriggerMenuList>
                  {(state) => (
                    <For each={state.items as TriggerMenuDataItem[]}>
                      {(item) => (
                        <TriggerMenuItem
                          value={item.value}
                          label={item.label}
                          disabled={item.disabled}
                        >
                          <span>{item.label}</span>
                          <span class="ml-auto font-mono text-[11px] text-faint">
                            @{item.value}
                          </span>
                        </TriggerMenuItem>
                      )}
                    </For>
                  )}
                </TriggerMenuList>
              </TriggerMenuContent>
            </TriggerMenu>
            <p class="text-[11px] text-faint">
              Uses <code class="font-mono">autoHighlight={'{false}'}</code> so
              Enter won&apos;t accidentally hijack form submit before pressing
              ArrowDown.
            </p>
          </div>
        </Group>
      </div>
    </div>
  )
}
