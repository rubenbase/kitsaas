import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createWaterfallController,
  visibleWaterfallRows,
  Waterfall as UiWaterfall,
  WaterfallAxis as UiWaterfallAxis,
  WaterfallBar as UiWaterfallBar,
  WaterfallCell as UiWaterfallCell,
  WaterfallColumnHeader as UiWaterfallColumnHeader,
  WaterfallHeaderRow as UiWaterfallHeaderRow,
  WaterfallIndicator as UiWaterfallIndicator,
  WaterfallMark as UiWaterfallMark,
  WaterfallRow as UiWaterfallRow,
  WaterfallRowHeader as UiWaterfallRowHeader,
  WaterfallTick as UiWaterfallTick,
  type WaterfallProps as UiWaterfallProps,
} from '@ui-sdk/solid/waterfall'
import { omit } from 'solid-js'

import './waterfall.css'

export { createWaterfallController, visibleWaterfallRows }
export type {
  WaterfallAxisState,
  WaterfallController,
  WaterfallData,
  WaterfallDataItem,
  WaterfallDataRow,
  WaterfallRowState,
  WaterfallState,
  WaterfallTickData,
} from '@ui-sdk/solid/waterfall'

export type WaterfallBarTone =
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'danger'
  | 'neutral'

export type WaterfallProps = UiWaterfallProps

export function Waterfall(props: WaterfallProps) {
  return <UiWaterfall {...props} />
}

type UiWaterfallHeaderRowProps = ComponentProps<typeof UiWaterfallHeaderRow>

export type WaterfallHeaderRowProps = Omit<
  UiWaterfallHeaderRowProps,
  'class' | 'render'
> & {
  class?: UiWaterfallHeaderRowProps['class']
  render?: UiWaterfallHeaderRowProps['render']
}

export function WaterfallHeaderRow(props: WaterfallHeaderRowProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiWaterfallHeaderRow {...rest} class={props.class} render={props.render} />
  )
}

type UiWaterfallColumnHeaderProps = ComponentProps<
  typeof UiWaterfallColumnHeader
>

export type WaterfallColumnHeaderProps = Omit<
  UiWaterfallColumnHeaderProps,
  'class' | 'render'
> & {
  class?: UiWaterfallColumnHeaderProps['class']
  render?: UiWaterfallColumnHeaderProps['render']
}

export function WaterfallColumnHeader(props: WaterfallColumnHeaderProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiWaterfallColumnHeader
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiWaterfallAxisProps = ComponentProps<typeof UiWaterfallAxis>

export type WaterfallAxisProps = Omit<
  UiWaterfallAxisProps,
  'class' | 'render'
> & {
  class?: UiWaterfallAxisProps['class']
  render?: UiWaterfallAxisProps['render']
}

export function WaterfallAxis(props: WaterfallAxisProps) {
  const rest = omit(props, 'class', 'render')

  return <UiWaterfallAxis {...rest} class={props.class} render={props.render} />
}

type UiWaterfallTickProps = ComponentProps<typeof UiWaterfallTick>

export type WaterfallTickProps = Omit<
  UiWaterfallTickProps,
  'class' | 'render'
> & {
  class?: UiWaterfallTickProps['class']
  render?: UiWaterfallTickProps['render']
}

export function WaterfallTick(props: WaterfallTickProps) {
  const rest = omit(props, 'class', 'render')

  return <UiWaterfallTick {...rest} class={props.class} render={props.render} />
}

type UiWaterfallMarkProps = ComponentProps<typeof UiWaterfallMark>

export type WaterfallMarkProps = Omit<
  UiWaterfallMarkProps,
  'class' | 'render'
> & {
  class?: UiWaterfallMarkProps['class']
  render?: UiWaterfallMarkProps['render']
}

export function WaterfallMark(props: WaterfallMarkProps) {
  const rest = omit(props, 'class', 'render')

  return <UiWaterfallMark {...rest} class={props.class} render={props.render} />
}

type UiWaterfallRowProps = ComponentProps<typeof UiWaterfallRow>

export type WaterfallRowProps = Omit<
  UiWaterfallRowProps,
  'class' | 'render'
> & {
  class?: UiWaterfallRowProps['class']
  render?: UiWaterfallRowProps['render']
}

export function WaterfallRow(props: WaterfallRowProps) {
  const rest = omit(props, 'class', 'render')

  return <UiWaterfallRow {...rest} class={props.class} render={props.render} />
}

type UiWaterfallRowHeaderProps = ComponentProps<typeof UiWaterfallRowHeader>

export type WaterfallRowHeaderProps = Omit<
  UiWaterfallRowHeaderProps,
  'class' | 'render'
> & {
  class?: UiWaterfallRowHeaderProps['class']
  render?: UiWaterfallRowHeaderProps['render']
}

export function WaterfallRowHeader(props: WaterfallRowHeaderProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiWaterfallRowHeader {...rest} class={props.class} render={props.render} />
  )
}

type UiWaterfallIndicatorProps = ComponentProps<typeof UiWaterfallIndicator>

export type WaterfallIndicatorProps = Omit<
  UiWaterfallIndicatorProps,
  'class' | 'render' | 'children'
> & {
  class?: UiWaterfallIndicatorProps['class']
  render?: UiWaterfallIndicatorProps['render']
  children?: UiWaterfallIndicatorProps['children']
}

export function WaterfallIndicator(props: WaterfallIndicatorProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiWaterfallIndicator {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ChevronRight />)
      }
    </UiWaterfallIndicator>
  )
}

type UiWaterfallCellProps = ComponentProps<typeof UiWaterfallCell>

export type WaterfallCellProps = Omit<
  UiWaterfallCellProps,
  'class' | 'render'
> & {
  class?: UiWaterfallCellProps['class']
  render?: UiWaterfallCellProps['render']
}

export function WaterfallCell(props: WaterfallCellProps) {
  const rest = omit(props, 'class', 'render')

  return <UiWaterfallCell {...rest} class={props.class} render={props.render} />
}

type UiWaterfallBarProps = ComponentProps<typeof UiWaterfallBar>

export type WaterfallBarProps = Omit<
  UiWaterfallBarProps,
  'class' | 'render'
> & {
  /** Semantic color tone for the span duration bar. Defaults to `blue`. */
  tone?: WaterfallBarTone
  class?: UiWaterfallBarProps['class']
  render?: UiWaterfallBarProps['render']
}

export function WaterfallBar(props: WaterfallBarProps) {
  const rest = omit(props, 'tone', 'class', 'render')

  return (
    <UiWaterfallBar
      {...rest}
      class={props.class}
      render={props.render}
      data-tone={props.tone ?? 'blue'}
    />
  )
}

function ChevronRight(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.25 4.25L10 8L6.25 11.75"
        stroke="currentColor"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
