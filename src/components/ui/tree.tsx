import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createTreeController,
  toggleTreeChecked,
  Tree as UiTree,
  treeCheckedStates,
  treeFromPaths,
  TreeGroup as UiTreeGroup,
  TreeItem as UiTreeItem,
  TreeItemCheckbox as UiTreeItemCheckbox,
  TreeItemIndicator as UiTreeItemIndicator,
  TreeItemLabel as UiTreeItemLabel,
  TreeItems,
  visibleTreeRows,
  type TreeMode,
  type TreeProps as UiTreeProps,
} from '@ui-sdk/solid/tree'
import { omit } from 'solid-js'

import './tree.css'

export {
  createTreeController,
  toggleTreeChecked,
  treeCheckedStates,
  treeFromPaths,
  TreeItems,
  visibleTreeRows,
}
export type {
  TreeCheckedState,
  TreeCheckStrategy,
  TreeController,
  TreeItemData,
  TreeItemState,
  TreeMode,
  TreeRow,
  TreeState,
  TreeValue,
} from '@ui-sdk/solid/tree'

export type TreeProps<Mode extends TreeMode = 'single'> = UiTreeProps<Mode>

export function Tree<Mode extends TreeMode = 'single'>(props: TreeProps<Mode>) {
  return <UiTree {...props} />
}

type UiTreeItemProps = ComponentProps<typeof UiTreeItem>

export type TreeItemProps = Omit<UiTreeItemProps, 'class' | 'render'> & {
  class?: UiTreeItemProps['class']
  render?: UiTreeItemProps['render']
}

export function TreeItem(props: TreeItemProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTreeItem {...rest} class={props.class} render={props.render} />
}

type UiTreeItemLabelProps = ComponentProps<typeof UiTreeItemLabel>

export type TreeItemLabelProps = Omit<
  UiTreeItemLabelProps,
  'class' | 'render'
> & {
  class?: UiTreeItemLabelProps['class']
  render?: UiTreeItemLabelProps['render']
}

export function TreeItemLabel(props: TreeItemLabelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTreeItemLabel {...rest} class={props.class} render={props.render} />
}

type UiTreeItemIndicatorProps = ComponentProps<typeof UiTreeItemIndicator>

export type TreeItemIndicatorProps = Omit<
  UiTreeItemIndicatorProps,
  'class' | 'render' | 'children'
> & {
  class?: UiTreeItemIndicatorProps['class']
  render?: UiTreeItemIndicatorProps['render']
  children?: UiTreeItemIndicatorProps['children']
}

export function TreeItemIndicator(props: TreeItemIndicatorProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiTreeItemIndicator {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ChevronRight />)
      }
    </UiTreeItemIndicator>
  )
}

type UiTreeItemCheckboxProps = ComponentProps<typeof UiTreeItemCheckbox>

export type TreeItemCheckboxProps = Omit<
  UiTreeItemCheckboxProps,
  'class' | 'render' | 'children'
> & {
  class?: UiTreeItemCheckboxProps['class']
  render?: UiTreeItemCheckboxProps['render']
  children?: UiTreeItemCheckboxProps['children']
}

export function TreeItemCheckbox(props: TreeItemCheckboxProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiTreeItemCheckbox {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ??
            (state.checked === 'indeterminate' ? (
              <MinusIcon />
            ) : state.checked ? (
              <CheckIcon />
            ) : null))
      }
    </UiTreeItemCheckbox>
  )
}

type UiTreeGroupProps = ComponentProps<typeof UiTreeGroup>

export type TreeGroupProps = Omit<UiTreeGroupProps, 'class' | 'render'> & {
  class?: UiTreeGroupProps['class']
  render?: UiTreeGroupProps['render']
}

export function TreeGroup(props: TreeGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTreeGroup {...rest} class={props.class} render={props.render} />
}

function ChevronRight(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
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

function CheckIcon(): JSX.Element {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.75 6.5L5 8.75L9.25 3.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function MinusIcon(): JSX.Element {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 6H9"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  )
}
