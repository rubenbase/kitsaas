import { For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createLocalStorage,
  createPreference,
  createSessionStorage,
  Preferences,
  usePreference,
} from '#/components/ui/preferences'

import { Group } from '../demo-group'

const viewPreference = createPreference({
  values: ['list', 'grid'] as const,
  defaultValue: 'list',
  attribute: 'data-view',
  storage: createLocalStorage('kitsaas-preferences-view'),
})

const densityPreference = createPreference({
  values: ['compact', 'comfortable', 'spacious'] as const,
  defaultValue: 'comfortable',
  attribute: 'data-density',
  storage: createLocalStorage('kitsaas-preferences-density'),
})

const codeSizePreference = createPreference({
  values: ['sm', 'md', 'lg'] as const,
  defaultValue: 'md',
  attribute: 'data-code-size',
  storage: createSessionStorage('kitsaas-preferences-code-size'),
})

const workspaceFiles = [
  { name: 'Q4 roadmap.md', meta: 'Updated 2h ago', size: '18 KB' },
  { name: 'Design tokens.css', meta: 'Updated yesterday', size: '24 KB' },
  { name: 'Release checklist.md', meta: 'Updated Oct 28', size: '12 KB' },
  { name: 'Component spec.pdf', meta: 'Updated Oct 24', size: '2.4 MB' },
]

export function PreferencesDemo() {
  const view = usePreference(viewPreference)
  const density = usePreference(densityPreference)
  const codeSize = usePreference(codeSizePreference)

  const resetAll = (event: MouseEvent) => {
    viewPreference.set('list', { reason: 'press', event })
    densityPreference.set('comfortable', { reason: 'press', event })
    codeSizePreference.set('md', { reason: 'press', event })
  }

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Persisted view & density preferences (localStorage)">
          <div class="flex w-full flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-wrap items-center gap-3">
                <div
                  class="flex items-center gap-1"
                  role="group"
                  aria-label="Layout view"
                >
                  <For each={['list', 'grid'] as const}>
                    {(option) => (
                      <Button
                        size="small"
                        variant={
                          view().value === option ? 'contrast' : 'outline'
                        }
                        aria-pressed={
                          view().value === option ? 'true' : 'false'
                        }
                        onClick={(event) =>
                          viewPreference.set(option, {
                            reason: 'press',
                            event,
                          })
                        }
                      >
                        {option === 'list' ? 'List' : 'Grid'}
                      </Button>
                    )}
                  </For>
                </div>

                <div
                  class="flex items-center gap-1"
                  role="group"
                  aria-label="Density"
                >
                  <For each={['compact', 'comfortable', 'spacious'] as const}>
                    {(option) => (
                      <Button
                        size="small"
                        variant={
                          density().value === option ? 'contrast' : 'outline'
                        }
                        aria-pressed={
                          density().value === option ? 'true' : 'false'
                        }
                        onClick={(event) =>
                          densityPreference.set(option, {
                            reason: 'press',
                            event,
                          })
                        }
                      >
                        {option[0].toUpperCase() + option.slice(1)}
                      </Button>
                    )}
                  </For>
                </div>
              </div>

              <Button size="small" variant="ghost-muted" onClick={resetAll}>
                Reset defaults
              </Button>
            </div>

            <Preferences preferences={[viewPreference, densityPreference]}>
              <ul
                data-slot="preferences-collection"
                aria-label="Workspace files"
              >
                <For each={workspaceFiles}>
                  {(file) => (
                    <li data-slot="preferences-item">
                      <div class="min-w-0">
                        <div class="truncate font-medium text-foreground">
                          {file.name}
                        </div>
                        <div class="text-[11px] text-faint">{file.meta}</div>
                      </div>
                      <span class="shrink-0 text-[12px] text-muted tabular-nums">
                        {file.size}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </Preferences>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted">
              <span>
                Applied attributes:{' '}
                <code class="font-mono text-foreground">
                  data-view="{view().value}"
                </code>{' '}
                <code class="font-mono text-foreground">
                  data-density="{density().value}"
                </code>
              </span>
              <span class="text-faint">Persisted across reloads</span>
            </div>
          </div>
        </Group>
      </div>

      <div class="lg:col-span-2">
        <Group label="Scoped session preference (sessionStorage)">
          <div class="flex w-full flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div
                class="flex items-center gap-1"
                role="group"
                aria-label="Code font size"
              >
                <For
                  each={[
                    { value: 'sm', label: 'Small (11px)' },
                    { value: 'md', label: 'Medium (12px)' },
                    { value: 'lg', label: 'Large (14px)' },
                  ] as const}
                >
                  {(option) => (
                    <Button
                      size="small"
                      variant={
                        codeSize().value === option.value
                          ? 'contrast'
                          : 'outline'
                      }
                      aria-pressed={
                        codeSize().value === option.value ? 'true' : 'false'
                      }
                      onClick={(event) =>
                        codeSizePreference.set(option.value, {
                          reason: 'press',
                          event,
                        })
                      }
                    >
                      {option.label}
                    </Button>
                  )}
                </For>
              </div>
              <code class="font-mono text-[11px] text-faint">
                data-code-size="{codeSize().value}"
              </code>
            </div>

            <Preferences preferences={[codeSizePreference]}>
              <pre
                data-slot="preferences-code"
                class="overflow-x-auto rounded-md border border-border-muted bg-background p-3 font-mono text-foreground"
              >
                {`const density = createPreference({
  values: ['compact', 'comfortable', 'spacious'],
  defaultValue: 'comfortable',
  attribute: 'data-density',
  storage: createLocalStorage('kitsaas-density'),
})`}
              </pre>
            </Preferences>
          </div>
        </Group>
      </div>
    </div>
  )
}
