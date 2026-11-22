import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createPaginationController,
  Pagination as UiPagination,
  PaginationEllipsis as UiPaginationEllipsis,
  PaginationFirst as UiPaginationFirst,
  PaginationItem as UiPaginationItem,
  PaginationLast as UiPaginationLast,
  PaginationLink as UiPaginationLink,
  PaginationList as UiPaginationList,
  PaginationNext as UiPaginationNext,
  PaginationPrevious as UiPaginationPrevious,
  paginationRange,
  type PaginationChangeOptions,
  type PaginationController,
  type PaginationLinkProps as UiPaginationLinkOptions,
  type PaginationLinkState,
  type PaginationOptions,
  type PaginationPageChangeReason,
  type PaginationPrimitive,
  type PaginationRangeItem,
  type PaginationRangeOptions,
  type PaginationState,
  type PaginationStepState,
} from '@ui-sdk/solid/pagination'
import { omit } from 'solid-js'

import './pagination.css'

export type PaginationSize = 'small' | 'normal' | 'large'
export type PaginationShape = 'square' | 'pill'
export type PaginationVariant = 'neutral' | 'contrast'

type UiPaginationProps = ComponentProps<typeof UiPagination>

export type PaginationProps = Omit<UiPaginationProps, 'class' | 'render'> & {
  /** Control size. Defaults to `normal` (28px). */
  size?: PaginationSize
  /** Corner style. Defaults to `square` (6px). */
  shape?: PaginationShape
  /** Active page fill. Defaults to `neutral` (`--v2-background-bg-layer-03`). */
  variant?: PaginationVariant
  class?: UiPaginationProps['class']
  render?: UiPaginationProps['render']
}

export function Pagination(props: PaginationProps) {
  const rest = omit(props, 'size', 'shape', 'variant', 'class', 'render')

  return (
    <UiPagination
      {...rest}
      class={props.class}
      render={props.render}
      data-size={props.size ?? 'normal'}
      data-shape={props.shape ?? 'square'}
      data-variant={props.variant ?? 'neutral'}
    />
  )
}

type UiPaginationListProps = ComponentProps<typeof UiPaginationList>

export type PaginationListProps = Omit<
  UiPaginationListProps,
  'class' | 'render'
> & {
  class?: UiPaginationListProps['class']
  render?: UiPaginationListProps['render']
}

export function PaginationList(props: PaginationListProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPaginationList {...rest} class={props.class} render={props.render} />
}

type UiPaginationItemProps = ComponentProps<typeof UiPaginationItem>

export type PaginationItemProps = Omit<
  UiPaginationItemProps,
  'class' | 'render'
> & {
  class?: UiPaginationItemProps['class']
  render?: UiPaginationItemProps['render']
}

export function PaginationItem(props: PaginationItemProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPaginationItem {...rest} class={props.class} render={props.render} />
}

type UiPaginationLinkProps = ComponentProps<typeof UiPaginationLink>

export type PaginationLinkProps = Omit<
  UiPaginationLinkProps,
  'class' | 'render'
> & {
  class?: UiPaginationLinkProps['class']
  render?: UiPaginationLinkProps['render']
}

export function PaginationLink(props: PaginationLinkProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPaginationLink {...rest} class={props.class} render={props.render} />
}

type UiPaginationPreviousProps = ComponentProps<typeof UiPaginationPrevious>

export type PaginationPreviousProps = Omit<
  UiPaginationPreviousProps,
  'class' | 'render' | 'children'
> & {
  class?: UiPaginationPreviousProps['class']
  render?: UiPaginationPreviousProps['render']
  children?: UiPaginationPreviousProps['children']
}

export function PaginationPrevious(props: PaginationPreviousProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiPaginationPrevious
      {...rest}
      aria-label={
        props['aria-label'] ??
        (props.children === undefined ? 'Previous page' : undefined)
      }
      class={props.class}
      render={props.render}
    >
      {props.children === undefined ? <ChevronLeft /> : props.children}
    </UiPaginationPrevious>
  )
}

type UiPaginationNextProps = ComponentProps<typeof UiPaginationNext>

export type PaginationNextProps = Omit<
  UiPaginationNextProps,
  'class' | 'render' | 'children'
> & {
  class?: UiPaginationNextProps['class']
  render?: UiPaginationNextProps['render']
  children?: UiPaginationNextProps['children']
}

export function PaginationNext(props: PaginationNextProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiPaginationNext
      {...rest}
      aria-label={
        props['aria-label'] ??
        (props.children === undefined ? 'Next page' : undefined)
      }
      class={props.class}
      render={props.render}
    >
      {props.children === undefined ? <ChevronRight /> : props.children}
    </UiPaginationNext>
  )
}

type UiPaginationFirstProps = ComponentProps<typeof UiPaginationFirst>

export type PaginationFirstProps = Omit<
  UiPaginationFirstProps,
  'class' | 'render' | 'children'
> & {
  class?: UiPaginationFirstProps['class']
  render?: UiPaginationFirstProps['render']
  children?: UiPaginationFirstProps['children']
}

export function PaginationFirst(props: PaginationFirstProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiPaginationFirst
      {...rest}
      aria-label={
        props['aria-label'] ??
        (props.children === undefined ? 'First page' : undefined)
      }
      class={props.class}
      render={props.render}
    >
      {props.children === undefined ? <ChevronsLeft /> : props.children}
    </UiPaginationFirst>
  )
}

type UiPaginationLastProps = ComponentProps<typeof UiPaginationLast>

export type PaginationLastProps = Omit<
  UiPaginationLastProps,
  'class' | 'render' | 'children'
> & {
  class?: UiPaginationLastProps['class']
  render?: UiPaginationLastProps['render']
  children?: UiPaginationLastProps['children']
}

export function PaginationLast(props: PaginationLastProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiPaginationLast
      {...rest}
      aria-label={
        props['aria-label'] ??
        (props.children === undefined ? 'Last page' : undefined)
      }
      class={props.class}
      render={props.render}
    >
      {props.children === undefined ? <ChevronsRight /> : props.children}
    </UiPaginationLast>
  )
}

type UiPaginationEllipsisProps = ComponentProps<typeof UiPaginationEllipsis>

export type PaginationEllipsisProps = Omit<
  UiPaginationEllipsisProps,
  'class' | 'render'
> & {
  class?: UiPaginationEllipsisProps['class']
  render?: UiPaginationEllipsisProps['render']
}

export function PaginationEllipsis(props: PaginationEllipsisProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiPaginationEllipsis {...rest} class={props.class} render={props.render} />
  )
}

function ChevronLeft(): JSX.Element {
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
        d="M9.75 4.25L6 8L9.75 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronRight(): JSX.Element {
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
        d="M6.25 4.25L10 8L6.25 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronsLeft(): JSX.Element {
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
        d="M8.5 4.25L4.75 8L8.5 11.75M12 4.25L8.25 8L12 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronsRight(): JSX.Element {
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
        d="M4 4.25L7.75 8L4 11.75M7.5 4.25L11.25 8L7.5 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export { createPaginationController, paginationRange }
export type {
  PaginationChangeOptions,
  PaginationController,
  PaginationLinkState,
  PaginationOptions,
  PaginationPageChangeReason,
  PaginationPrimitive,
  PaginationRangeItem,
  PaginationRangeOptions,
  PaginationState,
  PaginationStepState,
  UiPaginationLinkOptions,
}
