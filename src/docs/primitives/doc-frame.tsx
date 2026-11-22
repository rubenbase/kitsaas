import type { JSX } from '@solidjs/web'

import '../docs.css'

export type DocFrameProps = {
  surface?: 'layer' | 'base'
  class?: JSX.HTMLAttributes<HTMLDivElement>['class']
  children: JSX.Element
}

/**
 * Internal documentation surface frame used by previews, code blocks,
 * terminals, anatomy diagrams, and chart showcase cards.
 */
export function DocFrame(props: DocFrameProps) {
  return (
    <div
      class={['doc-frame', props.class]}
      data-surface={props.surface ?? 'layer'}
    >
      {props.children}
    </div>
  )
}
