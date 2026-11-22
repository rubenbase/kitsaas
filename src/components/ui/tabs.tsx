import type { ComponentProps } from '@solidjs/web'
import {
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsPanel as UiTabsPanel,
  TabsTab as UiTabsTab,
} from '@ui-sdk/solid/tabs'
import { omit } from 'solid-js'

import './tabs.css'

/**
 * Tabs, a 1:1 port of opencode's Tabs (`@opencode/ui`, MIT):
 * `packages/ui/src/navigation/tabs` (`tabs-v2`, `tabs-current.css`), on top of
 * ui-sdk's headless Tabs.
 *
 * Styling lives in `tabs.css` as attribute rules (`data-variant`,
 * `data-orientation`, `data-selected`, `data-disabled`), so the underline,
 * pill and settings variants — rest, hover, selected, focus and disabled —
 * match upstream. Behaviour (roving tab stop, arrow keys, Home/End, automatic
 * or manual activation, panel mounting, ARIA wiring) comes from
 * `@ui-sdk/solid`.
 *
 * `variant` is upstream's `data-variant`: `normal` is the underline tabs
 * (upstream's `line`), `pill` is the segmented row (upstream's `surface`) and
 * `settings` is the vertical sidebar. Values, labels, panels and the change
 * callback are ui-sdk's own props.
 */

export type TabsVariant = 'normal' | 'pill' | 'settings'

type UiTabsProps = ComponentProps<typeof UiTabs>

export type TabsProps = Omit<UiTabsProps, 'class' | 'render'> & {
  /** Defaults to `normal`, the underline tabs. */
  variant?: TabsVariant
  class?: UiTabsProps['class']
  render?: UiTabsProps['render']
}

export function Tabs(props: TabsProps) {
  const rest = omit(props, 'variant', 'class', 'render')

  return (
    <UiTabs
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant ?? 'normal'}
    />
  )
}

type UiTabsListProps = ComponentProps<typeof UiTabsList>

export type TabsListProps = Omit<UiTabsListProps, 'class' | 'render'> & {
  class?: UiTabsListProps['class']
  render?: UiTabsListProps['render']
}

export function TabsList(props: TabsListProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTabsList {...rest} class={props.class} render={props.render} />
}

type UiTabsTabProps = ComponentProps<typeof UiTabsTab>

export type TabsTabProps = Omit<UiTabsTabProps, 'class' | 'render'> & {
  class?: UiTabsTabProps['class']
  render?: UiTabsTabProps['render']
}

export function TabsTab(props: TabsTabProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiTabsTab {...rest} class={props.class} render={props.render}>
      {(state) => (
        <span data-slot="tabs-tab-content">
          {typeof props.children === 'function'
            ? props.children(state)
            : props.children}
        </span>
      )}
    </UiTabsTab>
  )
}

type UiTabsPanelProps = ComponentProps<typeof UiTabsPanel>

export type TabsPanelProps = Omit<UiTabsPanelProps, 'class' | 'render'> & {
  class?: UiTabsPanelProps['class']
  render?: UiTabsPanelProps['render']
}

export function TabsPanel(props: TabsPanelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTabsPanel {...rest} class={props.class} render={props.render} />
}
