import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createRatingController,
  Rating as UiRating,
  RatingItem as UiRatingItem,
} from '@ui-sdk/solid/rating'
import { omit } from 'solid-js'

import './rating.css'

export { createRatingController }
export type {
  RatingController,
  RatingItemState,
  RatingOptions,
  RatingState,
} from '@ui-sdk/solid/rating'

export type RatingSize = 'small' | 'normal' | 'large'
export type RatingTone = 'amber' | 'neutral'

type UiRatingProps = ComponentProps<typeof UiRating>

export type RatingProps = Omit<
  UiRatingProps,
  'class' | 'render' | 'children'
> & {
  /** Star icon dimensions. Defaults to `normal` (20px). */
  size?: RatingSize
  /** Filled star accent. Defaults to `amber` (`--v2-yellow-600`). */
  tone?: RatingTone
  class?: UiRatingProps['class']
  render?: UiRatingProps['render']
  children?: UiRatingProps['children']
}

export function Rating(props: RatingProps) {
  const rest = omit(props, 'size', 'tone', 'class', 'render', 'children')

  return (
    <UiRating
      {...rest}
      class={props.class}
      render={props.render}
      data-size={props.size ?? 'normal'}
      data-tone={props.tone ?? 'amber'}
    >
      {props.children ?? <RatingItem />}
    </UiRating>
  )
}

type UiRatingItemProps = ComponentProps<typeof UiRatingItem>

export type RatingItemProps = Omit<
  UiRatingItemProps,
  'class' | 'render' | 'children'
> & {
  class?: UiRatingItemProps['class']
  render?: UiRatingItemProps['render']
  children?: UiRatingItemProps['children']
}

export function RatingItem(props: RatingItemProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiRatingItem {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <DefaultStar />)
      }
    </UiRatingItem>
  )
}

const STAR_PATH =
  'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'

function DefaultStar(): JSX.Element {
  return (
    <span data-slot="rating-star" aria-hidden="true">
      <svg
        data-slot="rating-star-empty"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d={STAR_PATH} />
      </svg>
      <svg
        data-slot="rating-star-filled"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d={STAR_PATH} />
      </svg>
    </span>
  )
}
