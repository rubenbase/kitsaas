'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Button as UiButton } from '@ui-sdk/react/button'

import './button.css'

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

export type ButtonProps = Omit<UiButtonProps, 'render' | 'children'> & {
  /** Defaults to `neutral`, like opencode's button. */
  variant?: ButtonVariant
  /** Defaults to `normal` (28px). Ignored by `nav`, which is always 28px. */
  size?: ButtonSize
  /** Optional icon rendered before the label, at the button's 16px icon slot. */
  icon?: ReactNode
  /** Marks a `nav` item as the current page. */
  active?: boolean
  /** Renders an anchor instead of a button. */
  href?: string
  target?: string
  rel?: string
  download?: boolean | string
  children?: ReactNode
}

export function Button({
  variant = 'neutral',
  size = 'normal',
  icon,
  active,
  href,
  target,
  rel,
  download,
  children,
  ...rest
}: ButtonProps) {
  return (
    <UiButton
      {...rest}
      data-variant={variant}
      data-size={variant === 'nav' ? undefined : size}
      data-icon={icon ? '' : undefined}
      data-active={active ? '' : undefined}
      render={
        href
          ? (anchorProps) => (
              <a
                {...anchorProps}
                href={href}
                target={target}
                rel={rel}
                download={download}
              />
            )
          : undefined
      }
    >
      {icon}
      {children}
    </UiButton>
  )
}
