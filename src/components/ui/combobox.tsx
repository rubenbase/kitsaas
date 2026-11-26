import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Combobox as UiCombobox,
  ComboboxArrow as UiComboboxArrow,
  ComboboxChip as UiComboboxChip,
  ComboboxChipRemove as UiComboboxChipRemove,
  ComboboxChips as UiComboboxChips,
  ComboboxChipsOverflow as UiComboboxChipsOverflow,
  ComboboxClear as UiComboboxClear,
  ComboboxContent as UiComboboxContent,
  ComboboxCreate as UiComboboxCreate,
  ComboboxEmpty as UiComboboxEmpty,
  ComboboxGroup as UiComboboxGroup,
  ComboboxGroupLabel as UiComboboxGroupLabel,
  ComboboxInput as UiComboboxInput,
  ComboboxItem as UiComboboxItem,
  ComboboxItemIcon as UiComboboxItemIcon,
  ComboboxItemIndicator as UiComboboxItemIndicator,
  ComboboxItems,
  ComboboxItemText as UiComboboxItemText,
  ComboboxLabel as UiComboboxLabel,
  ComboboxList as UiComboboxList,
  ComboboxSelectAll as UiComboboxSelectAll,
  ComboboxSeparator as UiComboboxSeparator,
  ComboboxStatus as UiComboboxStatus,
  ComboboxTrigger as UiComboboxTrigger,
  ComboboxValue as UiComboboxValue,
  ComboboxValueIcon as UiComboboxValueIcon,
  createComboboxController,
  type ComboboxProps as UiComboboxProps,
} from '@ui-sdk/solid/combobox'
import { omit, Show } from 'solid-js'

import './combobox.css'

export type ComboboxAppearance = 'small' | 'base' | 'large'
export type ComboboxSurface = 'base' | 'layer-1' | 'invisible'

export type ComboboxProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = UiComboboxProps<T, Multiple>

export function Combobox<
  T = string,
  Multiple extends boolean | undefined = false,
>(props: ComboboxProps<T, Multiple>) {
  return <UiCombobox<T, Multiple> {...props} />
}

type UiComboboxLabelProps = ComponentProps<typeof UiComboboxLabel>

export type ComboboxLabelProps = Omit<
  UiComboboxLabelProps,
  'class' | 'render'
> & {
  class?: UiComboboxLabelProps['class']
  render?: UiComboboxLabelProps['render']
}

export function ComboboxLabel(props: ComboboxLabelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiComboboxLabel {...rest} class={props.class} render={props.render} />
}

export type ComboboxControlProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /** Defaults to `base` (28px). */
  appearance?: ComboboxAppearance
  /** Background fill. Defaults to `base`. */
  surface?: ComboboxSurface
  /** Marks the outline and input text red. */
  invalid?: boolean
  /** Marks the control container disabled. */
  disabled?: boolean
  /** Optional leading icon shown before the input. */
  leadingIcon?: JSX.Element
  children?: JSX.Element
}

export function ComboboxControl(props: ComboboxControlProps) {
  const rest = omit(
    props,
    'appearance',
    'surface',
    'invalid',
    'disabled',
    'leadingIcon',
    'children',
  )

  return (
    <div
      {...rest}
      data-slot="combobox-control"
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      data-leading-icon={props.leadingIcon ? '' : undefined}
    >
      <Show when={props.leadingIcon}>
        <span data-slot="combobox-leading-icon" aria-hidden="true">
          {props.leadingIcon}
        </span>
      </Show>
      {props.children}
    </div>
  )
}

type UiComboboxInputProps = ComponentProps<typeof UiComboboxInput>

export type ComboboxInputProps = Omit<
  UiComboboxInputProps,
  'class' | 'render'
> & {
  /** Marks the field invalid for assistive tech. */
  invalid?: boolean
  class?: UiComboboxInputProps['class']
  render?: UiComboboxInputProps['render']
}

export function ComboboxInput(props: ComboboxInputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiComboboxInput
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiComboboxTriggerProps = ComponentProps<typeof UiComboboxTrigger>

export type ComboboxTriggerProps = Omit<
  UiComboboxTriggerProps,
  'class' | 'render' | 'children'
> & {
  class?: UiComboboxTriggerProps['class']
  render?: UiComboboxTriggerProps['render']
  children?: UiComboboxTriggerProps['children']
}

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiComboboxTrigger {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? (
              <span data-slot="combobox-chevron" aria-hidden="true">
                <ChevronDown />
              </span>
            ))
      }
    </UiComboboxTrigger>
  )
}

type UiComboboxClearProps = ComponentProps<typeof UiComboboxClear>

export type ComboboxClearProps = Omit<
  UiComboboxClearProps,
  'class' | 'render' | 'children'
> & {
  class?: UiComboboxClearProps['class']
  render?: UiComboboxClearProps['render']
  children?: UiComboboxClearProps['children']
}

