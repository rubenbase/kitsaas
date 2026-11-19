import type { ComponentProps, JSX } from '@solidjs/web'
import { Button as UiButton } from '@ui-sdk/solid/button'
import { omit } from 'solid-js'

import './button.css'

/**
 * Button, a 1:1 port of opencode's `@opencode/ui/button` visuals on top of
 * ui-sdk's headless Button.
 *
 * The styling lives in `button.css` as attribute rules (`data-variant`,
 * `data-size`, `data-icon`, `data-active`), copied from opencode's
 * `button-v2`, so every variant and state — rest, hover, pressed, focus,
 * expanded, disabled, loading — matches upstream. Behaviour (focus, keyboard,
 * pending, form semantics, link semantics) comes from `@ui-sdk/solid`.
 *
 * Pass `href` to render an anchor instead of a button. Return a Promise from
 * `onClick` and ui-sdk keeps the button pending (`data-pending`) until it
 * settles.
 */

export type ButtonVariant =
  | 'neutral'
  | 'danger'
  | 'warning'
  | 'outline'
  | 'contrast'
  | 'submit'
  | 'ghost'
  | 'ghost-muted'
  | 'ghost-faint'
  | 'ghost-danger'
  | 'loading'
  | 'nav'

export type ButtonSize = 'small' | 'normal' | 'large'

type UiButtonProps = ComponentProps<typeof UiButton>

export type ButtonProps = Omit<UiButtonProps, 'class' | 'render'> & {
  /** Defaults to `neutral`, like opencode's button. */
  variant?: ButtonVariant
  /** Defaults to `normal` (28px). Ignored by `nav`, which is always 28px. */
  size?: ButtonSize
  /** Optional icon rendered before the label, at the button's 16px icon slot. */
  icon?: JSX.Element
  /** Marks a `nav` item as the current page. */
  active?: boolean
  /** Renders an anchor instead of a button. */
  href?: string
  target?: string
  rel?: string
  download?: boolean | string
  class?: UiButtonProps['class']
}

export function Button(props: ButtonProps) {
  const rest = omit(
    props,
    'variant',
    'size',
    'icon',
    'active',
    'href',
    'target',
    'rel',
    'download',
    'class',
  )

  const variant = () => props.variant ?? 'neutral'

  return (
    <UiButton
      {...rest}
      class={props.class}
      data-variant={variant()}
      data-size={variant() === 'nav' ? undefined : (props.size ?? 'normal')}
      data-icon={props.icon ? '' : undefined}
      data-active={props.active ? '' : undefined}
      render={
        props.href
          ? (anchorProps) => (
              <a
                {...anchorProps}
                href={props.href}
                target={props.target}
                rel={props.rel}
                download={props.download}
              />
            )
          : undefined
      }
    >
      {props.icon}
      {props.children}
    </UiButton>
  )
}
