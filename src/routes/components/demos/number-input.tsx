import { createSignal, For } from 'solid-js'

import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/ui/field'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  type NumberInputAppearance,
  type NumberInputSurface,
} from '#/components/ui/number-input'

import { Group } from '../demo-group'

function ScrubCursorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m18 8 4 4-4 4" />
      <path d="M2 12h20" />
      <path d="m6 8-4 4 4 4" />
    </svg>
  )
}

export function NumberInputDemo() {
  const [seats, setSeats] = createSignal<number | null>(4)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default & scrub label">
        <Field>
          <NumberInput
            value={seats()}
            onValueChange={(next) => setSeats(next)}
            min={1}
            max={50}
          >
            <NumberInputScrubArea pixelsPerStep={4}>
              <FieldLabel>Team seats</FieldLabel>
              <NumberInputScrubAreaCursor>
                <ScrubCursorIcon />
              </NumberInputScrubAreaCursor>
            </NumberInputScrubArea>
            <NumberInputGroup>
              <NumberInputDecrement aria-label="Decrease seats" />
              <NumberInputControl />
              <NumberInputIncrement aria-label="Increase seats" />
            </NumberInputGroup>
          </NumberInput>
          <FieldDescription>
            Drag the label sideways, use arrows, or hold + / −.
          </FieldDescription>
        </Field>
      </Group>

      <Group label="Formatting (currency, percent, unit)">
        <div class="flex flex-wrap gap-3">
          <Field class="w-auto">
            <FieldLabel>Price</FieldLabel>
            <NumberInput
              defaultValue={49.99}
              min={0}
              step={0.5}
              format={{ style: 'currency', currency: 'USD' }}
            >
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease price" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase price" />
              </NumberInputGroup>
            </NumberInput>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Discount</FieldLabel>
            <NumberInput
              defaultValue={0.15}
              min={0}
              max={1}
              step={0.05}
              format={{ style: 'percent' }}
            >
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease discount" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase discount" />
              </NumberInputGroup>
            </NumberInput>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Memory</FieldLabel>
            <NumberInput
              defaultValue={16}
              min={4}
              max={128}
              step={4}
              format={{ style: 'unit', unit: 'gigabyte' }}
            >
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease memory" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase memory" />
              </NumberInputGroup>
            </NumberInput>
          </Field>
        </div>
      </Group>

      <Group label="Appearances">
        <div class="flex flex-wrap items-center gap-3">
          <For
            each={
              [
                { appearance: 'small', label: 'Small (24px)', value: 8 },
                { appearance: 'base', label: 'Base (28px)', value: 16 },
                { appearance: 'large', label: 'Large (32px)', value: 24 },
              ] satisfies {
                appearance: NumberInputAppearance
                label: string
                value: number
              }[]
            }
          >
            {(item) => (
              <NumberInput defaultValue={item.value} min={0}>
                <NumberInputGroup appearance={item.appearance}>
                  <NumberInputDecrement aria-label={`Decrease ${item.label}`} />
                  <NumberInputControl aria-label={item.label} />
                  <NumberInputIncrement aria-label={`Increase ${item.label}`} />
                </NumberInputGroup>
              </NumberInput>
            )}
          </For>
        </div>
      </Group>

      <Group label="Surfaces">
        <div class="flex flex-wrap items-center gap-3">
          <For
            each={
              [
                { surface: 'base', label: 'Base', value: 10 },
                { surface: 'layer-1', label: 'Layer 1', value: 20 },
                { surface: 'invisible', label: 'Invisible', value: 30 },
              ] satisfies {
                surface: NumberInputSurface
                label: string
                value: number
              }[]
            }
          >
            {(item) => (
              <NumberInput defaultValue={item.value} min={0}>
                <NumberInputGroup surface={item.surface}>
                  <NumberInputDecrement aria-label={`Decrease ${item.label}`} />
                  <NumberInputControl aria-label={item.label} />
                  <NumberInputIncrement aria-label={`Increase ${item.label}`} />
                </NumberInputGroup>
              </NumberInput>
            )}
          </For>
        </div>
      </Group>

      <Group label="Min, max & fractional step">
        <div class="flex flex-wrap gap-3">
          <Field class="w-auto">
            <FieldLabel>Retries (0–5)</FieldLabel>
            <NumberInput defaultValue={0} min={0} max={5} step={1}>
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease retries" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase retries" />
              </NumberInputGroup>
            </NumberInput>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Timeout (0.25 step)</FieldLabel>
            <NumberInput
              defaultValue={1.5}
              min={0.25}
              max={10}
              step={0.25}
              largeStep={1}
              format={{ style: 'unit', unit: 'second' }}
            >
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease timeout" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase timeout" />
              </NumberInputGroup>
            </NumberInput>
          </Field>
        </div>
      </Group>

      <Group label="Invalid, disabled & read-only">
        <div class="flex flex-wrap gap-4">
          <Field class="w-auto" invalid>
            <FieldLabel>Concurrency</FieldLabel>
            <NumberInput defaultValue={256} min={1} max={100}>
              <NumberInputGroup invalid>
                <NumberInputDecrement aria-label="Decrease concurrency" />
                <NumberInputControl invalid />
                <NumberInputIncrement aria-label="Increase concurrency" />
              </NumberInputGroup>
            </NumberInput>
            <FieldError>Maximum concurrency for this plan is 100.</FieldError>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Disabled</FieldLabel>
            <NumberInput defaultValue={3} disabled>
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease disabled" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase disabled" />
              </NumberInputGroup>
            </NumberInput>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Read-only</FieldLabel>
            <NumberInput defaultValue={12} readOnly>
              <NumberInputGroup>
                <NumberInputDecrement aria-label="Decrease read-only" />
                <NumberInputControl />
                <NumberInputIncrement aria-label="Increase read-only" />
              </NumberInputGroup>
            </NumberInput>
          </Field>
        </div>
      </Group>
    </div>
  )
}
