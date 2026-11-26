import type { ComponentProps } from '@solidjs/web'
import {
  createMenubarController,
  Menubar as UiMenubar,
  type MenubarApi,
  type MenubarController,
  type MenubarMember,
  type MenubarOptions,
  type MenubarOrientation,
  type MenubarPrimitive,
  type MenubarState,
} from '@ui-sdk/solid/menubar'
import { omit } from 'solid-js'

import './menubar.css'

type UiMenubarProps = ComponentProps<typeof UiMenubar>

export type MenubarProps = Omit<UiMenubarProps, 'class' | 'render'> & {
  class?: UiMenubarProps['class']
  render?: UiMenubarProps['render']
}

export function Menubar(props: MenubarProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMenubar {...rest} class={props.class} render={props.render} />
}

export { createMenubarController }
export type {
  MenubarApi,
  MenubarController,
  MenubarMember,
  MenubarOptions,
  MenubarOrientation,
  MenubarPrimitive,
  MenubarState,
}
