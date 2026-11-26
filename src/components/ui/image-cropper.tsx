import type { ComponentProps } from '@solidjs/web'
import {
  createImageCropperController,
  ImageCropper as UiImageCropper,
  ImageCropperFlip as UiImageCropperFlip,
  ImageCropperGrid as UiImageCropperGrid,
  ImageCropperHandle as UiImageCropperHandle,
  ImageCropperImage as UiImageCropperImage,
  ImageCropperRotate as UiImageCropperRotate,
  ImageCropperSelection as UiImageCropperSelection,
  ImageCropperViewport as UiImageCropperViewport,
  ImageCropperZoom as UiImageCropperZoom,
} from '@ui-sdk/solid/image-cropper'
import { omit } from 'solid-js'

import './image-cropper.css'

export { createImageCropperController }
export type {
  ImageCrop,
  ImageCropperController,
  ImageCropperFlipDirection,
  ImageCropperHandlePosition,
  ImageCropperMode,
  ImageCropperShape,
  ImageCropperState,
  ImageRotation,
} from '@ui-sdk/solid/image-cropper'

type UiImageCropperProps = ComponentProps<typeof UiImageCropper>

export type ImageCropperProps = Omit<
  UiImageCropperProps,
  'class' | 'render'
> & {
  class?: UiImageCropperProps['class']
  render?: UiImageCropperProps['render']
}

export function ImageCropper(props: ImageCropperProps) {
  const rest = omit(props, 'class', 'render')

  return <UiImageCropper {...rest} class={props.class} render={props.render} />
}

type UiImageCropperViewportProps = ComponentProps<typeof UiImageCropperViewport>

export type ImageCropperViewportProps = Omit<
  UiImageCropperViewportProps,
  'class' | 'render'
> & {
  class?: UiImageCropperViewportProps['class']
  render?: UiImageCropperViewportProps['render']
}

export function ImageCropperViewport(props: ImageCropperViewportProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperViewport
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiImageCropperImageProps = ComponentProps<typeof UiImageCropperImage>

export type ImageCropperImageProps = Omit<
  UiImageCropperImageProps,
  'class' | 'render'
> & {
  class?: UiImageCropperImageProps['class']
  render?: UiImageCropperImageProps['render']
}

export function ImageCropperImage(props: ImageCropperImageProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperImage {...rest} class={props.class} render={props.render} />
  )
}

type UiImageCropperSelectionProps = ComponentProps<
  typeof UiImageCropperSelection
>

export type ImageCropperSelectionProps = Omit<
  UiImageCropperSelectionProps,
  'class' | 'render'
> & {
  class?: UiImageCropperSelectionProps['class']
  render?: UiImageCropperSelectionProps['render']
}

export function ImageCropperSelection(props: ImageCropperSelectionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperSelection
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiImageCropperGridProps = ComponentProps<typeof UiImageCropperGrid>

export type ImageCropperGridProps = Omit<
  UiImageCropperGridProps,
  'class' | 'render'
> & {
  class?: UiImageCropperGridProps['class']
  render?: UiImageCropperGridProps['render']
}

export function ImageCropperGrid(props: ImageCropperGridProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperGrid {...rest} class={props.class} render={props.render} />
  )
}

type UiImageCropperHandleProps = ComponentProps<typeof UiImageCropperHandle>

export type ImageCropperHandleProps = Omit<
  UiImageCropperHandleProps,
  'class' | 'render'
> & {
  class?: UiImageCropperHandleProps['class']
  render?: UiImageCropperHandleProps['render']
}

export function ImageCropperHandle(props: ImageCropperHandleProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperHandle {...rest} class={props.class} render={props.render} />
  )
}

type UiImageCropperZoomProps = ComponentProps<typeof UiImageCropperZoom>

export type ImageCropperZoomProps = Omit<
  UiImageCropperZoomProps,
  'class' | 'render'
> & {
  class?: UiImageCropperZoomProps['class']
  render?: UiImageCropperZoomProps['render']
}

export function ImageCropperZoom(props: ImageCropperZoomProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperZoom {...rest} class={props.class} render={props.render} />
  )
}

type UiImageCropperRotateProps = ComponentProps<typeof UiImageCropperRotate>

export type ImageCropperRotateProps = Omit<
  UiImageCropperRotateProps,
  'class' | 'render'
> & {
  class?: UiImageCropperRotateProps['class']
  render?: UiImageCropperRotateProps['render']
}

export function ImageCropperRotate(props: ImageCropperRotateProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperRotate {...rest} class={props.class} render={props.render} />
  )
}

type UiImageCropperFlipProps = ComponentProps<typeof UiImageCropperFlip>

export type ImageCropperFlipProps = Omit<
  UiImageCropperFlipProps,
  'class' | 'render'
> & {
  class?: UiImageCropperFlipProps['class']
  render?: UiImageCropperFlipProps['render']
}

export function ImageCropperFlip(props: ImageCropperFlipProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiImageCropperFlip {...rest} class={props.class} render={props.render} />
  )
}
