import { createSignal, For } from 'solid-js'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import {
  TimeInput,
  type TimeInputAppearance,
  type TimeInputSurface,
} from '#/components/ui/time-input'

import { Group } from '../demo-group'

export function TimeInputDemo() {
  const [meeting, setMeeting] = createSignal<string | null>('09:30')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <div class="flex flex-col gap-3">
          <Field name="meeting-time">
            <FieldLabel>Meeting time</FieldLabel>
            <TimeInput
              value={meeting()}
              onValueChange={(next) => setMeeting(next)}
            />
            <FieldDescription>
              24h value: {meeting() ?? 'incomplete'}
            </FieldDescription>
          </Field>
          <Field name="empty-time">
            <FieldLabel>Empty (placeholder segments)</FieldLabel>
            <TimeInput />
          </Field>
        </div>
      </Group>

      <Group label="Clock & granularity">
        <div class="flex flex-wrap gap-4">
          <Field name="time-12h" class="w-auto">
            <FieldLabel>12-hour clock</FieldLabel>
            <TimeInput hourCycle={12} defaultValue="18:45" />
          </Field>
          <Field name="time-24h" class="w-auto">
            <FieldLabel>24-hour clock</FieldLabel>
            <TimeInput hourCycle={24} defaultValue="18:45" />
          </Field>
          <Field name="time-seconds" class="w-auto">
            <FieldLabel>With seconds</FieldLabel>
            <TimeInput
              granularity="second"
              hourCycle={24}
              defaultValue="18:45:30"
            />
          </Field>
          <Field name="time-hour" class="w-auto">
            <FieldLabel>Hour only</FieldLabel>
            <TimeInput
              granularity="hour"
              hourCycle={12}
              defaultValue="14:00"
            />
          </Field>
        </div>
      </Group>

      <Group label="Min, max & invalid">
        <div class="flex flex-col gap-3">
          <Field name="business-hours">
            <FieldLabel>Office hours (09:00–17:30)</FieldLabel>
            <TimeInput
              min="09:00"
              max="17:30"
              hourCycle={24}
              defaultValue="11:15"
            />
            <FieldDescription>
              Times outside 09:00–17:30 become invalid.
            </FieldDescription>
            <FieldError />
          </Field>
          <Field name="out-of-hours" invalid>
            <FieldLabel>Outside allowed window</FieldLabel>
            <TimeInput
              min="09:00"
              max="17:30"
              hourCycle={24}
              defaultValue="20:00"
            />
            <FieldError>Select a time between 09:00 and 17:30.</FieldError>
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
            ] satisfies { appearance: TimeInputAppearance; label: string }[]
          }
        >
          {(item) => (
            <Field class="w-auto">
              <FieldLabel>{item.label}</FieldLabel>
              <TimeInput
                appearance={item.appearance}
                hourCycle={24}
                defaultValue="14:30"
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
            ] satisfies { surface: TimeInputSurface; label: string }[]
          }
        >
          {(item) => (
            <Field class="w-auto">
              <FieldLabel>{item.label}</FieldLabel>
              <TimeInput
                surface={item.surface}
                hourCycle={24}
                defaultValue="09:00"
              />
            </Field>
          )}
        </For>
        <Field class="w-auto">
          <FieldLabel>Disabled</FieldLabel>
          <TimeInput defaultValue="09:30" disabled />
        </Field>
        <Field class="w-auto">
          <FieldLabel>Read-only</FieldLabel>
          <TimeInput defaultValue="09:30" readOnly />
        </Field>
      </Group>
    </div>
  )
}
