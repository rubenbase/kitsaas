import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createDatePickerController,
  DatePicker as UiDatePicker,
  DatePickerClear as UiDatePickerClear,
  DatePickerContent as UiDatePickerContent,
  DatePickerHint as UiDatePickerHint,
  DatePickerInput as UiDatePickerInput,
  DatePickerPreset as UiDatePickerPreset,
  DatePickerTrigger as UiDatePickerTrigger,
} from '@ui-sdk/solid/date-picker'
import { omit } from 'solid-js'

import {
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
} from './calendar'
import './date-picker.css'

export {
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
  createDatePickerController,
}

export type DatePickerAppearance = 'small' | 'base' | 'large'
export type DatePickerSurface = 'base' | 'layer-1' | 'invisible'

type UiDatePickerProps = ComponentProps<typeof UiDatePicker>

export type DatePickerProps = Omit<UiDatePickerProps, 'class' | 'render'> & {
  class?: UiDatePickerProps['class']
  render?: UiDatePickerProps['render']
}

export function DatePicker(props: DatePickerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDatePicker {...rest} class={props.class} render={props.render} />
}

export type DatePickerControlProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Control height. Defaults to `base` (28px). */
  appearance?: DatePickerAppearance
  /** Background fill. Defaults to `base`. */
  surface?: DatePickerSurface
}

export function DatePickerControl(props: DatePickerControlProps) {
  const rest = omit(props, 'appearance', 'surface')

  return (
    <div
      {...rest}
      data-slot="date-picker-control"
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
    />
  )
}

export type DatePickerSeparatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function DatePickerSeparator(props: DatePickerSeparatorProps) {
  return (
    <span {...props} data-slot="date-picker-separator" aria-hidden="true">
      {props.children ?? '–'}
    </span>
  )
}

type UiDatePickerInputProps = ComponentProps<typeof UiDatePickerInput>

export type DatePickerInputProps = Omit<
  UiDatePickerInputProps,
  'class' | 'render'
> & {
  class?: UiDatePickerInputProps['class']
  render?: UiDatePickerInputProps['render']
}

export function DatePickerInput(props: DatePickerInputProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDatePickerInput {...rest} class={props.class} render={props.render} />
  )
}

type UiDatePickerTriggerProps = ComponentProps<typeof UiDatePickerTrigger>

export type DatePickerTriggerProps = Omit<
  UiDatePickerTriggerProps,
  'class' | 'render' | 'children'
> & {
  class?: UiDatePickerTriggerProps['class']
  render?: UiDatePickerTriggerProps['render']
  children?: UiDatePickerTriggerProps['children']
}

export function DatePickerTrigger(props: DatePickerTriggerProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiDatePickerTrigger {...rest} class={props.class} render={props.render}>
      {props.children ?? <CalendarIcon />}
    </UiDatePickerTrigger>
  )
}

type UiDatePickerClearProps = ComponentProps<typeof UiDatePickerClear>

export type DatePickerClearProps = Omit<
  UiDatePickerClearProps,
  'class' | 'render' | 'children'
> & {
  class?: UiDatePickerClearProps['class']
  render?: UiDatePickerClearProps['render']
  children?: UiDatePickerClearProps['children']
}

export function DatePickerClear(props: DatePickerClearProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiDatePickerClear {...rest} class={props.class} render={props.render}>
      {props.children ?? <ClearIcon />}
    </UiDatePickerClear>
  )
}

type UiDatePickerHintProps = ComponentProps<typeof UiDatePickerHint>

export type DatePickerHintProps = Omit<
  UiDatePickerHintProps,
  'class' | 'render'
> & {
  class?: UiDatePickerHintProps['class']
  render?: UiDatePickerHintProps['render']
}

export function DatePickerHint(props: DatePickerHintProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDatePickerHint {...rest} class={props.class} render={props.render} />
  )
}

type UiDatePickerContentProps = ComponentProps<typeof UiDatePickerContent>

export type DatePickerContentProps = Omit<
  UiDatePickerContentProps,
  'class' | 'render' | 'sideOffset' | 'children'
> & {
  sideOffset?: number
  class?: UiDatePickerContentProps['class']
  render?: UiDatePickerContentProps['render']
  children?: UiDatePickerContentProps['children']
}

export function DatePickerContent(props: DatePickerContentProps) {
  const rest = omit(props, 'sideOffset', 'class', 'render', 'children')

  return (
    <UiDatePickerContent
      {...rest}
      sideOffset={props.sideOffset ?? 6}
      class={props.class}
      render={props.render}
    >
      {props.children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevious />
            <CalendarHeading />
            <CalendarNext />
          </CalendarHeader>
          <CalendarGrid />
        </>
      )}
    </UiDatePickerContent>
  )
}

export type DatePickerPresetsProps = JSX.HTMLAttributes<HTMLDivElement>

export function DatePickerPresets(props: DatePickerPresetsProps) {
  return <div {...props} data-slot="date-picker-presets" />
}

type UiDatePickerPresetProps = ComponentProps<typeof UiDatePickerPreset>

export type DatePickerPresetProps = Omit<
  UiDatePickerPresetProps,
  'class' | 'render'
> & {
  class?: UiDatePickerPresetProps['class']
  render?: UiDatePickerPresetProps['render']
}

export function DatePickerPreset(props: DatePickerPresetProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDatePickerPreset {...rest} class={props.class} render={props.render} />
  )
}

function CalendarIcon(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2"
        stroke="currentColor"
        stroke-width="1.25"
      />
      <path
        d="M2 6.5H14M5.25 1.75V3.75M10.75 1.75V3.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  )
}

function ClearIcon(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        stroke-width="1.35"
        stroke-linecap="round"
      />
    </svg>
  )
}
