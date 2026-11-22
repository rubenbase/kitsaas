import { createSignal } from 'solid-js'

import {
  Calendar,
  CalendarDay,
  CalendarGrid,
  CalendarGrids,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthSelect,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearSelect,
} from '#/components/ui/calendar'

import { Group } from '../demo-group'

const unavailableDates = [
  '2026-10-08',
  { from: '2026-10-20', to: '2026-10-22' },
  { weekday: [0, 6] },
]

export function CalendarDemo() {
  const [singleDate, setSingleDate] = createSignal<string | null>('2026-10-16')
  const [rangeValue, setRangeValue] = createSignal<[string, string] | null>([
    '2026-10-12',
    '2026-10-18',
  ])
  const [multiDates, setMultiDates] = createSignal<string[]>([
    '2026-10-06',
    '2026-10-16',
    '2026-10-24',
  ])

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single date">
        <div class="flex flex-col gap-2">
          <Calendar
            today="2026-10-10"
            value={singleDate()}
            onValueChange={(next) => setSingleDate(next as string | null)}
            deselectable
          />
          <p class="text-[12px] text-muted tabular-nums">
            Selected: {singleDate() ?? 'None'}
          </p>
        </div>
      </Group>

      <Group label="Unavailable & bounds">
        <div class="flex flex-col gap-2">
          <Calendar
            defaultValue="2026-10-14"
            today="2026-10-10"
            min="2026-10-05"
            max="2026-11-20"
            unavailable={unavailableDates}
          />
          <p class="text-[12px] text-muted">
            Weekends, Oct 8, and Oct 20–22 are unavailable.
          </p>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Multi-month range">
          <div class="flex flex-col gap-2">
            <Calendar
              mode="range"
              months={2}
              monthFormat="short"
              today="2026-10-10"
              value={rangeValue()}
              onValueChange={(next) =>
                setRangeValue(next as [string, string] | null)
              }
            >
              <CalendarHeader>
                <CalendarPrevious />
                <CalendarHeading />
                <CalendarNext />
              </CalendarHeader>
              <CalendarGrids>
                <CalendarGrid offset={0}>
                  <CalendarWeekdays>
                    {(index) => <CalendarWeekday index={index} />}
                  </CalendarWeekdays>
                  <CalendarWeeks>
                    {(cell) => <CalendarDay value={cell.date} />}
                  </CalendarWeeks>
                </CalendarGrid>
                <CalendarGrid offset={1}>
                  <CalendarWeekdays>
                    {(index) => <CalendarWeekday index={index} />}
                  </CalendarWeekdays>
                  <CalendarWeeks>
                    {(cell) => <CalendarDay value={cell.date} />}
                  </CalendarWeeks>
                </CalendarGrid>
              </CalendarGrids>
            </Calendar>
            <p class="text-[12px] text-muted tabular-nums">
              Range:{' '}
              {rangeValue()
                ? `${rangeValue()![0]} → ${rangeValue()![1]}`
                : 'None'}
            </p>
          </div>
        </Group>
      </div>

      <Group label="Multiple dates">
        <div class="flex flex-col gap-2">
          <Calendar
            mode="multiple"
            today="2026-10-10"
            value={multiDates()}
            onValueChange={(next) => setMultiDates((next as string[]) ?? [])}
          />
          <p class="text-[12px] text-muted tabular-nums">
            {multiDates().length} selected:{' '}
            {multiDates().join(', ') || 'None'}
          </p>
        </div>
      </Group>

      <Group label="Month & year selects">
        <Calendar defaultMonth="1992-06" min="1950-01-01" max="2030-12-31">
          <CalendarHeader>
            <CalendarPrevious />
            <div data-slot="calendar-selects">
              <CalendarMonthSelect aria-label="Month" />
              <CalendarYearSelect aria-label="Year" />
            </div>
            <CalendarNext />
          </CalendarHeader>
          <CalendarHeading class="sr-only" />
          <CalendarGrid />
        </Calendar>
      </Group>

      <Group label="Disabled">
        <Calendar disabled defaultValue="2026-10-16" today="2026-10-10" />
      </Group>

      <Group label="Fixed weeks (no outside days)">
        <Calendar
          fixedWeeks
          showOutsideDays={false}
          defaultMonth="2026-02"
          defaultValue="2026-02-14"
        />
      </Group>
    </div>
  )
}
