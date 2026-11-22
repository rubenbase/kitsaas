import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Select as UiSelect,
  SelectContent as UiSelectContent,
  SelectGroup as UiSelectGroup,
  SelectGroupLabel as UiSelectGroupLabel,
  SelectItem as UiSelectItem,
  SelectItemIndicator as UiSelectItemIndicator,
  SelectLabel as UiSelectLabel,
  SelectSeparator as UiSelectSeparator,
  SelectTrigger as UiSelectTrigger,
  SelectValue as UiSelectValue,
} from '@ui-sdk/solid/select'
import { omit } from 'solid-js'

import './select.css'

/**
 * Select, a 1:1 port of opencode's Select (`@opencode/ui`, MIT):
 * `packages/ui/src/forms/select` (`select-v2`).
 *
 * Styling lives in `select.css` as attribute rules (`data-appearance`,
 * `data-surface`, `data-invalid`, `data-numeric`, `data-open`,
 * `data-placeholder`, `data-highlighted`, `data-selected`, `data-disabled`),
 * so every trigger and item state — rest, hover, expanded, focus, invalid,
 * disabled, placeholder shown — matches upstream. Behaviour (open, keyboard
 * navigation and typeahead, selection, form value, ARIA wiring) comes from
 * `@ui-sdk/solid`.
 *
 * Upstream's Select is single-select: it hardcodes `multiple={false}` on
 * Kobalte, and `select.css` has no multiple rules. ui-sdk does support
 * `multiple`, so Kitsaas exposes it as-is: the value becomes an array, the
 * list stays open while you toggle items, and `SelectValue` summarizes a long
 * selection (`maxLabels`, `getMoreLabel`). The summary styling is upstream's
 * value box, so it needs no new rules.
 *
 * Upstream renders the whole control as one component with a chevron and a
 * `Value` part. ui-sdk splits it into parts, so the trigger takes the chevron
 * itself and `SelectValue` carries upstream's value-text box:
 *
 *   <Select items={fruits} placeholder="Pick a fruit">
 *     <SelectLabel>Fruit</SelectLabel>
 *     <SelectTrigger>
 *       <SelectValue />
 *     </SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="apple">Apple</SelectItem>
 *     </SelectContent>
 *   </Select>
 */

export type SelectAppearance = 'inline' | 'small' | 'base' | 'large'
export type SelectSurface = 'base' | 'layer-1' | 'invisible'

type UiSelectProps = ComponentProps<typeof UiSelect>

export type SelectProps = UiSelectProps

export function Select(props: SelectProps) {
  return <UiSelect {...props} />
}

type UiSelectLabelProps = ComponentProps<typeof UiSelectLabel>

export type SelectLabelProps = Omit<UiSelectLabelProps, 'class' | 'render'> & {
  class?: UiSelectLabelProps['class']
  render?: UiSelectLabelProps['render']
}

export function SelectLabel(props: SelectLabelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSelectLabel {...rest} class={props.class} render={props.render} />
}

type UiSelectTriggerProps = ComponentProps<typeof UiSelectTrigger>

export type SelectTriggerProps = Omit<
  UiSelectTriggerProps,
  'class' | 'render' | 'children'
> & {
  /** Defaults to `inline`, like opencode's select. */
  appearance?: SelectAppearance
  /** Fill of a field trigger; ignored by `inline`. Defaults to `base`. */
  surface?: SelectSurface
  /** Marks the outline and the value red, like upstream's `invalid`. */
  invalid?: boolean
  /** Applies tabular numerals to the value. */
  numeric?: boolean
  class?: UiSelectTriggerProps['class']
  render?: UiSelectTriggerProps['render']
  children?: UiSelectTriggerProps['children']
}

