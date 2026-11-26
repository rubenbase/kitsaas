import type { ComponentProps } from '@solidjs/web'
import {
  Accordion as UiAccordion,
  AccordionHeader as UiAccordionHeader,
  AccordionItem as UiAccordionItem,
  AccordionPanel as UiAccordionPanel,
  AccordionTrigger as UiAccordionTrigger,
} from '@ui-sdk/solid/accordion'
import { omit } from 'solid-js'

import './accordion.css'

/**
 * Accordion, a 1:1 port of opencode's Accordion (`@opencode/ui`, MIT):
 * `packages/ui/src/data-display/accordion` (`accordion.css`), on top of
 * ui-sdk's headless Accordion, AccordionItem, AccordionHeader,
 * AccordionTrigger and AccordionPanel.
 *
 * Styling lives in `accordion.css` as attribute rules (`data-open`,
 * `data-disabled`), copied from upstream, so the stacked frame, the hover
 * fill, the open panel's border and fill, the first/last corner radii and
 * the disabled cursor match. Behaviour (open state, one or many items,
 * keyboard, ARIA wiring, panel mounting) comes from `@ui-sdk/solid`.
 *
 * Upstream is Kobalte based, so its `data-expanded` and
 * `data-slot="accordion-content"` become ui-sdk's `data-open` and
 * `data-slot="accordion-panel"`. Its trigger is unstyled when focused and
 * ui-sdk keeps that: a disabled or open trigger stays focusable, and a
 * panel takes its padding from its content, like upstream.
 */

type UiAccordionProps = ComponentProps<typeof UiAccordion>

export type AccordionProps = Omit<UiAccordionProps, 'class' | 'render'> & {
  class?: UiAccordionProps['class']
  render?: UiAccordionProps['render']
}

export function Accordion(props: AccordionProps) {
  const rest = omit(props, 'class', 'render')

  return <UiAccordion {...rest} class={props.class} render={props.render} />
}

type UiAccordionItemProps = ComponentProps<typeof UiAccordionItem>

export type AccordionItemProps = Omit<
  UiAccordionItemProps,
  'class' | 'render'
> & {
  class?: UiAccordionItemProps['class']
  render?: UiAccordionItemProps['render']
}

export function AccordionItem(props: AccordionItemProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAccordionItem {...rest} class={props.class} render={props.render} />
  )
}

type UiAccordionHeaderProps = ComponentProps<typeof UiAccordionHeader>

export type AccordionHeaderProps = Omit<
  UiAccordionHeaderProps,
  'class' | 'render'
> & {
  class?: UiAccordionHeaderProps['class']
  render?: UiAccordionHeaderProps['render']
}

export function AccordionHeader(props: AccordionHeaderProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAccordionHeader {...rest} class={props.class} render={props.render} />
  )
}

type UiAccordionTriggerProps = ComponentProps<typeof UiAccordionTrigger>

export type AccordionTriggerProps = Omit<
  UiAccordionTriggerProps,
  'class' | 'render'
> & {
  class?: UiAccordionTriggerProps['class']
  render?: UiAccordionTriggerProps['render']
}

export function AccordionTrigger(props: AccordionTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAccordionTrigger {...rest} class={props.class} render={props.render} />
  )
}

type UiAccordionPanelProps = ComponentProps<typeof UiAccordionPanel>

export type AccordionPanelProps = Omit<
  UiAccordionPanelProps,
  'class' | 'render'
> & {
  class?: UiAccordionPanelProps['class']
  render?: UiAccordionPanelProps['render']
}

export function AccordionPanel(props: AccordionPanelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAccordionPanel {...rest} class={props.class} render={props.render} />
  )
}
