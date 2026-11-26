import {
  TriggerMenu,
  TriggerMenuContent,
  TriggerMenuEmpty,
  TriggerMenuItem,
  TriggerMenuList,
  type TriggerMenuDataItem,
} from '@ui-sdk/solid/trigger-menu'
import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import {
  createTokenInputController,
  TokenInput,
  TokenInputEditor,
  TokenInputToken,
  TokenInputTokenRemove,
  type TokenDeletion,
  type TokenInputValue,
} from '#/components/ui/token-input'

import { Group } from '../demo-group'

const people = [
  { value: 'hollis', label: 'Hollis Grant' },
  { value: 'ines', label: 'Inès Moreau' },
  { value: 'kofi', label: 'Kofi Mensah' },
  { value: 'wren', label: 'Wren Takahashi' },
  { value: 'tomasz', label: 'Tomasz Wójcik' },
]

const tagSuggestions = ['design-system', 'solid-2', 'accessibility', 'tokens', 'release']

const initialTags: TokenInputValue = [
  { type: 'tag', value: 'design-system', label: '#design-system' },
  ' ',
  { type: 'tag', value: 'solid-2', label: '#solid-2' },
  ' ',
]

const initialEmails: TokenInputValue = [
  { type: 'email', value: 'hollis@kitsaas.dev', label: 'hollis@kitsaas.dev' },
  ' ',
  { type: 'email', value: 'ines@kitsaas.dev', label: 'ines@kitsaas.dev' },
  ' ',
]

const initialMentionDraft: TokenInputValue = [
  'Ping ',
  { type: 'mention', value: 'wren', label: '@Wren Takahashi' },
  ' about the release checklist.',
]

