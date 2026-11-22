import type { DatePickerValue } from '@ui-sdk/solid/date-picker'
import { createSignal } from 'solid-js'

import {
  CalendarGrid,
  CalendarGrids,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  DatePicker,
  DatePickerClear,
  DatePickerContent,
  DatePickerControl,
  DatePickerHint,
  DatePickerInput,
  DatePickerPreset,
  DatePickerPresets,
  DatePickerSeparator,
  DatePickerTrigger,
} from '#/components/ui/date-picker'
import { Field, FieldLabel } from '#/components/ui/field'

import { Group } from '../demo-group'

export function DatePickerDemo() {
  const [single, setSingle] = createSignal<DatePickerValue>('2026-10-16')
  const [range, setRange] = createSignal<DatePickerValue>([
    '2026-10-12',
    '2026-10-18',
  ])
  const [rangeAnchor, setRangeAnchor] = createSignal<HTMLDivElement | null>(
    null,
  )
  const [presetAnchor, setPresetAnchor] = createSignal<HTMLDivElement | null>(
    null,
  )

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single date">
        <div class="flex flex-col gap-2">
          <Field name="due-date" class="w-auto">
            <FieldLabel>Due date</FieldLabel>
            <DatePicker
              today="2026-10-10"
              value={single()}
              onValueChange={(next) => setSingle(next)}
            >
              <DatePickerControl>
                <DatePickerInput placeholder="MM/DD/YYYY" />
                <DatePickerClear aria-label="Clear date" />
                <DatePickerTrigger />
              </DatePickerControl>
              <DatePickerHint />
              <DatePickerContent />
            </DatePicker>
          </Field>
          <p class="text-[12px] text-muted tabular-nums">
            Value: {typeof single() === 'string' ? single() : 'None'}
          </p>
        </div>
      </Group>

      <Group label="Date range">
        <div class="flex flex-col gap-2">
          <Field name="stay-range" class="w-auto">
            <FieldLabel>Billing cycle</FieldLabel>
            <DatePicker
              mode="range"
              months={2}
              monthFormat="short"
              today="2026-10-10"
              value={range()}
              onValueChange={(next) => setRange(next)}
            >
              <DatePickerControl ref={setRangeAnchor}>
                <DatePickerInput aria-label="Start date" placeholder="Start" />
                <DatePickerSeparator />
                <DatePickerInput
                  end
                  aria-label="End date"
                  placeholder="End"
                />
                <DatePickerClear aria-label="Clear range" />
                <DatePickerTrigger />
              </DatePickerControl>
              <DatePickerContent anchor={rangeAnchor()} align="start">
                <CalendarHeader>
                  <CalendarPrevious />
                  <CalendarHeading />
                  <CalendarNext />
                </CalendarHeader>
                <CalendarGrids>
                  <CalendarGrid offset={0} />
                  <CalendarGrid offset={1} />
                </CalendarGrids>
              </DatePickerContent>
            </DatePicker>
          </Field>
          <p class="text-[12px] text-muted tabular-nums">
            Range:{' '}
            {Array.isArray(range())
              ? `${range()![0]} → ${range()![1]}`
              : 'None'}
          </p>
        </div>
      </Group>

      <Group label="Presets & clear">
        <Field name="report-window" class="w-auto">
          <FieldLabel>Reporting window</FieldLabel>
          <DatePicker
            mode="range"
            today="2026-10-16"
            defaultValue={['2026-10-10', '2026-10-16']}
          >
            <DatePickerControl ref={setPresetAnchor}>
              <DatePickerInput aria-label="From" placeholder="From" />
              <DatePickerSeparator />
              <DatePickerInput end aria-label="To" placeholder="To" />
              <DatePickerClear aria-label="Clear window" />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerContent anchor={presetAnchor()} align="start">
              <CalendarHeader>
                <CalendarPrevious />
                <CalendarHeading />
                <CalendarNext />
              </CalendarHeader>
              <CalendarGrid />
              <DatePickerPresets>
                <DatePickerPreset value={['2026-10-10', '2026-10-16']}>
                  Last 7 days
                </DatePickerPreset>
                <DatePickerPreset value={['2026-09-17', '2026-10-16']}>
                  Last 30 days
                </DatePickerPreset>
                <DatePickerPreset value={['2026-10-01', '2026-10-31']}>
                  This month
                </DatePickerPreset>
              </DatePickerPresets>
            </DatePickerContent>
          </DatePicker>
        </Field>
      </Group>

      <Group label="Unavailable dates & bounds">
        <Field name="delivery-date" class="w-auto">
          <FieldLabel>Delivery date (weekdays only)</FieldLabel>
          <DatePicker
            min="2026-10-05"
            max="2026-11-20"
            unavailable={[{ weekday: [0, 6] }]}
            defaultValue="2026-10-16"
            today="2026-10-10"
          >
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerHint>
              {(state) => `Format: ${state.example} (Mon–Fri)`}
            </DatePickerHint>
            <DatePickerContent />
          </DatePicker>
        </Field>
      </Group>

      <Group label="Disabled & read-only">
        <Field name="disabled-date" class="w-auto">
          <FieldLabel>Disabled</FieldLabel>
          <DatePicker disabled defaultValue="2026-10-16">
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerContent />
          </DatePicker>
        </Field>
        <Field name="readonly-date" class="w-auto">
          <FieldLabel>Read-only</FieldLabel>
          <DatePicker readOnly defaultValue="2026-10-16">
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerContent />
          </DatePicker>
        </Field>
      </Group>
    </div>
  )
}
