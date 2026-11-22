import type { ComponentProps } from '@solidjs/web'
import {
  Slider as UiSlider,
  SliderControl as UiSliderControl,
  SliderIndicator as UiSliderIndicator,
  SliderThumb as UiSliderThumb,
  SliderTrack as UiSliderTrack,
  SliderValue as UiSliderValue,
} from '@ui-sdk/solid/slider'
import { omit } from 'solid-js'

import './slider.css'

export { createSliderController } from '@ui-sdk/solid/slider'
export type {
  NumberFormat,
  SliderApi,
  SliderChangeOptions,
  SliderController,
  SliderOptions,
  SliderPrimitive,
  SliderState,
  SliderThumbProps as UiSliderThumbProps,
  SliderThumbState,
  SliderValueChangeDetails,
  SliderValueChangeReason,
  SliderValueCommitDetails,
  SliderValueState,
} from '@ui-sdk/solid/slider'

export type SliderProps<
  Value extends number | number[] = number | number[],
> = ComponentProps<typeof UiSlider<Value>>

export function Slider<Value extends number | number[] = number | number[]>(
  props: SliderProps<Value>,
) {
  return <UiSlider<Value> {...props} />
}

type UiSliderControlProps = ComponentProps<typeof UiSliderControl>

export type SliderControlProps = Omit<
  UiSliderControlProps,
  'class' | 'render'
> & {
  class?: UiSliderControlProps['class']
  render?: UiSliderControlProps['render']
}

export function SliderControl(props: SliderControlProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSliderControl {...rest} class={props.class} render={props.render} />
}

type UiSliderTrackProps = ComponentProps<typeof UiSliderTrack>

export type SliderTrackProps = Omit<UiSliderTrackProps, 'class' | 'render'> & {
  class?: UiSliderTrackProps['class']
  render?: UiSliderTrackProps['render']
}

export function SliderTrack(props: SliderTrackProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSliderTrack {...rest} class={props.class} render={props.render} />
}

type UiSliderIndicatorProps = ComponentProps<typeof UiSliderIndicator>

export type SliderIndicatorProps = Omit<
  UiSliderIndicatorProps,
  'class' | 'render'
> & {
  class?: UiSliderIndicatorProps['class']
  render?: UiSliderIndicatorProps['render']
}

export function SliderIndicator(props: SliderIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSliderIndicator {...rest} class={props.class} render={props.render} />
  )
}

type UiSliderThumbPartProps = ComponentProps<typeof UiSliderThumb>

export type SliderThumbPartProps = Omit<
  UiSliderThumbPartProps,
  'class' | 'render'
> & {
  class?: UiSliderThumbPartProps['class']
  render?: UiSliderThumbPartProps['render']
}

export function SliderThumb(props: SliderThumbPartProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSliderThumb {...rest} class={props.class} render={props.render} />
}

type UiSliderValueProps = ComponentProps<typeof UiSliderValue>

export type SliderValueProps = Omit<UiSliderValueProps, 'class' | 'render'> & {
  class?: UiSliderValueProps['class']
  render?: UiSliderValueProps['render']
}

export function SliderValue(props: SliderValueProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSliderValue {...rest} class={props.class} render={props.render} />
}
