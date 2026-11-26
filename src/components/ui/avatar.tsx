import type { ComponentProps } from '@solidjs/web'
import {
  Avatar as UiAvatar,
  AvatarFallback as UiAvatarFallback,
  AvatarImage as UiAvatarImage,
} from '@ui-sdk/solid/avatar'
import { omit } from 'solid-js'

import './avatar.css'

/**
 * Avatar, a 1:1 port of opencode's `@opencode/ui` Avatar visuals (MIT):
 * `packages/ui/src/data-display/avatar` (`avatar-v2`, `avatar.css`), on top of
 * ui-sdk's headless Avatar, AvatarImage and AvatarFallback.
 *
 * Styling lives in `avatar.css` as attribute rules (`data-size`, `data-kind`,
 * `data-has-image`), so both kinds and all three sizes match upstream: user
 * avatars are circular, org avatars take a 6px radius (4px at `small` and
 * `normal`), and the boxes are 28, 20 and 16px. Behaviour — the real `<img>`,
 * the fallback while the image loads or after it fails, the fallback `delay`,
 * and the loading status on every part — comes from `@ui-sdk/solid`.
 *
 * Upstream is one component taking `src` and `fallback`; ui-sdk splits it into
 * parts, so pass `hasImage` when you render an `AvatarImage`. It is upstream's
 * own `data-has-image` attribute, which drops the fallback's sheen:
 *
 *   <Avatar kind="org" size="small" hasImage>
 *     <AvatarImage src={logo} alt="Acme" />
 *     <AvatarFallback>A</AvatarFallback>
 *   </Avatar>
 *
 * Upstream shows the first grapheme of `fallback`; ui-sdk renders the
 * fallback's children as given, so pass the one or two letters yourself.
 * Upstream's `background` / `foreground` props are inline overrides of
 * `--avatar-bg` / `--avatar-fg`; set those custom properties on `style`
 * instead. ui-sdk's root is a `<span>` where upstream used a `<div>`; the
 * upstream `display: flex` makes the two lay out the same.
 */

export type AvatarKind = 'user' | 'org'
export type AvatarSize = 'large' | 'normal' | 'small'

type UiAvatarProps = ComponentProps<typeof UiAvatar>

export type AvatarProps = Omit<UiAvatarProps, 'class' | 'render'> & {
  /** Circle for `user` (default), rounded corners for `org`. */
  kind?: AvatarKind
  /** 28px (default), 20px or 16px. */
  size?: AvatarSize
  /** Marks that this avatar renders an `AvatarImage`, like upstream's `src`. */
  hasImage?: boolean
  class?: UiAvatarProps['class']
  render?: UiAvatarProps['render']
}

export function Avatar(props: AvatarProps) {
  const rest = omit(props, 'kind', 'size', 'hasImage', 'class', 'render')

  return (
    <UiAvatar
      {...rest}
      class={props.class}
      render={props.render}
      data-kind={props.kind ?? 'user'}
      data-size={props.size ?? 'large'}
      data-has-image={props.hasImage ? '' : undefined}
    />
  )
}

type UiAvatarImageProps = ComponentProps<typeof UiAvatarImage>

export type AvatarImageProps = Omit<UiAvatarImageProps, 'class' | 'render'> & {
  class?: UiAvatarImageProps['class']
  render?: UiAvatarImageProps['render']
}

/** The image, hidden until it loads; the fallback covers it until then. */
export function AvatarImage(props: AvatarImageProps) {
  const rest = omit(props, 'class', 'render')

  return <UiAvatarImage {...rest} class={props.class} render={props.render} />
}

type UiAvatarFallbackProps = ComponentProps<typeof UiAvatarFallback>

export type AvatarFallbackProps = Omit<
  UiAvatarFallbackProps,
  'class' | 'render'
> & {
  class?: UiAvatarFallbackProps['class']
  render?: UiAvatarFallbackProps['render']
}

/** Initials or an icon, shown while no image is loaded. */
export function AvatarFallback(props: AvatarFallbackProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAvatarFallback {...rest} class={props.class} render={props.render} />
  )
}
