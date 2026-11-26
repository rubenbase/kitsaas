import type { ComponentProps } from '@solidjs/web'
import {
  createDateInputController,
  DateInput as UiDateInput,
  DateInputSegment as UiDateInputSegment,
} from '@ui-sdk/solid/date-input'
import { omit } from 'solid-js'

import './date-input.css'

export { createDateInputController }

export type DateInputAppearance = 'small' | 'base' | 'large'
export type DateInputSurface = 'base' | 'layer-1' | 'invisible'

type UiDateInputProps = ComponentProps<typeof UiDateInput>

export type DateInputProps = Omit<UiDateInputProps, 'class' | 'render'> & {
  /** Control height. Defaults to `base` (28px). */
  appearance?: DateInputAppearance
  /** Background fill. Defaults to `base`. */
  surface?: DateInputSurface
  /** Forces the invalid outline without overriding built-in range validation. */
  invalid?: boolean
  class?: UiDateInputProps['class']
  render?: UiDateInputProps['render']
}

export function DateInput(props: DateInputProps) {
  const rest = omit(props, 'appearance', 'surface', 'invalid', 'class', 'render')

  return (
    <UiDateInput
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-user-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiDateInputSegmentProps = ComponentProps<typeof UiDateInputSegment>

export type DateInputSegmentProps = Omit<
  UiDateInputSegmentProps,
  'class' | 'render'
> & {
  class?: UiDateInputSegmentProps['class']
  render?: UiDateInputSegmentProps['render']
}

export function DateInputSegment(props: DateInputSegmentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDateInputSegment {...rest} class={props.class} render={props.render} />
  )
}
