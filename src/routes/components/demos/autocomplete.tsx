import { createSignal, For } from 'solid-js'

import { SearchIcon } from '#/components/icons'
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteControl,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteItemIcon,
  AutocompleteItemText,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
} from '#/components/ui/autocomplete'

import { Group } from '../demo-group'

const cities = [
  'Amsterdam',
  'Barcelona',
  'Berlin',
  'Copenhagen',
  'Dublin',
  'Lisbon',
  'London',
  'Madrid',
  'Paris',
  'Prague',
  'Seoul',
  'Stockholm',
  'Tokyo',
  'Zurich',
]

const docGroups = [
  {
    label: 'Recent searches',
    items: [
      { value: 'solid signals', keywords: ['reactivity', 'state'] },
      { value: 'css anchor positioning', keywords: ['popover', 'floating'] },
      { value: 'aria combobox pattern', keywords: ['accessibility', 'a11y'] },
    ],
  },
  {
    label: 'Popular guides',
    items: [
      { value: 'dark mode tokens', keywords: ['theme', 'color-scheme'] },
      { value: 'keyboard navigation', keywords: ['shortcuts', 'focus'] },
      { value: 'form validation', keywords: ['field', 'error'] },
    ],
  },
]

const languages = [
  { value: 'TypeScript', hint: 'Typed JS' },
  { value: 'Rust', hint: 'Systems' },
  { value: 'Go', hint: 'Cloud' },
  { value: 'Python', hint: 'Scripting' },
  { value: 'Swift', hint: 'Apple' },
  { value: 'Zig', hint: 'Low-level', disabled: true },
]

function SparkleIcon() {
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
      <path d="M8 2.5 9.4 6.6 13.5 8 9.4 9.4 8 13.5 6.6 9.4 2.5 8 6.6 6.6 8 2.5Z" />
    </svg>
  )
}

export function AutocompleteDemo() {
  const [city, setCity] = createSignal('Lisbon')
  const [submitted, setSubmitted] = createSignal<string | null>(null)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Search with highlight & clear">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Autocomplete
            value={city()}
            onValueChange={setCity}
            onSubmit={(val) => setSubmitted(val)}
            autoHighlight
          >
            <AutocompleteLabel>Destination city</AutocompleteLabel>
            <AutocompleteControl leadingIcon={<SearchIcon />}>
              <AutocompleteInput placeholder="Type a city…" />
              <AutocompleteClear aria-label="Clear city" />
              <AutocompleteTrigger aria-label="Show cities" />
            </AutocompleteControl>
            <AutocompleteContent>
              <AutocompleteStatus>
                {(state) =>
                  state.count > 0
                    ? `${state.count} ${state.count === 1 ? 'suggestion' : 'suggestions'}`
                    : ''
                }
              </AutocompleteStatus>
              <AutocompleteEmpty>No matching cities.</AutocompleteEmpty>
              <AutocompleteList>
                <For each={cities}>
                  {(name) => (
                    <AutocompleteItem value={name}>
                      <AutocompleteItemText />
                    </AutocompleteItem>
                  )}
                </For>
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
          <p class="text-[11px] text-faint">
            Value: <span class="font-mono text-secondary">{city() || '—'}</span>
            {submitted() ? ` · Submitted "${submitted()}"` : ''}
          </p>
        </div>
      </Group>

      <Group label="Open on focus & groups">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Autocomplete openOnFocus>
            <AutocompleteLabel>Search documentation</AutocompleteLabel>
            <AutocompleteControl leadingIcon={<SearchIcon />}>
              <AutocompleteInput type="search" placeholder="Focus to browse…" />
              <AutocompleteClear aria-label="Clear search" />
            </AutocompleteControl>
            <AutocompleteContent>
              <AutocompleteEmpty>No docs match your query.</AutocompleteEmpty>
              <AutocompleteList>
                <For each={docGroups}>
                  {(group, index) => (
                    <>
                      {index() > 0 ? <AutocompleteSeparator /> : null}
                      <AutocompleteGroup>
                        <AutocompleteGroupLabel>
                          {group.label}
                        </AutocompleteGroupLabel>
                        <For each={group.items}>
                          {(item) => (
                            <AutocompleteItem
                              value={item.value}
                              keywords={item.keywords}
                            >
                              <AutocompleteItemIcon>
                                <SparkleIcon />
                              </AutocompleteItemIcon>
                              <AutocompleteItemText />
                            </AutocompleteItem>
                          )}
                        </For>
                      </AutocompleteGroup>
                    </>
                  )}
                </For>
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
        </div>
      </Group>

      <Group label="Inline completion & disabled items">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Autocomplete inlineComplete loop={false}>
            <AutocompleteLabel>Primary language</AutocompleteLabel>
            <AutocompleteControl>
              <AutocompleteInput placeholder="Type “Ty” or “Ru”…" />
              <AutocompleteClear aria-label="Clear language" />
            </AutocompleteControl>
            <AutocompleteContent>
              <AutocompleteEmpty>No matching language.</AutocompleteEmpty>
              <AutocompleteList>
                <For each={languages}>
                  {(lang) => (
                    <AutocompleteItem
                      value={lang.value}
                      label={lang.value}
                      disabled={lang.disabled}
                    >
                      <AutocompleteItemText />
                      <span class="ml-auto text-[11px] text-faint">
                        {lang.disabled ? 'Unavailable' : lang.hint}
                      </span>
                    </AutocompleteItem>
                  )}
                </For>
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
          <p class="text-[11px] text-faint">
            Press Right Arrow or End to accept inline completion.
          </p>
        </div>
      </Group>

      <Group label="Sizes & states">
        <div class="flex w-[280px] max-w-full flex-col gap-3">
          <Autocomplete items={cities}>
            <AutocompleteControl appearance="small">
              <AutocompleteInput
                aria-label="Small autocomplete"
                placeholder="Small (24px)"
              />
              <AutocompleteTrigger aria-label="Show options" />
            </AutocompleteControl>
            <AutocompleteContent>
              <AutocompleteList />
            </AutocompleteContent>
          </Autocomplete>

          <Autocomplete items={cities}>
            <AutocompleteControl appearance="large" surface="layer-1">
              <AutocompleteInput
                aria-label="Large autocomplete"
                placeholder="Large (32px, layer-1)"
              />
              <AutocompleteTrigger aria-label="Show options" />
            </AutocompleteControl>
            <AutocompleteContent>
              <AutocompleteList />
            </AutocompleteContent>
          </Autocomplete>

          <Autocomplete defaultValue="Invalid entry">
            <AutocompleteControl invalid>
              <AutocompleteInput aria-label="Invalid autocomplete" invalid />
              <AutocompleteClear aria-label="Clear invalid input" />
            </AutocompleteControl>
          </Autocomplete>

          <Autocomplete disabled defaultValue="Amsterdam">
            <AutocompleteControl disabled>
              <AutocompleteInput aria-label="Disabled autocomplete" />
              <AutocompleteTrigger aria-label="Show options" />
            </AutocompleteControl>
          </Autocomplete>
        </div>
      </Group>
    </div>
  )
}