export function TokenInputDemo() {
  const tagsController = createTokenInputController()
  const emailController = createTokenInputController()
  const [deletionMode, setDeletionMode] = createSignal<TokenDeletion>('select')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Tags">
        <div class="flex w-full max-w-[420px] flex-col gap-2">
          <Field>
            <FieldLabel>Issue labels</FieldLabel>
            <TokenInput
              controller={tagsController}
              defaultValue={initialTags}
              tokenDeletion="select"
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor placeholder="Add tags or notes…" />
            </TokenInput>
            <FieldDescription>
              Press Backspace once to highlight a chip, twice to delete it.
            </FieldDescription>
          </Field>
          <div class="flex flex-wrap gap-1.5">
            <For each={tagSuggestions}>
              {(tag) => (
                <Button
                  size="small"
                  variant="outline"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() =>
                    tagsController.insert(
                      [
                        { type: 'tag', value: tag, label: `#${tag}` },
                        ' ',
                      ],
                      { at: 'end' },
                    )
                  }
                >
                  + {tag}
                </Button>
              )}
            </For>
          </div>
        </div>
      </Group>

      <Group label="Email recipients">
        <div class="flex w-full max-w-[420px] flex-col gap-2">
          <Field>
            <FieldLabel>To</FieldLabel>
            <TokenInput
              controller={emailController}
              defaultValue={initialEmails}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor placeholder="Add recipients…" />
            </TokenInput>
          </Field>
          <div class="flex flex-wrap gap-1.5">
            <Button
              size="small"
              variant="ghost-muted"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                emailController.insert(
                  [
                    {
                      type: 'email',
                      value: 'kofi@kitsaas.dev',
                      label: 'kofi@kitsaas.dev',
                    },
                    ' ',
                  ],
                  { at: 'end' },
                )
              }
            >
              + kofi@kitsaas.dev
            </Button>
            <Button
              size="small"
              variant="ghost-muted"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                emailController.insert(
                  [
                    {
                      type: 'email',
                      value: 'tomasz@kitsaas.dev',
                      label: 'tomasz@kitsaas.dev',
                    },
                    ' ',
                  ],
                  { at: 'end' },
                )
              }
            >
              + tomasz@kitsaas.dev
            </Button>
          </div>
        </div>
      </Group>

      <Group label="Mentions (@ trigger)">
        <div class="w-full max-w-[420px]">
          <Field>
            <FieldLabel>Comment</FieldLabel>
            <TokenInput
              defaultValue={initialMentionDraft}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor
                class="min-h-[64px]"
                placeholder="Type @ to mention a teammate…"
              />
              <TriggerMenu
                triggers={[
                  {
                    char: '@',
                    type: 'mention',
                    items: people.map((person) => ({
                      value: person.value,
                      label: `@${person.label}`,
                    })),
                  },
                ]}
              >
                <TriggerMenuContent class="z-[60] min-w-[180px] rounded-[6px] border-0 bg-surface p-1 shadow-floating">
                  <TriggerMenuEmpty class="px-2.5 py-1.5 text-[12px] text-faint">
                    No matching teammate
                  </TriggerMenuEmpty>
                  <TriggerMenuList class="flex flex-col gap-0.5">
                    {(state) => (
                      <For each={state.items as TriggerMenuDataItem[]}>
                        {(item) => (
                          <TriggerMenuItem
                            value={item.value}
                            label={item.label}
                            class="flex h-7 cursor-default items-center rounded-[4px] px-2.5 text-[13px] text-foreground select-none data-[highlighted]:bg-[var(--v2-overlay-simple-overlay-hover)]"
                          >
                            {item.label}
                          </TriggerMenuItem>
                        )}
                      </For>
                    )}
                  </TriggerMenuList>
                </TriggerMenuContent>
              </TriggerMenu>
            </TokenInput>
            <FieldDescription>
              Type @ followed by a name and press Enter to insert a mention chip.
            </FieldDescription>
          </Field>
        </div>
      </Group>

      <Group label="Backspace behavior">
        <div class="flex w-full max-w-[420px] flex-col gap-2">
          <div class="flex items-center gap-1.5">
            <For each={['whole', 'select', 'revert'] as TokenDeletion[]}>
              {(mode) => (
                <Button
                  size="small"
                  variant={deletionMode() === mode ? 'contrast' : 'neutral'}
                  onClick={() => setDeletionMode(mode)}
                >
                  {mode}
                </Button>
              )}
            </For>
          </div>
          <Field>
            <FieldLabel>Prompt ({deletionMode()})</FieldLabel>
            <TokenInput
              tokenDeletion={deletionMode()}
              defaultValue={[
                'Review ',
                { type: 'file', value: 'src/theme.css', label: 'theme.css' },
                ' and ',
                { type: 'file', value: 'src/components/ui/input.css', label: 'input.css' },
              ]}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor />
            </TokenInput>
          </Field>
        </div>
      </Group>

      <Group label="Invalid, disabled & read-only">
        <div class="flex w-full max-w-[420px] flex-col gap-3">
          <Field invalid>
            <FieldLabel>Invalid token</FieldLabel>
            <TokenInput
              defaultValue={[
                {
                  type: 'mention',
                  value: 'unknown',
                  label: '@alex',
                  status: 'unresolved',
                },
                ' ',
              ]}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor invalid />
            </TokenInput>
            <FieldError>One or more recipients could not be resolved.</FieldError>
          </Field>

          <Field disabled>
            <FieldLabel>Disabled</FieldLabel>
            <TokenInput
              disabled
              defaultValue={[
                { type: 'tag', value: 'locked', label: '#locked' },
                ' ',
                { type: 'tag', value: 'v2', label: '#v2' },
              ]}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor />
            </TokenInput>
          </Field>

          <Field>
            <FieldLabel>Read-only (layer-1)</FieldLabel>
            <TokenInput
              readOnly
              defaultValue={[
                'Assigned to ',
                { type: 'mention', value: 'hollis', label: '@Hollis Grant' },
              ]}
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor surface="layer-1" />
            </TokenInput>
          </Field>
        </div>
      </Group>
    </div>
  )
}
