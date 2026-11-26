import type { JSX } from '@solidjs/web'
import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '#/components/ui/field'
import {
  createListboxController,
  Listbox,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIcon,
  ListboxItemIndicator,
  ListboxSeparator,
} from '#/components/ui/listbox'

import { Group } from '../demo-group'

function ListIcon(props: { children: JSX.Element }) {
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

const InboxIcon = () => (
  <ListIcon>
    <rect x="2.25" y="3.25" width="11.5" height="9.5" rx="1.5" />
    <path d="M2.5 5.5 8 9l5.5-3.5" />
  </ListIcon>
)

const StarIcon = () => (
  <ListIcon>
    <path d="m8 2.25 1.75 3.6 3.95.55-2.85 2.75.7 3.9L8 11.2l-3.55 1.85.7-3.9L2.3 6.4l3.95-.55L8 2.25Z" />
  </ListIcon>
)

const FolderIcon = () => (
  <ListIcon>
    <path d="M2.25 4.5a1.25 1.25 0 0 1 1.25-1.25h3l1.25 1.5h4.75a1.25 1.25 0 0 1 1.25 1.25v5.5a1.25 1.25 0 0 1-1.25 1.25h-9a1.25 1.25 0 0 1-1.25-1.25v-7Z" />
  </ListIcon>
)

const views = [
  { value: 'inbox', label: 'Inbox', icon: InboxIcon },
  { value: 'starred', label: 'Starred', icon: StarIcon },
  { value: 'archive', label: 'Archive', icon: FolderIcon },
  { value: 'drafts', label: 'Drafts', icon: FolderIcon, disabled: true },
]

const notifications = [
  { value: 'comments', label: 'Comments & replies' },
  { value: 'mentions', label: 'Direct mentions' },
  { value: 'deploys', label: 'Deployment status' },
  { value: 'security', label: 'Security alerts' },
  { value: 'billing', label: 'Billing receipts' },
]

const modelGroups = [
  {
    label: 'Reasoning',
    items: [
      { value: 'o3', label: 'Reasoning Pro' },
      { value: 'o4-mini', label: 'Reasoning Fast' },
    ],
  },
  {
    label: 'General purpose',
    items: [
      { value: 'claude', label: 'Assistant Sonnet' },
      { value: 'gemini', label: 'Assistant Flash' },
      { value: 'legacy', label: 'Legacy v1', disabled: true },
    ],
  },
]

const sizes = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL', disabled: true },
]

export function ListboxDemo() {
  const [selectedView, setSelectedView] = createSignal<string | null>('inbox')
  const [selectedTopics, setSelectedTopics] = createSignal<string[]>([
    'mentions',
    'security',
  ])
  const multiController = createListboxController<string, true>()

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single selection with icons">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Field>
            <FieldLabel>Mailbox view</FieldLabel>
            <Listbox
              value={selectedView()}
              onValueChange={setSelectedView}
              deselectable
            >
              <For each={views}>
                {(view) => (
                  <ListboxItem value={view.value} disabled={view.disabled}>
                    <ListboxItemIcon>
                      <view.icon />
                    </ListboxItemIcon>
                    <span>{view.label}</span>
                    <ListboxItemIndicator />
                  </ListboxItem>
                )}
              </For>
            </Listbox>
            <FieldDescription>
              Selected: {selectedView() ?? 'none'} · Click active item to clear.
            </FieldDescription>
          </Field>
        </div>
      </Group>

      <Group label="Multiple selection & controller">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <div class="flex items-center gap-1.5">
            <Button
              size="small"
              variant="outline"
              onClick={() => multiController.selectAll()}
            >
              Select all
            </Button>
            <Button
              size="small"
              variant="ghost"
              onClick={() => multiController.clear()}
            >
              Clear
            </Button>
            <span class="ml-auto text-[11px] text-faint">
              {selectedTopics().length} selected
            </span>
          </div>
          <Listbox
            multiple
            controller={multiController}
            value={selectedTopics()}
            onValueChange={setSelectedTopics}
            aria-label="Notification preferences"
          >
            <For each={notifications}>
              {(item) => (
                <ListboxItem value={item.value}>
                  <span>{item.label}</span>
                  <ListboxItemIndicator />
                </ListboxItem>
              )}
            </For>
          </Listbox>
          <p class="text-[11px] text-faint">
            Shift+click selects a range; Cmd/Ctrl+A toggles all.
          </p>
        </div>
      </Group>

      <Group label="Grouped options & disabled item">
        <div class="w-[280px] max-w-full">
          <Listbox
            surface="layer-1"
            defaultValue="claude"
            aria-label="Default model"
          >
            <For each={modelGroups}>
              {(group, index) => (
                <>
                  {index() > 0 ? <ListboxSeparator /> : null}
                  <ListboxGroup>
                    <ListboxGroupLabel>{group.label}</ListboxGroupLabel>
                    <For each={group.items}>
                      {(item) => (
                        <ListboxItem
                          value={item.value}
                          disabled={item.disabled}
                        >
                          <span>{item.label}</span>
                          <ListboxItemIndicator />
                        </ListboxItem>
                      )}
                    </For>
                  </ListboxGroup>
                </>
              )}
            </For>
          </Listbox>
        </div>
      </Group>

      <Group label="Horizontal & read-only / disabled">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <span class="text-[12px] font-medium text-secondary">
              Horizontal orientation
            </span>
            <Listbox
              orientation="horizontal"
              loop={false}
              defaultValue="m"
              aria-label="T-shirt size"
            >
              <For each={sizes}>
                {(size) => (
                  <ListboxItem value={size.value} disabled={size.disabled}>
                    {size.label}
                  </ListboxItem>
                )}
              </For>
            </Listbox>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-[12px] font-medium text-secondary">
              Read-only
            </span>
            <Listbox readOnly defaultValue="mentions" aria-label="Read-only">
              <ListboxItem value="comments">
                <span>Comments</span>
                <ListboxItemIndicator />
              </ListboxItem>
              <ListboxItem value="mentions">
                <span>Mentions</span>
                <ListboxItemIndicator />
              </ListboxItem>
            </Listbox>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-[12px] font-medium text-secondary">Disabled</span>
            <Listbox disabled defaultValue="comments" aria-label="Disabled">
              <ListboxItem value="comments">
                <span>Comments</span>
                <ListboxItemIndicator />
              </ListboxItem>
              <ListboxItem value="mentions">
                <span>Mentions</span>
                <ListboxItemIndicator />
              </ListboxItem>
            </Listbox>
          </div>
        </div>
      </Group>
    </div>
  )
}
