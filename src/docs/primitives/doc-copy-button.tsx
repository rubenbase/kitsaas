import { onSettled } from 'solid-js'

import { CheckIcon, CopyIcon } from '#/components/icons'

import { copyTextWithFeedback, ensureCopyInvoker } from '../clipboard'
import '../docs.css'

export type DocCopyButtonProps = {
  /** ID of the DOM element whose text is copied via Invoker Commands (`command="--copy"`). */
  targetId?: string
  /** Explicit text to copy when no DOM target ID is bound. */
  text?: string | (() => string)
  /** Accessible name for icon-only copy buttons (e.g., "Copy install command"). */
  ariaLabel?: string
  /** Optional visible label beside the icon. */
  label?: string
  class?: string
}

/**
 * Internal copy button primitive following modern web guidance:
 * - Uses native Invoker Commands (`command="--copy" commandfor={targetId}`)
 *   with automatic fallback when `CommandEvent` is unsupported.
 * - Renders an external `role="status"` live region bubble for both sighted
 *   and screen-reader users without disabling the button.
 */
export function DocCopyButton(props: DocCopyButtonProps) {
  onSettled(() => {
    ensureCopyInvoker()
  })

  const commandAttrs = () =>
    props.targetId
      ? ({
          command: '--copy',
          commandfor: props.targetId,
        } as Record<string, string>)
      : {}

  const handleClick = (event: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    if (props.targetId) return
    const value = typeof props.text === 'function' ? props.text() : props.text
    if (value) {
      void copyTextWithFeedback(event.currentTarget, value)
    }
  }

  return (
    <span class={['doc-copy', props.class]}>
      <button
        type="button"
        class="doc-copy-btn"
        data-has-label={props.label ? '' : undefined}
        aria-label={props.label ? undefined : (props.ariaLabel ?? 'Copy code')}
        onClick={handleClick}
        {...commandAttrs()}
      >
        <span class="doc-copy-icon" aria-hidden="true">
          <CopyIcon class="size-3.5" />
        </span>
        <span class="doc-copy-check" aria-hidden="true">
          <CheckIcon class="size-3.5" />
        </span>
        {props.label ? <span>{props.label}</span> : null}
      </button>
      <span class="doc-copy-tip" role="status" />
    </span>
  )
}