export function ComboboxClear(props: ComboboxClearProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiComboboxClear {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ClearIcon />)
      }
    </UiComboboxClear>
  )
}

type UiComboboxContentProps = ComponentProps<typeof UiComboboxContent>

export type ComboboxContentProps = Omit<
  UiComboboxContentProps,
  'class' | 'render'
> & {
  class?: UiComboboxContentProps['class']
  render?: UiComboboxContentProps['render']
}

export function ComboboxContent(props: ComboboxContentProps) {
  const rest = omit(props, 'class', 'render', 'sideOffset')

  return (
    <UiComboboxContent
      {...rest}
      sideOffset={props.sideOffset ?? 4}
      class={props.class}
      render={props.render}
    />
  )
}

type UiComboboxListProps = ComponentProps<typeof UiComboboxList>

export type ComboboxListProps = Omit<
  UiComboboxListProps,
  'class' | 'render'
> & {
  class?: UiComboboxListProps['class']
  render?: UiComboboxListProps['render']
}

export function ComboboxList(props: ComboboxListProps) {
  const rest = omit(props, 'class', 'render')

  return <UiComboboxList {...rest} class={props.class} render={props.render} />
}

type BaseComboboxItemProps = ComponentProps<typeof UiComboboxItem>

export type ComboboxItemProps<T = string> = Omit<
  BaseComboboxItemProps,
  'value' | 'class' | 'render'
> & {
  value: T
  class?: BaseComboboxItemProps['class']
  render?: BaseComboboxItemProps['render']
}

export function ComboboxItem<T = string>(props: ComboboxItemProps<T>) {
  const rest = omit(props, 'value', 'class', 'render')

  return (
    <UiComboboxItem<T>
      {...rest}
      value={props.value}
      class={props.class}
      render={props.render}
    />
  )
}

type UiComboboxItemIndicatorProps = ComponentProps<
  typeof UiComboboxItemIndicator
>

export type ComboboxItemIndicatorProps = Omit<
  UiComboboxItemIndicatorProps,
  'class' | 'render' | 'children'
> & {
  class?: UiComboboxItemIndicatorProps['class']
  render?: UiComboboxItemIndicatorProps['render']
  children?: UiComboboxItemIndicatorProps['children']
}

export function ComboboxItemIndicator(props: ComboboxItemIndicatorProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiComboboxItemIndicator
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <CheckMark />)
      }
    </UiComboboxItemIndicator>
  )
}

type UiComboboxItemTextProps = ComponentProps<typeof UiComboboxItemText>

export type ComboboxItemTextProps = Omit<
  UiComboboxItemTextProps,
  'class' | 'render'
> & {
  class?: UiComboboxItemTextProps['class']
  render?: UiComboboxItemTextProps['render']
}

