import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Autocomplete as UiAutocomplete,
  AutocompleteArrow as UiAutocompleteArrow,
  AutocompleteClear as UiAutocompleteClear,
  AutocompleteContent as UiAutocompleteContent,
  AutocompleteEmpty as UiAutocompleteEmpty,
  AutocompleteGroup as UiAutocompleteGroup,
  AutocompleteGroupLabel as UiAutocompleteGroupLabel,
  AutocompleteInput as UiAutocompleteInput,
  AutocompleteItem as UiAutocompleteItem,
  AutocompleteItemIcon as UiAutocompleteItemIcon,
  AutocompleteItems,
  AutocompleteItemText as UiAutocompleteItemText,
  AutocompleteLabel as UiAutocompleteLabel,
  AutocompleteList as UiAutocompleteList,
  AutocompleteSeparator as UiAutocompleteSeparator,
  AutocompleteStatus as UiAutocompleteStatus,
  AutocompleteTrigger as UiAutocompleteTrigger,
  createAutocompleteController,
} from '@ui-sdk/solid/autocomplete'
import { omit, Show } from 'solid-js'

import './autocomplete.css'

export type AutocompleteAppearance = 'small' | 'base' | 'large'
export type AutocompleteSurface = 'base' | 'layer-1' | 'invisible'

type UiAutocompleteProps = ComponentProps<typeof UiAutocomplete>

export type AutocompleteProps = UiAutocompleteProps

export function Autocomplete(props: AutocompleteProps) {
  return <UiAutocomplete {...props} />
}

type UiAutocompleteLabelProps = ComponentProps<typeof UiAutocompleteLabel>

export type AutocompleteLabelProps = Omit<
  UiAutocompleteLabelProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteLabelProps['class']
  render?: UiAutocompleteLabelProps['render']
}

export function AutocompleteLabel(props: AutocompleteLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteLabel {...rest} class={props.class} render={props.render} />
  )
}

export type AutocompleteControlProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /** Defaults to `base` (28px). */
  appearance?: AutocompleteAppearance
  /** Background fill. Defaults to `base`. */
  surface?: AutocompleteSurface
  /** Marks the outline and input text red. */
  invalid?: boolean
  /** Marks the control container disabled. */
  disabled?: boolean
  /** Optional leading icon shown before the input. */
  leadingIcon?: JSX.Element
  children?: JSX.Element
}

export function AutocompleteControl(props: AutocompleteControlProps) {
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
      data-slot="autocomplete-control"
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      data-leading-icon={props.leadingIcon ? '' : undefined}
    >
      <Show when={props.leadingIcon}>
        <span data-slot="autocomplete-leading-icon" aria-hidden="true">
          {props.leadingIcon}
        </span>
      </Show>
      {props.children}
    </div>
  )
}

type UiAutocompleteInputProps = ComponentProps<typeof UiAutocompleteInput>

export type AutocompleteInputProps = Omit<
  UiAutocompleteInputProps,
  'class' | 'render'
> & {
  /** Marks the field invalid for assistive tech and standalone styling. */
  invalid?: boolean
  class?: UiAutocompleteInputProps['class']
  render?: UiAutocompleteInputProps['render']
}

export function AutocompleteInput(props: AutocompleteInputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiAutocompleteInput
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiAutocompleteClearProps = ComponentProps<typeof UiAutocompleteClear>

export type AutocompleteClearProps = Omit<
  UiAutocompleteClearProps,
  'class' | 'render' | 'children'
> & {
  class?: UiAutocompleteClearProps['class']
  render?: UiAutocompleteClearProps['render']
  children?: UiAutocompleteClearProps['children']
}

export function AutocompleteClear(props: AutocompleteClearProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiAutocompleteClear {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ClearIcon />)
      }
    </UiAutocompleteClear>
  )
}

type UiAutocompleteTriggerProps = ComponentProps<typeof UiAutocompleteTrigger>

export type AutocompleteTriggerProps = Omit<
  UiAutocompleteTriggerProps,
  'class' | 'render' | 'children'
> & {
  class?: UiAutocompleteTriggerProps['class']
  render?: UiAutocompleteTriggerProps['render']
  children?: UiAutocompleteTriggerProps['children']
}

export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiAutocompleteTrigger {...rest} class={props.class} render={props.render}>
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? (
              <span data-slot="autocomplete-chevron" aria-hidden="true">
                <ChevronDown />
              </span>
            ))
      }
    </UiAutocompleteTrigger>
  )
}

