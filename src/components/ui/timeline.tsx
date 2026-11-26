import type { ComponentProps } from '@solidjs/web'
import {
  createTimelineController,
  Timeline as UiTimeline,
  TimelineConnector as UiTimelineConnector,
  TimelineDescription as UiTimelineDescription,
  TimelineItem as UiTimelineItem,
  TimelineMarker as UiTimelineMarker,
  TimelineTime as UiTimelineTime,
  TimelineTitle as UiTimelineTitle,
} from '@ui-sdk/solid/timeline'
import { omit } from 'solid-js'

import './timeline.css'

export { createTimelineController }
export type {
  TimelineController,
  TimelineOrientation,
  TimelineState,
  TimelineStatus,
} from '@ui-sdk/solid/timeline'

type UiTimelineProps = ComponentProps<typeof UiTimeline>

export type TimelineProps = Omit<UiTimelineProps, 'class' | 'render'> & {
  class?: UiTimelineProps['class']
  render?: UiTimelineProps['render']
}

export function Timeline(props: TimelineProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTimeline {...rest} class={props.class} render={props.render} />
}

type UiTimelineItemProps = ComponentProps<typeof UiTimelineItem>

export type TimelineItemProps = Omit<
  UiTimelineItemProps,
  'class' | 'render'
> & {
  class?: UiTimelineItemProps['class']
  render?: UiTimelineItemProps['render']
}

export function TimelineItem(props: TimelineItemProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTimelineItem {...rest} class={props.class} render={props.render} />
}

type UiTimelineMarkerProps = ComponentProps<typeof UiTimelineMarker>

export type TimelineMarkerProps = Omit<
  UiTimelineMarkerProps,
  'class' | 'render'
> & {
  class?: UiTimelineMarkerProps['class']
  render?: UiTimelineMarkerProps['render']
}

export function TimelineMarker(props: TimelineMarkerProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTimelineMarker {...rest} class={props.class} render={props.render} />
  )
}

type UiTimelineConnectorProps = ComponentProps<typeof UiTimelineConnector>

export type TimelineConnectorProps = Omit<
  UiTimelineConnectorProps,
  'class' | 'render'
> & {
  class?: UiTimelineConnectorProps['class']
  render?: UiTimelineConnectorProps['render']
}

export function TimelineConnector(props: TimelineConnectorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTimelineConnector {...rest} class={props.class} render={props.render} />
  )
}

type UiTimelineTimeProps = ComponentProps<typeof UiTimelineTime>

export type TimelineTimeProps = Omit<
  UiTimelineTimeProps,
  'class' | 'render'
> & {
  class?: UiTimelineTimeProps['class']
  render?: UiTimelineTimeProps['render']
}

export function TimelineTime(props: TimelineTimeProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTimelineTime {...rest} class={props.class} render={props.render} />
}

type UiTimelineTitleProps = ComponentProps<typeof UiTimelineTitle>

export type TimelineTitleProps = Omit<
  UiTimelineTitleProps,
  'class' | 'render'
> & {
  class?: UiTimelineTitleProps['class']
  render?: UiTimelineTitleProps['render']
}

export function TimelineTitle(props: TimelineTitleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTimelineTitle {...rest} class={props.class} render={props.render} />
}

type UiTimelineDescriptionProps = ComponentProps<typeof UiTimelineDescription>

export type TimelineDescriptionProps = Omit<
  UiTimelineDescriptionProps,
  'class' | 'render'
> & {
  class?: UiTimelineDescriptionProps['class']
  render?: UiTimelineDescriptionProps['render']
}

export function TimelineDescription(props: TimelineDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTimelineDescription
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