export function SelectTrigger(props: SelectTriggerProps) {
  const rest = omit(
    props,
    'appearance',
    'surface',
    'invalid',
    'numeric',
    'class',
    'render',
    'children',
  )

  const appearance = () => props.appearance ?? 'inline'

  return (
    <UiSelectTrigger
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={appearance()}
      data-surface={
        appearance() === 'inline' ? undefined : (props.surface ?? 'base')
      }
      data-invalid={props.invalid ? '' : undefined}
      data-numeric={props.numeric ? '' : undefined}
    >
      {(state) => (
        <>
          {typeof props.children === 'function'
            ? props.children(state)
            : (props.children ?? <SelectValue />)}
          <span data-slot="select-chevron" aria-hidden="true">
            <ChevronDown />
          </span>
        </>
      )}
    </UiSelectTrigger>
  )
}

type UiSelectValueProps = ComponentProps<typeof UiSelectValue>

export type SelectValueProps = Omit<UiSelectValueProps, 'class' | 'render'> & {
  class?: UiSelectValueProps['class']
  render?: UiSelectValueProps['render']
  /**
   * With `multiple`, how many labels to show before summarizing the rest.
   * Defaults to 2.
   */
  maxLabels?: number
  /** Writes the summary for the labels past `maxLabels`. Defaults to "N more". */
  getMoreLabel?: (count: number) => string
}

export function SelectValue(props: SelectValueProps) {
  const rest = omit(props, 'class', 'render', 'maxLabels', 'getMoreLabel')

  return (
    <span data-slot="select-trigger-value">
      <UiSelectValue
        {...rest}
        class={props.class}
        render={props.render}
        maxLabels={props.maxLabels ?? 2}
        getMoreLabel={props.getMoreLabel ?? ((count) => `${count} more`)}
      />
    </span>
  )
}

type UiSelectContentProps = ComponentProps<typeof UiSelectContent>

export type SelectContentProps = Omit<
  UiSelectContentProps,
  'class' | 'render'
> & {
  class?: UiSelectContentProps['class']
  render?: UiSelectContentProps['render']
}

export function SelectContent(props: SelectContentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSelectContent
      {...rest}
      class={props.class}
      render={props.render}
      data-scrollable
    />
  )
}

type UiSelectGroupProps = ComponentProps<typeof UiSelectGroup>

export type SelectGroupProps = Omit<UiSelectGroupProps, 'class' | 'render'> & {
  class?: UiSelectGroupProps['class']
  render?: UiSelectGroupProps['render']
}

export function SelectGroup(props: SelectGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSelectGroup {...rest} class={props.class} render={props.render} />
}

type UiSelectGroupLabelProps = ComponentProps<typeof UiSelectGroupLabel>

export type SelectGroupLabelProps = Omit<
  UiSelectGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiSelectGroupLabelProps['class']
  render?: UiSelectGroupLabelProps['render']
}

export function SelectGroupLabel(props: SelectGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSelectGroupLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiSelectSeparatorProps = ComponentProps<typeof UiSelectSeparator>

export type SelectSeparatorProps = Omit<
  UiSelectSeparatorProps,
  'class' | 'render'
> & {
  class?: UiSelectSeparatorProps['class']
  render?: UiSelectSeparatorProps['render']
}

export function SelectSeparator(props: SelectSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSelectSeparator {...rest} class={props.class} render={props.render} />
  )
}

type UiSelectItemProps = ComponentProps<typeof UiSelectItem>

export type SelectItemProps = Omit<
  UiSelectItemProps,
  'class' | 'render' | 'children'
> & {
  class?: UiSelectItemProps['class']
  render?: UiSelectItemProps['render']
  children?: UiSelectItemProps['children']
}

export function SelectItem(props: SelectItemProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiSelectItem {...rest} class={props.class} render={props.render}>
      {(state) => (
        <>
          <span data-slot="menu-item-content">
            {typeof props.children === 'function'
              ? props.children(state)
              : props.children}
          </span>
          <UiSelectItemIndicator keepMounted>
            <span data-slot="menu-item-indicator">
              <CheckMark />
            </span>
          </UiSelectItemIndicator>
        </>
      )}
    </UiSelectItem>
  )
}

/** Upstream's chevron: points down at rest, up while the list is open. */
function ChevronDown(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11 9.5L8 6.5L5 9.5"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

/** Upstream's check mark inside a selected item. */
function CheckMark(): JSX.Element {
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
        d="M3.53564 8.17857L6.39279 11.75L12.4642 4.25"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
