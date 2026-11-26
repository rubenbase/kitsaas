import { createSignal, For } from 'solid-js'

import {
  DateInput,
  type DateInputAppearance,
  type DateInputSurface,
} from '#/components/ui/date-input'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'

import { Group } from '../demo-group'

export function DateInputDemo() {
  const [date, setDate] = createSignal<string | null>('2026-11-04')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <div class="flex flex-col gap-3">
          <Field name="start-date">
            <FieldLabel>Start date</FieldLabel>
            <DateInput
              value={date()}
              onValueChange={(next) => setDate(next)}
            />
            <FieldDescription>
              ISO value: {date() ?? 'incomplete'}
            </FieldDescription>
          </Field>
          <Field name="empty-date">
            <FieldLabel>Empty (placeholder segments)</FieldLabel>
            <DateInput />
          </Field>
        </div>
      </Group>

      <Group label="Date & time">
        <div class="flex flex-col gap-3">
          <Field name="departure">
            <FieldLabel>Departure (minute granularity)</FieldLabel>
            <DateInput granularity="minute" defaultValue="2026-11-04T14:30" />
          </Field>
          <Field name="timestamp">
            <FieldLabel>24-hour with seconds</FieldLabel>
            <DateInput
              granularity="second"
              hourCycle={24}
              defaultValue="2026-11-04T09:15:45"
            />
          </Field>
        </div>
      </Group>

      <Group label="Locales">
        <div class="flex flex-wrap gap-4">
          <Field name="locale-us" class="w-auto">
            <FieldLabel>en-US</FieldLabel>
            <DateInput locale="en-US" defaultValue="2026-11-04" />
          </Field>
          <Field name="locale-gb" class="w-auto">
            <FieldLabel>en-GB</FieldLabel>
            <DateInput locale="en-GB" defaultValue="2026-11-04" />
          </Field>
          <Field name="locale-de" class="w-auto">
            <FieldLabel>de-DE</FieldLabel>
            <DateInput locale="de-DE" defaultValue="2026-11-04" />
          </Field>
          <Field name="locale-jp" class="w-auto">
            <FieldLabel>ja-JP</FieldLabel>
            <DateInput locale="ja-JP" defaultValue="2026-11-04" />
          </Field>
        </div>
      </Group>

      <Group label="Min, max & invalid">
        <div class="flex flex-col gap-3">
          <Field name="bounded-date">
            <FieldLabel>2026 only (min/max)</FieldLabel>
            <DateInput
              min="2026-01-01"
              max="2026-12-31"
              defaultValue="2026-06-15"
            />
            <FieldDescription>
              Step the year to 2027 to trigger invalid state.
            </FieldDescription>
            <FieldError />
          </Field>
          <Field name="invalid-date" invalid>
            <FieldLabel>Out of range</FieldLabel>
            <DateInput
              min="2026-01-01"
              max="2026-12-31"
              defaultValue="2027-02-10"
            />
            <FieldError>Date must be within 2026.</FieldError>
          </Field>
        </div>
      </Group>

      <Group label="Appearances">
        <For
          each={
            [
              { appearance: 'small', label: 'Small (24px)' },
              { appearance: 'base', label: 'Base (28px)' },
              { appearance: 'large', label: 'Large (32px)' },
            ] satisfies { appearance: DateInputAppearance; label: string }[]
          }
        >
          {(item) => (
            <Field class="w-auto">
              <FieldLabel>{item.label}</FieldLabel>
              <DateInput
                appearance={item.appearance}
                defaultValue="2026-11-04"
              />
            </Field>
          )}
        </For>
      </Group>

      <Group label="Surfaces & states">
        <For
          each={
            [
              { surface: 'base', label: 'Base' },
              { surface: 'layer-1', label: 'Layer 1' },
              { surface: 'invisible', label: 'Invisible' },
            ] satisfies { surface: DateInputSurface; label: string }[]
          }
        >
          {(item) => (
            <Field class="w-auto">
              <FieldLabel>{item.label}</FieldLabel>
              <DateInput surface={item.surface} defaultValue="2026-11-04" />
            </Field>
          )}
        </For>
        <Field class="w-auto">
          <FieldLabel>Disabled</FieldLabel>
          <DateInput defaultValue="2026-11-04" disabled />
        </Field>
        <Field class="w-auto">
          <FieldLabel>Read-only</FieldLabel>
          <DateInput defaultValue="2026-11-04" readOnly />
        </Field>
      </Group>
    </div>
  )
}
