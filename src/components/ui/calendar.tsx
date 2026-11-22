import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Calendar as UiCalendar,
  CalendarDay as UiCalendarDay,
  CalendarGrid as UiCalendarGrid,
  CalendarHeading as UiCalendarHeading,
  CalendarMonthSelect as UiCalendarMonthSelect,
  CalendarNext as UiCalendarNext,
  CalendarPrevious as UiCalendarPrevious,
  CalendarWeekday as UiCalendarWeekday,
  CalendarWeekdays as UiCalendarWeekdays,
  CalendarWeeks as UiCalendarWeeks,
  CalendarYearSelect as UiCalendarYearSelect,
  createCalendarController,
} from '@ui-sdk/solid/calendar'
import { For, omit } from 'solid-js'

import './calendar.css'

export { createCalendarController }

export type CalendarSurface = 'base' | 'layer-1'

type UiCalendarProps = ComponentProps<typeof UiCalendar>

export type CalendarProps = Omit<
  UiCalendarProps,
  'class' | 'render' | 'children'
> & {
  /** Surface background. Defaults to `base`. */
  surface?: CalendarSurface
  class?: UiCalendarProps['class']
  render?: UiCalendarProps['render']
  children?: UiCalendarProps['children']
}

export function Calendar(props: CalendarProps) {
  const rest = omit(props, 'surface', 'class', 'render', 'children')

  const offsets = () =>
    Array.from({ length: Math.max(1, props.months ?? 1) }, (_, index) => index)

  return (
    <UiCalendar
      {...rest}
      class={props.class}
      render={props.render}
      data-surface={props.surface ?? 'base'}
    >
      {props.children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevious />
            <CalendarHeading />
            <CalendarNext />
          </CalendarHeader>
          <CalendarGrids>
            <For each={offsets()}>
              {(offset) => <CalendarGrid offset={offset} />}
            </For>
          </CalendarGrids>
        </>
      )}
    </UiCalendar>
  )
}

export type CalendarHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function CalendarHeader(props: CalendarHeaderProps) {
  return <div {...props} data-slot="calendar-header" />
}

export type CalendarGridsProps = JSX.HTMLAttributes<HTMLDivElement>

export function CalendarGrids(props: CalendarGridsProps) {
  return <div {...props} data-slot="calendar-grids" />
}

type UiCalendarHeadingProps = ComponentProps<typeof UiCalendarHeading>

export type CalendarHeadingProps = Omit<
  UiCalendarHeadingProps,
  'class' | 'render'
> & {
  class?: UiCalendarHeadingProps['class']
  render?: UiCalendarHeadingProps['render']
}

export function CalendarHeading(props: CalendarHeadingProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCalendarHeading
      {...rest}
      class={props.class}
      render={props.render ?? ((headingProps) => <h3 {...headingProps} />)}
    />
  )
}

type UiCalendarPreviousProps = ComponentProps<typeof UiCalendarPrevious>

export type CalendarPreviousProps = Omit<
  UiCalendarPreviousProps,
  'class' | 'render' | 'children'
> & {
  class?: UiCalendarPreviousProps['class']
  render?: UiCalendarPreviousProps['render']
  children?: UiCalendarPreviousProps['children']
}

export function CalendarPrevious(props: CalendarPreviousProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiCalendarPrevious {...rest} class={props.class} render={props.render}>
      {props.children ?? <ChevronLeft />}
    </UiCalendarPrevious>
  )
}

type UiCalendarNextProps = ComponentProps<typeof UiCalendarNext>

export type CalendarNextProps = Omit<
  UiCalendarNextProps,
  'class' | 'render' | 'children'
> & {
  class?: UiCalendarNextProps['class']
  render?: UiCalendarNextProps['render']
  children?: UiCalendarNextProps['children']
}

export function CalendarNext(props: CalendarNextProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiCalendarNext {...rest} class={props.class} render={props.render}>
      {props.children ?? <ChevronRight />}
    </UiCalendarNext>
  )
}

type UiCalendarMonthSelectProps = ComponentProps<typeof UiCalendarMonthSelect>

export type CalendarMonthSelectProps = Omit<
  UiCalendarMonthSelectProps,
  'class' | 'render'
> & {
  class?: UiCalendarMonthSelectProps['class']
  render?: UiCalendarMonthSelectProps['render']
}

export function CalendarMonthSelect(props: CalendarMonthSelectProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCalendarMonthSelect
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiCalendarYearSelectProps = ComponentProps<typeof UiCalendarYearSelect>

export type CalendarYearSelectProps = Omit<
  UiCalendarYearSelectProps,
  'class' | 'render'
> & {
  class?: UiCalendarYearSelectProps['class']
  render?: UiCalendarYearSelectProps['render']
}

export function CalendarYearSelect(props: CalendarYearSelectProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCalendarYearSelect {...rest} class={props.class} render={props.render} />
  )
}

type UiCalendarGridProps = ComponentProps<typeof UiCalendarGrid>

export type CalendarGridProps = Omit<
  UiCalendarGridProps,
  'class' | 'render'
> & {
  class?: UiCalendarGridProps['class']
  render?: UiCalendarGridProps['render']
}

export function CalendarGrid(props: CalendarGridProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCalendarGrid {...rest} class={props.class} render={props.render} />
}

export type CalendarWeekdaysProps = ComponentProps<typeof UiCalendarWeekdays>

export function CalendarWeekdays(props: CalendarWeekdaysProps) {
  return <UiCalendarWeekdays {...props} />
}

type UiCalendarWeekdayProps = ComponentProps<typeof UiCalendarWeekday>

export type CalendarWeekdayProps = Omit<
  UiCalendarWeekdayProps,
  'class' | 'render'
> & {
  class?: UiCalendarWeekdayProps['class']
  render?: UiCalendarWeekdayProps['render']
}

export function CalendarWeekday(props: CalendarWeekdayProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCalendarWeekday {...rest} class={props.class} render={props.render} />
  )
}

export type CalendarWeeksProps = ComponentProps<typeof UiCalendarWeeks>

export function CalendarWeeks(props: CalendarWeeksProps) {
  return <UiCalendarWeeks {...props} />
}

type UiCalendarDayProps = ComponentProps<typeof UiCalendarDay>

export type CalendarDayProps = Omit<UiCalendarDayProps, 'class' | 'render'> & {
  class?: UiCalendarDayProps['class']
  render?: UiCalendarDayProps['render']
}

export function CalendarDay(props: CalendarDayProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCalendarDay {...rest} class={props.class} render={props.render} />
}

function ChevronLeft(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.5 11.5L6 8L9.5 4.5"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronRight(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.5 11.5L10 8L6.5 4.5"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