type UiAutocompleteContentProps = ComponentProps<typeof UiAutocompleteContent>

export type AutocompleteContentProps = Omit<
  UiAutocompleteContentProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteContentProps['class']
  render?: UiAutocompleteContentProps['render']
}

export function AutocompleteContent(props: AutocompleteContentProps) {
  const rest = omit(props, 'class', 'render', 'sideOffset')

  return (
    <UiAutocompleteContent
      {...rest}
      sideOffset={props.sideOffset ?? 4}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAutocompleteListProps = ComponentProps<typeof UiAutocompleteList>

export type AutocompleteListProps = Omit<
  UiAutocompleteListProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteListProps['class']
  render?: UiAutocompleteListProps['render']
}

export function AutocompleteList(props: AutocompleteListProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteList {...rest} class={props.class} render={props.render} />
  )
}

type UiAutocompleteItemProps = ComponentProps<typeof UiAutocompleteItem>

export type AutocompleteItemProps = Omit<
  UiAutocompleteItemProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteItemProps['class']
  render?: UiAutocompleteItemProps['render']
}

export function AutocompleteItem(props: AutocompleteItemProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteItem {...rest} class={props.class} render={props.render} />
  )
}

type UiAutocompleteItemTextProps = ComponentProps<typeof UiAutocompleteItemText>

export type AutocompleteItemTextProps = Omit<
  UiAutocompleteItemTextProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteItemTextProps['class']
  render?: UiAutocompleteItemTextProps['render']
}

export function AutocompleteItemText(props: AutocompleteItemTextProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteItemText
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAutocompleteItemIconProps = ComponentProps<typeof UiAutocompleteItemIcon>

export type AutocompleteItemIconProps = Omit<
  UiAutocompleteItemIconProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteItemIconProps['class']
  render?: UiAutocompleteItemIconProps['render']
}

export function AutocompleteItemIcon(props: AutocompleteItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteItemIcon
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAutocompleteGroupProps = ComponentProps<typeof UiAutocompleteGroup>

export type AutocompleteGroupProps = Omit<
  UiAutocompleteGroupProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteGroupProps['class']
  render?: UiAutocompleteGroupProps['render']
}

export function AutocompleteGroup(props: AutocompleteGroupProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteGroup {...rest} class={props.class} render={props.render} />
  )
}

type UiAutocompleteGroupLabelProps = ComponentProps<
  typeof UiAutocompleteGroupLabel
>

export type AutocompleteGroupLabelProps = Omit<
  UiAutocompleteGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteGroupLabelProps['class']
  render?: UiAutocompleteGroupLabelProps['render']
}

export function AutocompleteGroupLabel(props: AutocompleteGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteGroupLabel
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAutocompleteSeparatorProps = ComponentProps<
  typeof UiAutocompleteSeparator
>

export type AutocompleteSeparatorProps = Omit<
  UiAutocompleteSeparatorProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteSeparatorProps['class']
  render?: UiAutocompleteSeparatorProps['render']
}

export function AutocompleteSeparator(props: AutocompleteSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteSeparator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAutocompleteEmptyProps = ComponentProps<typeof UiAutocompleteEmpty>

export type AutocompleteEmptyProps = Omit<
  UiAutocompleteEmptyProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteEmptyProps['class']
  render?: UiAutocompleteEmptyProps['render']
}

export function AutocompleteEmpty(props: AutocompleteEmptyProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteEmpty {...rest} class={props.class} render={props.render} />
  )
}

type UiAutocompleteStatusProps = ComponentProps<typeof UiAutocompleteStatus>

export type AutocompleteStatusProps = Omit<
  UiAutocompleteStatusProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteStatusProps['class']
  render?: UiAutocompleteStatusProps['render']
}

export function AutocompleteStatus(props: AutocompleteStatusProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteStatus {...rest} class={props.class} render={props.render} />
  )
}

type UiAutocompleteArrowProps = ComponentProps<typeof UiAutocompleteArrow>

export type AutocompleteArrowProps = Omit<
  UiAutocompleteArrowProps,
  'class' | 'render'
> & {
  class?: UiAutocompleteArrowProps['class']
  render?: UiAutocompleteArrowProps['render']
}

export function AutocompleteArrow(props: AutocompleteArrowProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAutocompleteArrow {...rest} class={props.class} render={props.render} />
  )
}

export { AutocompleteItems, createAutocompleteController }

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
