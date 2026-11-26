import { createSignal, For } from 'solid-js'

import { PlusIcon } from '#/components/icons'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxContent,
  ComboboxControl,
  ComboboxCreate,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIcon,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxSelectAll,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxValueIcon,
} from '#/components/ui/combobox'

import { Group } from '../demo-group'

const frameworks = [
  { value: 'solidstart', label: 'SolidStart' },
  { value: 'next', label: 'Next.js' },
  { value: 'astro', label: 'Astro' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'qwik', label: 'Qwik City', disabled: true },
]

const tagOptions = [
  'Design',
  'Frontend',
  'Accessibility',
  'Performance',
  'TypeScript',
  'Systems',
  'Documentation',
  'Security',
]

function GlobeIcon() {
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
      <circle cx="8" cy="8" r="5.5" />
      <path d="M2.5 8h11M8 2.5a8.5 8.5 0 0 1 0 11M8 2.5a8.5 8.5 0 0 0 0 11" />
    </svg>
  )
}

const regionGroups = [
  {
    label: 'North America',
    items: [
      { value: 'us-east', label: 'US East (Virginia)', keywords: ['iad'] },
      { value: 'us-west', label: 'US West (Oregon)', keywords: ['pdx'] },
    ],
  },
  {
    label: 'Europe',
    items: [
      { value: 'eu-central', label: 'EU Central (Frankfurt)', keywords: ['fra'] },
      { value: 'eu-west', label: 'EU West (Dublin)', keywords: ['dub'] },
    ],
  },
  {
    label: 'Asia Pacific',
    items: [
      { value: 'ap-northeast', label: 'Tokyo', keywords: ['hnd', 'japan'] },
      {
        value: 'ap-southeast',
        label: 'Singapore',
        keywords: ['sin'],
        disabled: true,
      },
    ],
  },
]

const regionLabels = new Map(
  regionGroups.flatMap((g) => g.items.map((item) => [item.value, item.label])),
)

