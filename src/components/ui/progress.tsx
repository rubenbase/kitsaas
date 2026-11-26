import type { ComponentProps } from '@solidjs/web'
import {
  Progress as UiProgress,
  ProgressIndicator as UiProgressIndicator,
  ProgressLabel as UiProgressLabel,
  ProgressTrack as UiProgressTrack,
  ProgressValue as UiProgressValue,
} from '@ui-sdk/solid/progress'
import { omit } from 'solid-js'

import './progress.css'

/**
 * Progress, a 1:1 port of opencode's `@opencode/ui` Progress visuals (MIT):
 * `packages/ui/src/components/progress.tsx` + `progress.css`, on top of
 * ui-sdk's headless Progress, ProgressLabel, ProgressValue, ProgressTrack and
 * ProgressIndicator.
 *
 * Styling lives in `progress.css` as attribute rules (`data-indeterminate`),
 * so every state upstream styles — the label row, the empty track, the
 * determinate fill and the indeterminate sweep — matches upstream. Behaviour
 * (the `progressbar` role, the range, the formatted value, the indicator's
 * inline width and each part's `data-progressing` / `data-complete` /
 * `data-indeterminate`) comes from `@ui-sdk/solid`.
 *
 * Upstream renders the header row (label left, value right) above the track
 * itself. ui-sdk leaves composition to you, so keep upstream's header slot
 * around the label and value:
 *
 *   <Progress value={60}>
 *     <div data-slot="progress-header">
 *       <ProgressLabel>Exporting video</ProgressLabel>
 *       <ProgressValue />
 *     </div>
 *     <ProgressTrack>
 *       <ProgressIndicator />
 *     </ProgressTrack>
 *   </Progress>
 *
 * Leave out `value` (or pass `null`) and the bar is indeterminate. Upstream's
 * `hideLabel` and `showValueLabel` become whether you render `ProgressLabel`
 * and `ProgressValue`; no extra data-* is needed for them.
 */

type UiProgressProps = ComponentProps<typeof UiProgress>

export type ProgressProps = Omit<UiProgressProps, 'class' | 'render'> & {
  class?: UiProgressProps['class']
  render?: UiProgressProps['render']
}

export function Progress(props: ProgressProps) {
  const rest = omit(props, 'class', 'render')

  return <UiProgress {...rest} class={props.class} render={props.render} />
}

type UiProgressLabelProps = ComponentProps<typeof UiProgressLabel>

export type ProgressLabelProps = Omit<
  UiProgressLabelProps,
  'class' | 'render'
> & {
  class?: UiProgressLabelProps['class']
  render?: UiProgressLabelProps['render']
}

/** Names the bar; upstream's `hideLabel` means leaving it out. */
export function ProgressLabel(props: ProgressLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiProgressLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiProgressValueProps = ComponentProps<typeof UiProgressValue>

export type ProgressValueProps = Omit<
  UiProgressValueProps,
  'class' | 'render'
> & {
  class?: UiProgressValueProps['class']
  render?: UiProgressValueProps['render']
}

/** The formatted value; children replace it, like "3 of 12". */
export function ProgressValue(props: ProgressValueProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiProgressValue {...rest} class={props.class} render={props.render} />
  )
}

type UiProgressTrackProps = ComponentProps<typeof UiProgressTrack>

export type ProgressTrackProps = Omit<
  UiProgressTrackProps,
  'class' | 'render'
> & {
  class?: UiProgressTrackProps['class']
  render?: UiProgressTrackProps['render']
}

/** The 8px rail the indicator fills. */
export function ProgressTrack(props: ProgressTrackProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiProgressTrack {...rest} class={props.class} render={props.render} />
  )
}

type UiProgressIndicatorProps = ComponentProps<typeof UiProgressIndicator>

export type ProgressIndicatorProps = Omit<
  UiProgressIndicatorProps,
  'class' | 'render'
> & {
  class?: UiProgressIndicatorProps['class']
  render?: UiProgressIndicatorProps['render']
}

/** The fill, as wide as the value; it sweeps in the indeterminate state. */
export function ProgressIndicator(props: ProgressIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiProgressIndicator {...rest} class={props.class} render={props.render} />
  )
}
