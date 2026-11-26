import type { ComponentProps } from '@solidjs/web'
import {
  createTimeInputController,
  TimeInput as UiTimeInput,
  TimeInputSegment as UiTimeInputSegment,
} from '@ui-sdk/solid/time-input'
import { omit } from 'solid-js'

import './time-input.css'

export { createTimeInputController }

export type TimeInputAppearance = 'small' | 'base' | 'large'
export type TimeInputSurface = 'base' | 'layer-1' | 'invisible'

type UiTimeInputProps = ComponentProps<typeof UiTimeInput>

export type TimeInputProps = Omit<UiTimeInputProps, 'class' | 'render'> & {
  /** Control height. Defaults to `base` (28px). */
  appearance?: TimeInputAppearance
  /** Background fill. Defaults to `base`. */
  surface?: TimeInputSurface
  /** Forces the invalid outline without overriding built-in range validation. */
  invalid?: boolean
  class?: UiTimeInputProps['class']
  render?: UiTimeInputProps['render']
}

export function TimeInput(props: TimeInputProps) {
  const rest = omit(props, 'appearance', 'surface', 'invalid', 'class', 'render')

  return (
    <UiTimeInput
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-user-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiTimeInputSegmentProps = ComponentProps<typeof UiTimeInputSegment>

export type TimeInputSegmentProps = Omit<
  UiTimeInputSegmentProps,
  'class' | 'render'
> & {
  class?: UiTimeInputSegmentProps['class']
  render?: UiTimeInputSegmentProps['render']
}

export function TimeInputSegment(props: TimeInputSegmentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTimeInputSegment {...rest} class={props.class} render={props.render} />
  )
}
