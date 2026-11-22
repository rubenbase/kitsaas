import type { ComponentProps, JSX } from '@solidjs/web'
import {
  ColorPicker as UiColorPicker,
  ColorPickerArea as UiColorPickerArea,
  ColorPickerAreaCanvas as UiColorPickerAreaCanvas,
  ColorPickerAreaThumb as UiColorPickerAreaThumb,
  ColorPickerChannelInput as UiColorPickerChannelInput,
  ColorPickerEyeDropper as UiColorPickerEyeDropper,
  ColorPickerInput as UiColorPickerInput,
  ColorPickerSlider as UiColorPickerSlider,
  ColorPickerSliderThumb as UiColorPickerSliderThumb,
  ColorPickerSwatch as UiColorPickerSwatch,
  ColorPickerSwatches as UiColorPickerSwatches,
  ColorPickerSwatchItem as UiColorPickerSwatchItem,
  createColorPickerController,
} from '@ui-sdk/solid/color-picker'
import { omit } from 'solid-js'

import './color-picker.css'

export { createColorPickerController }

export type ColorPickerSurface = 'base' | 'layer-1'

type UiColorPickerProps = ComponentProps<typeof UiColorPicker>

export type ColorPickerProps = Omit<UiColorPickerProps, 'class' | 'render'> & {
  /** Renders the picker inside an elevated 256px card container. */
  card?: boolean
  /** Card surface background. Defaults to `base`. */
  surface?: ColorPickerSurface
  class?: UiColorPickerProps['class']
  render?: UiColorPickerProps['render']
}

export function ColorPicker(props: ColorPickerProps) {
  const rest = omit(props, 'card', 'surface', 'class', 'render')

  return (
    <UiColorPicker
      {...rest}
      class={props.class}
      render={props.render}
      data-card={props.card ? '' : undefined}
      data-surface={props.surface ?? 'base'}
    />
  )
}

type UiColorPickerAreaProps = ComponentProps<typeof UiColorPickerArea>

export type ColorPickerAreaProps = Omit<
  UiColorPickerAreaProps,
  'class' | 'render'
> & {
  class?: UiColorPickerAreaProps['class']
  render?: UiColorPickerAreaProps['render']
}

export function ColorPickerArea(props: ColorPickerAreaProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerArea {...rest} class={props.class} render={props.render} />
  )
}

type UiColorPickerAreaCanvasProps = ComponentProps<
  typeof UiColorPickerAreaCanvas
>

export type ColorPickerAreaCanvasProps = Omit<
  UiColorPickerAreaCanvasProps,
  'class' | 'render'
> & {
  class?: UiColorPickerAreaCanvasProps['class']
  render?: UiColorPickerAreaCanvasProps['render']
}

export function ColorPickerAreaCanvas(props: ColorPickerAreaCanvasProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerAreaCanvas
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiColorPickerAreaThumbProps = ComponentProps<typeof UiColorPickerAreaThumb>

export type ColorPickerAreaThumbProps = Omit<
  UiColorPickerAreaThumbProps,
  'class' | 'render'
> & {
  class?: UiColorPickerAreaThumbProps['class']
  render?: UiColorPickerAreaThumbProps['render']
}

export function ColorPickerAreaThumb(props: ColorPickerAreaThumbProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerAreaThumb
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiColorPickerSliderProps = ComponentProps<typeof UiColorPickerSlider>

export type ColorPickerSliderProps = Omit<
  UiColorPickerSliderProps,
  'class' | 'render'
> & {
  class?: UiColorPickerSliderProps['class']
  render?: UiColorPickerSliderProps['render']
}

export function ColorPickerSlider(props: ColorPickerSliderProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerSlider {...rest} class={props.class} render={props.render} />
  )
}

type UiColorPickerSliderThumbProps = ComponentProps<
  typeof UiColorPickerSliderThumb
>

export type ColorPickerSliderThumbProps = Omit<
  UiColorPickerSliderThumbProps,
  'class' | 'render'
> & {
  class?: UiColorPickerSliderThumbProps['class']
  render?: UiColorPickerSliderThumbProps['render']
}

export function ColorPickerSliderThumb(props: ColorPickerSliderThumbProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerSliderThumb
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiColorPickerSwatchProps = ComponentProps<typeof UiColorPickerSwatch>

export type ColorPickerSwatchProps = Omit<
  UiColorPickerSwatchProps,
  'class' | 'render'
> & {
  class?: UiColorPickerSwatchProps['class']
  render?: UiColorPickerSwatchProps['render']
}

export function ColorPickerSwatch(props: ColorPickerSwatchProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerSwatch {...rest} class={props.class} render={props.render} />
  )
}

type UiColorPickerInputProps = ComponentProps<typeof UiColorPickerInput>

export type ColorPickerInputProps = Omit<
  UiColorPickerInputProps,
  'class' | 'render'
> & {
  class?: UiColorPickerInputProps['class']
  render?: UiColorPickerInputProps['render']
}

export function ColorPickerInput(props: ColorPickerInputProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerInput {...rest} class={props.class} render={props.render} />
  )
}

type UiColorPickerChannelInputProps = ComponentProps<
  typeof UiColorPickerChannelInput
>

export type ColorPickerChannelInputProps = Omit<
  UiColorPickerChannelInputProps,
  'class' | 'render'
> & {
  class?: UiColorPickerChannelInputProps['class']
  render?: UiColorPickerChannelInputProps['render']
}

export function ColorPickerChannelInput(props: ColorPickerChannelInputProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerChannelInput
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiColorPickerEyeDropperProps = ComponentProps<
  typeof UiColorPickerEyeDropper
>

export type ColorPickerEyeDropperProps = Omit<
  UiColorPickerEyeDropperProps,
  'class' | 'render' | 'children'
> & {
  class?: UiColorPickerEyeDropperProps['class']
  render?: UiColorPickerEyeDropperProps['render']
  children?: UiColorPickerEyeDropperProps['children']
}

export function ColorPickerEyeDropper(props: ColorPickerEyeDropperProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiColorPickerEyeDropper
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <EyeDropperIcon />}
    </UiColorPickerEyeDropper>
  )
}

type UiColorPickerSwatchesProps = ComponentProps<typeof UiColorPickerSwatches>

export type ColorPickerSwatchesProps = Omit<
  UiColorPickerSwatchesProps,
  'class' | 'render'
> & {
  class?: UiColorPickerSwatchesProps['class']
  render?: UiColorPickerSwatchesProps['render']
}

export function ColorPickerSwatches(props: ColorPickerSwatchesProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerSwatches
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiColorPickerSwatchItemProps = ComponentProps<
  typeof UiColorPickerSwatchItem
>

export type ColorPickerSwatchItemProps = Omit<
  UiColorPickerSwatchItemProps,
  'class' | 'render'
> & {
  class?: UiColorPickerSwatchItemProps['class']
  render?: UiColorPickerSwatchItemProps['render']
}

export function ColorPickerSwatchItem(props: ColorPickerSwatchItemProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiColorPickerSwatchItem
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

function EyeDropperIcon(): JSX.Element {
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
        d="M8.5 5.5L3 11V13H5L10.5 7.5M11.75 2.75C12.3 2.2 13.2 2.2 13.75 2.75C14.3 3.3 14.3 4.2 13.75 4.75L11.5 7L9.5 5L11.75 2.75ZM8.25 4.25L12.25 8.25"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