export function ComboboxItemText(props: ComboboxItemTextProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxItemText {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxItemIconProps = ComponentProps<typeof UiComboboxItemIcon>

export type ComboboxItemIconProps = Omit<
  UiComboboxItemIconProps,
  'class' | 'render'
> & {
  class?: UiComboboxItemIconProps['class']
  render?: UiComboboxItemIconProps['render']
}

export function ComboboxItemIcon(props: ComboboxItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxItemIcon {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxValueIconProps = ComponentProps<typeof UiComboboxValueIcon>

export type ComboboxValueIconProps = Omit<
  UiComboboxValueIconProps,
  'class' | 'render'
> & {
  class?: UiComboboxValueIconProps['class']
  render?: UiComboboxValueIconProps['render']
}

export function ComboboxValueIcon(props: ComboboxValueIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxValueIcon {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxSelectAllProps = ComponentProps<typeof UiComboboxSelectAll>

export type ComboboxSelectAllProps = Omit<
  UiComboboxSelectAllProps,
  'class' | 'render'
> & {
  class?: UiComboboxSelectAllProps['class']
  render?: UiComboboxSelectAllProps['render']
}

export function ComboboxSelectAll(props: ComboboxSelectAllProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxSelectAll {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxGroupProps = ComponentProps<typeof UiComboboxGroup>

export type ComboboxGroupProps = Omit<
  UiComboboxGroupProps,
  'class' | 'render'
> & {
  class?: UiComboboxGroupProps['class']
  render?: UiComboboxGroupProps['render']
}

export function ComboboxGroup(props: ComboboxGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiComboboxGroup {...rest} class={props.class} render={props.render} />
}

type UiComboboxGroupLabelProps = ComponentProps<typeof UiComboboxGroupLabel>

export type ComboboxGroupLabelProps = Omit<
  UiComboboxGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiComboboxGroupLabelProps['class']
  render?: UiComboboxGroupLabelProps['render']
}

export function ComboboxGroupLabel(props: ComboboxGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxGroupLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxSeparatorProps = ComponentProps<typeof UiComboboxSeparator>

export type ComboboxSeparatorProps = Omit<
  UiComboboxSeparatorProps,
  'class' | 'render'
> & {
  class?: UiComboboxSeparatorProps['class']
  render?: UiComboboxSeparatorProps['render']
}

export function ComboboxSeparator(props: ComboboxSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxSeparator {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxCreateProps = ComponentProps<typeof UiComboboxCreate>

export type ComboboxCreateProps = Omit<
  UiComboboxCreateProps,
  'class' | 'render'
> & {
  class?: UiComboboxCreateProps['class']
  render?: UiComboboxCreateProps['render']
}

export function ComboboxCreate(props: ComboboxCreateProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxCreate {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxEmptyProps = ComponentProps<typeof UiComboboxEmpty>

export type ComboboxEmptyProps = Omit<
  UiComboboxEmptyProps,
  'class' | 'render'
> & {
  class?: UiComboboxEmptyProps['class']
  render?: UiComboboxEmptyProps['render']
}

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const rest = omit(props, 'class', 'render')

  return <UiComboboxEmpty {...rest} class={props.class} render={props.render} />
}

type UiComboboxStatusProps = ComponentProps<typeof UiComboboxStatus>

export type ComboboxStatusProps = Omit<
  UiComboboxStatusProps,
  'class' | 'render'
> & {
  class?: UiComboboxStatusProps['class']
  render?: UiComboboxStatusProps['render']
}

export function ComboboxStatus(props: ComboboxStatusProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxStatus {...rest} class={props.class} render={props.render} />
  )
}

type UiComboboxValueProps = ComponentProps<typeof UiComboboxValue>

export type ComboboxValueProps = UiComboboxValueProps

export function ComboboxValue(props: ComboboxValueProps) {
  return <UiComboboxValue {...props} />
}

type UiComboboxChipsProps = ComponentProps<typeof UiComboboxChips>

export type ComboboxChipsProps = Omit<
  UiComboboxChipsProps,
  'class' | 'render'
> & {
  surface?: 'base' | 'layer-1'
  invalid?: boolean
  class?: UiComboboxChipsProps['class']
  render?: UiComboboxChipsProps['render']
}

export function ComboboxChips(props: ComboboxChipsProps) {
  const rest = omit(props, 'surface', 'invalid', 'class', 'render')

  return (
    <UiComboboxChips
      {...rest}
      class={props.class}
      render={props.render}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type BaseComboboxChipProps = ComponentProps<typeof UiComboboxChip>

export type ComboboxChipProps<T = string> = Omit<
  BaseComboboxChipProps,
  'value' | 'class' | 'render'
> & {
  value: T
  class?: BaseComboboxChipProps['class']
  render?: BaseComboboxChipProps['render']
}

export function ComboboxChip<T = string>(props: ComboboxChipProps<T>) {
  const rest = omit(props, 'value', 'class', 'render')

  return (
    <UiComboboxChip<T>
      {...rest}
      value={props.value}
      class={props.class}
      render={props.render}
    />
  )
}

type UiComboboxChipRemoveProps = ComponentProps<typeof UiComboboxChipRemove>

export type ComboboxChipRemoveProps = Omit<
  UiComboboxChipRemoveProps,
  'class' | 'render' | 'children'
> & {
  class?: UiComboboxChipRemoveProps['class']
  render?: UiComboboxChipRemoveProps['render']
  children?: UiComboboxChipRemoveProps['children']
}

export function ComboboxChipRemove(props: ComboboxChipRemoveProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiComboboxChipRemove {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ChipRemoveIcon />)
      }
    </UiComboboxChipRemove>
  )
}

type UiComboboxChipsOverflowProps = ComponentProps<
  typeof UiComboboxChipsOverflow
>

export type ComboboxChipsOverflowProps = Omit<
  UiComboboxChipsOverflowProps,
  'class' | 'render'
> & {
  class?: UiComboboxChipsOverflowProps['class']
  render?: UiComboboxChipsOverflowProps['render']
}

export function ComboboxChipsOverflow(props: ComboboxChipsOverflowProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiComboboxChipsOverflow
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiComboboxArrowProps = ComponentProps<typeof UiComboboxArrow>

export type ComboboxArrowProps = Omit<
  UiComboboxArrowProps,
  'class' | 'render'
> & {
  class?: UiComboboxArrowProps['class']
  render?: UiComboboxArrowProps['render']
}

export function ComboboxArrow(props: ComboboxArrowProps) {
  const rest = omit(props, 'class', 'render')

  return <UiComboboxArrow {...rest} class={props.class} render={props.render} />
}

export { ComboboxItems, createComboboxController }

function ClearIcon(): JSX.Element {
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
        d="m4.5 4.5 7 7M11.5 4.5l-7 7"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChipRemoveIcon(): JSX.Element {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="m4.5 4.5 7 7M11.5 4.5l-7 7"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronDown(): JSX.Element {
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
        d="M11 9.5L8 6.5L5 9.5"
        stroke="currentColor"
        stroke-width="1.15"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

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
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
