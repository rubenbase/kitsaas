import { createSignal, For } from 'solid-js'

import {
  Toggle,
  ToggleGroup,
  ToggleIcon,
  type ToggleSize,
  type ToggleVariant,
} from '#/components/ui/toggle'

import { Group } from '../demo-group'

function StarSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2.25 9.8 5.9l4 .58-2.9 2.82.68 3.98L8 11.4l-3.58 1.88.68-3.98L2.2 6.48l4-.58L8 2.25Z" />
    </svg>
  )
}

function BoldSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 3.5h4a2.25 2.25 0 0 1 0 4.5h-4V3.5Zm0 4.5h4.5a2.25 2.25 0 0 1 0 4.5H4.5V8Z" />
    </svg>
  )
}

function ItalicSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M10.5 3.5h-4M9.5 12.5h-4M9 3.5 7 12.5" />
    </svg>
  )
}

function UnderlineSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 3.5V7a3.5 3.5 0 0 0 7 0V3.5M3.5 13h9" />
    </svg>
  )
}

function AlignLeftSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M2.5 8h7.5M2.5 12h9.5" />
    </svg>
  )
}

function AlignCenterSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M4.25 8h7.5M3.25 12h9.5" />
    </svg>
  )
}

function AlignRightSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M6 8h7.5M4 12h9.5" />
    </svg>
  )
}

const VARIANTS: { value: ToggleVariant; label: string }[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
]

const SIZES: { value: ToggleSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
]

export function ToggleDemo() {
  const [formats, setFormats] = createSignal<string[]>(['bold'])
  const [align, setAlign] = createSignal<string[]>(['left'])

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Variants">
        <For each={VARIANTS}>
          {(item) => (
            <Toggle variant={item.value} defaultPressed={item.value === 'outline'}>
              <ToggleIcon>
                <StarSvg />
              </ToggleIcon>
              {item.label}
            </Toggle>
          )}
        </For>
      </Group>

      <Group label="Sizes">
        <For each={SIZES}>
          {(item) => (
            <Toggle size={item.value} variant="outline" defaultPressed>
              {item.label}
            </Toggle>
          )}
        </For>
      </Group>

      <Group label="Multiple toggle group">
        <ToggleGroup
          multiple
          aria-label="Text formatting"
          value={formats()}
          onValueChange={setFormats}
        >
          <Toggle value="bold" aria-label="Bold">
            <ToggleIcon>
              <BoldSvg />
            </ToggleIcon>
          </Toggle>
          <Toggle value="italic" aria-label="Italic">
            <ToggleIcon>
              <ItalicSvg />
            </ToggleIcon>
          </Toggle>
          <Toggle value="underline" aria-label="Underline">
            <ToggleIcon>
              <UnderlineSvg />
            </ToggleIcon>
          </Toggle>
        </ToggleGroup>
        <span class="text-[12px] text-muted">
          Active: {formats().length > 0 ? formats().join(', ') : 'none'}
        </span>
      </Group>

      <Group label="Single selection (non-deselectable)">
        <ToggleGroup
          value={align()}
          onValueChange={setAlign}
          deselectable={false}
          aria-label="Text alignment"
        >
          <Toggle value="left" aria-label="Align start">
            <ToggleIcon mirror>
              <AlignLeftSvg />
            </ToggleIcon>
          </Toggle>
          <Toggle value="center" aria-label="Align center">
            <ToggleIcon>
              <AlignCenterSvg />
            </ToggleIcon>
          </Toggle>
          <Toggle value="right" aria-label="Align end">
            <ToggleIcon mirror>
              <AlignRightSvg />
            </ToggleIcon>
          </Toggle>
        </ToggleGroup>
        <span class="text-[12px] text-muted">Alignment: {align()[0]}</span>
      </Group>

      <Group label="Vertical group">
        <ToggleGroup
          orientation="vertical"
          defaultValue={['list']}
          deselectable={false}
          aria-label="Layout view"
        >
          <Toggle value="list">List</Toggle>
          <Toggle value="board">Board</Toggle>
          <Toggle value="table">Table</Toggle>
        </ToggleGroup>
      </Group>

      <Group label="Disabled">
        <Toggle disabled>Muted</Toggle>
        <Toggle disabled defaultPressed variant="outline">
          Locked on
        </Toggle>
        <ToggleGroup multiple disabled aria-label="Disabled formatting">
          <Toggle value="bold" aria-label="Bold">
            <ToggleIcon>
              <BoldSvg />
            </ToggleIcon>
          </Toggle>
          <Toggle value="italic" aria-label="Italic">
            <ToggleIcon>
              <ItalicSvg />
            </ToggleIcon>
          </Toggle>
        </ToggleGroup>
      </Group>
    </div>
  )
}