export function ComboboxDemo() {
  const [framework, setFramework] = createSignal<string | null>('solidstart')
  const [selectedTags, setSelectedTags] = createSignal<string[]>([
    'Design',
    'Accessibility',
  ])
  const [customLabels, setCustomLabels] = createSignal<string[]>([
    'v2-tokens',
    'ui-sdk',
    'release-blocker',
  ])
  const [activeLabels, setActiveLabels] = createSignal<string[]>(['v2-tokens'])

  const frameworkLabel = (value: string) =>
    frameworks.find((f) => f.value === value)?.label ?? value

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Searchable select with clear">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Combobox
            value={framework()}
            onValueChange={setFramework}
            itemToLabel={frameworkLabel}
            autoHighlight
          >
            <ComboboxLabel>Framework</ComboboxLabel>
            <ComboboxControl>
              <ComboboxInput placeholder="Select a framework…" />
              <ComboboxClear aria-label="Clear framework" />
              <ComboboxTrigger aria-label="Show frameworks" />
            </ComboboxControl>
            <ComboboxContent>
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
              <ComboboxList>
                <For each={frameworks}>
                  {(fw) => (
                    <ComboboxItem
                      value={fw.value}
                      label={fw.label}
                      disabled={fw.disabled}
                    >
                      <ComboboxItemText />
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  )}
                </For>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <p class="text-[11px] text-faint">
            Selected:{' '}
            <span class="font-mono text-secondary">
              {framework() ?? 'none'}
            </span>
          </p>
        </div>
      </Group>

      <Group label="Multi-select with chips & select all">
        <div class="flex w-[320px] max-w-full flex-col gap-2">
          <Combobox
            multiple
            value={selectedTags()}
            onValueChange={setSelectedTags}
          >
            <ComboboxLabel>Topics</ComboboxLabel>
            <ComboboxChips class="w-full">
              <ComboboxValue>
                {(state) => (
                  <For each={state.value as string[]}>
                    {(tag) => (
                      <ComboboxChip value={tag}>
                        {tag}
                        <ComboboxChipRemove aria-label={`Remove ${tag}`} />
                      </ComboboxChip>
                    )}
                  </For>
                )}
              </ComboboxValue>
              <ComboboxInput placeholder="Add topics…" />
            </ComboboxChips>
            <ComboboxContent>
              <ComboboxEmpty>No matching topics.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxSelectAll>
                  {(state) => (
                    <>
                      <span>
                        {state.checked ? 'Deselect all' : 'Select all matching'}
                      </span>
                      {state.checked ? (
                        <span class="ml-auto text-[11px] text-faint">All</span>
                      ) : null}
                    </>
                  )}
                </ComboboxSelectAll>
                <ComboboxSeparator />
                <For each={tagOptions}>
                  {(tag) => (
                    <ComboboxItem value={tag}>
                      <ComboboxItemText />
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  )}
                </For>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <p class="text-[11px] text-faint">
            {selectedTags().length} selected · Backspace removes the last chip.
          </p>
        </div>
      </Group>

      <Group label="Groups, icons & keywords">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Combobox
            defaultValue="eu-central"
            itemToLabel={(val) => regionLabels.get(val) ?? val}
          >
            <ComboboxLabel>Deployment region</ComboboxLabel>
            <ComboboxControl>
              <ComboboxValueIcon />
              <ComboboxInput placeholder="Search region or airport code…" />
              <ComboboxClear aria-label="Clear region" />
              <ComboboxTrigger aria-label="Show regions" />
            </ComboboxControl>
            <ComboboxContent>
              <ComboboxEmpty>No regions match your search.</ComboboxEmpty>
              <ComboboxList>
                <For each={regionGroups}>
                  {(group, index) => (
                    <>
                      {index() > 0 ? <ComboboxSeparator /> : null}
                      <ComboboxGroup>
                        <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                        <For each={group.items}>
                          {(region) => (
                            <ComboboxItem
                              value={region.value}
                              label={region.label}
                              keywords={region.keywords}
                              disabled={region.disabled}
                            >
                              <ComboboxItemIcon>
                                <GlobeIcon />
                              </ComboboxItemIcon>
                              <ComboboxItemText />
                              <ComboboxItemIndicator />
                            </ComboboxItem>
                          )}
                        </For>
                      </ComboboxGroup>
                    </>
                  )}
                </For>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </Group>

      <Group label="Creatable tags & states">
        <div class="flex w-[320px] max-w-full flex-col gap-3">
          <Combobox
            multiple
            value={activeLabels()}
            onValueChange={setActiveLabels}
          >
            <ComboboxLabel>Issue labels (create new)</ComboboxLabel>
            <ComboboxChips class="w-full">
              <ComboboxValue>
                {(state) => (
                  <For each={state.value as string[]}>
                    {(label) => (
                      <ComboboxChip value={label}>
                        {label}
                        <ComboboxChipRemove aria-label={`Remove ${label}`} />
                      </ComboboxChip>
                    )}
                  </For>
                )}
              </ComboboxValue>
              <ComboboxInput placeholder="Type to search or create…" />
            </ComboboxChips>
            <ComboboxContent>
              <ComboboxList>
                <For each={customLabels()}>
                  {(label) => (
                    <ComboboxItem value={label}>
                      <ComboboxItemText />
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  )}
                </For>
                <ComboboxCreate
                  onCreate={(query) => {
                    const trimmed = query.trim()
                    if (!trimmed) return
                    setCustomLabels((prev) =>
                      prev.includes(trimmed) ? prev : [...prev, trimmed],
                    )
                    setActiveLabels((prev) =>
                      prev.includes(trimmed) ? prev : [...prev, trimmed],
                    )
                  }}
                >
                  {(state) => (
                    <>
                      <PlusIcon class="size-3.5" />
                      <span>Create &ldquo;{state.query}&rdquo;</span>
                    </>
                  )}
                </ComboboxCreate>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <div class="flex flex-col gap-2 pt-1">
            <Combobox defaultValue="astro" itemToLabel={frameworkLabel}>
              <ComboboxControl invalid class="w-full">
                <ComboboxInput aria-label="Invalid combobox" invalid />
                <ComboboxTrigger aria-label="Show options" />
              </ComboboxControl>
            </Combobox>
            <Combobox disabled defaultValue="next" itemToLabel={frameworkLabel}>
              <ComboboxControl disabled class="w-full">
                <ComboboxInput aria-label="Disabled combobox" />
                <ComboboxTrigger aria-label="Show options" />
              </ComboboxControl>
            </Combobox>
          </div>
        </div>
      </Group>
    </div>
  )
}
