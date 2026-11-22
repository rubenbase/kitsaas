import type { ComponentProps } from '@solidjs/web'
import {
  Meter as UiMeter,
  MeterIndicator as UiMeterIndicator,
  MeterLabel as UiMeterLabel,
  MeterTrack as UiMeterTrack,
  MeterValue as UiMeterValue,
} from '@ui-sdk/solid/meter'
import { omit } from 'solid-js'

import './meter.css'

export type {
  MeterLabelDetails,
  MeterOptions,
  MeterPrimitive,
  MeterState,
  MeterValueState,
  NumberFormat,
} from '@ui-sdk/solid/meter'

/**
 * Meter, matching Kitsaas's `progress.css` track / header / label / value
 * grammar on top of ui-sdk's headless Meter.
 *
 * Supports HTML `<meter>` threshold props (`low`, `high`, `optimum`) or an
 * explicit `status` (`optimum`, `suboptimum`, `even-less-good`) to color the
 * fill with semantic success, warning and danger tokens via `data-status`.
 */

export type MeterStatus = 'optimum' | 'suboptimum' | 'even-less-good'

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}

function classifyMeterStatus(
  value: number,
  min: number,
  max: number,
  low?: number,
  high?: number,
  optimum?: number,
): MeterStatus | undefined {
  if (low === undefined && high === undefined && optimum === undefined) {
    return undefined
  }
  const clampedValue = clamp(value, min, max)
  const clampedLow = clamp(low ?? min, min, max)
  const clampedHigh = clamp(high ?? max, clampedLow, max)
  const clampedOptimum = clamp(optimum ?? (min + max) / 2, min, max)

  const region = (n: number) =>
    n < clampedLow ? 0 : n > clampedHigh ? 2 : 1

  const distance = Math.abs(region(clampedValue) - region(clampedOptimum))
  if (distance === 0) return 'optimum'
  if (distance === 1) return 'suboptimum'
  return 'even-less-good'
}

type UiMeterProps = ComponentProps<typeof UiMeter>

export type MeterProps = Omit<UiMeterProps, 'class' | 'render'> & {
  /** Upper bound of the low range, like HTML `<meter low>`. */
  low?: number
  /** Lower bound of the high range, like HTML `<meter high>`. */
  high?: number
  /** Ideal value within `[min, max]`, like HTML `<meter optimum>`. */
  optimum?: number
  /** Explicit status override; takes precedence over `low` / `high` / `optimum`. */
  status?: MeterStatus
  class?: UiMeterProps['class']
  render?: UiMeterProps['render']
}

export function Meter(props: MeterProps) {
  const rest = omit(
    props,
    'low',
    'high',
    'optimum',
    'status',
    'class',
    'render',
  )

  const status = () =>
    props.status ??
    classifyMeterStatus(
      props.value,
      props.min ?? 0,
      props.max ?? 100,
      props.low,
      props.high,
      props.optimum,
    )

  return (
    <UiMeter
      {...rest}
      class={props.class}
      render={props.render}
      data-status={status()}
    />
  )
}

type UiMeterLabelProps = ComponentProps<typeof UiMeterLabel>

export type MeterLabelProps = Omit<UiMeterLabelProps, 'class' | 'render'> & {
  class?: UiMeterLabelProps['class']
  render?: UiMeterLabelProps['render']
}

export function MeterLabel(props: MeterLabelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMeterLabel {...rest} class={props.class} render={props.render} />
}

type UiMeterValueProps = ComponentProps<typeof UiMeterValue>

export type MeterValueProps = Omit<UiMeterValueProps, 'class' | 'render'> & {
  class?: UiMeterValueProps['class']
  render?: UiMeterValueProps['render']
}

export function MeterValue(props: MeterValueProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMeterValue {...rest} class={props.class} render={props.render} />
}

type UiMeterTrackProps = ComponentProps<typeof UiMeterTrack>

export type MeterTrackProps = Omit<UiMeterTrackProps, 'class' | 'render'> & {
  class?: UiMeterTrackProps['class']
  render?: UiMeterTrackProps['render']
}

export function MeterTrack(props: MeterTrackProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMeterTrack {...rest} class={props.class} render={props.render} />
}

type UiMeterIndicatorProps = ComponentProps<typeof UiMeterIndicator>

export type MeterIndicatorProps = Omit<
  UiMeterIndicatorProps,
  'class' | 'render'
> & {
  class?: UiMeterIndicatorProps['class']
  render?: UiMeterIndicatorProps['render']
}

export function MeterIndicator(props: MeterIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiMeterIndicator {...rest} class={props.class} render={props.render} />
  )
}
