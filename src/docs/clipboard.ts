/**
 * Shared clipboard + Invoker Commands (`command="--copy"`) wiring.
 *
 * Follows modern web guidance:
 * - Uses native Invoker Commands (`command` + `commandfor`) where supported,
 *   falling back to a single delegated click listener when `CommandEvent` is
 *   absent.
 * - Keeps the `role="status"` feedback bubble outside the button and appends a
 *   non-breaking space on repeated identical announcements so VoiceOver does
 *   not suppress consecutive copies.
 * - Never disables the button while showing feedback.
 */

const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>()
let lastAnnouncement = ''
let installed = false

function legacyCopy(text: string): boolean {
  const field = Object.assign(document.createElement('textarea'), {
    value: text,
  })
  field.setAttribute('readonly', '')
  field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0'
  document.body.append(field)
  field.select()
  try {
    return document.execCommand('copy')
  } finally {
    field.remove()
  }
}

export function reportCopyFeedback(button: HTMLElement, ok: boolean): void {
  const tip =
    button.nextElementSibling instanceof HTMLElement &&
    button.nextElementSibling.getAttribute('role') === 'status'
      ? button.nextElementSibling
      : null

  const previous = timers.get(button)
  if (previous) clearTimeout(previous)

  button.removeAttribute('data-copied')
  button.removeAttribute('data-failed')

  let message = ok ? 'Copied' : 'Copy failed'
  if (message === lastAnnouncement) {
    message += '\u00A0'
  }
  lastAnnouncement = message

  if (tip) tip.textContent = ''
  void button.offsetWidth
  button.setAttribute(ok ? 'data-copied' : 'data-failed', '')

  if (tip) {
    requestAnimationFrame(() => {
      tip.textContent = message
    })
  }

  timers.set(
    button,
    setTimeout(() => {
      button.removeAttribute('data-copied')
      button.removeAttribute('data-failed')
      if (tip) tip.textContent = ''
    }, 1800),
  )
}

export async function copyTextWithFeedback(
  button: HTMLElement,
  text: string,
): Promise<boolean> {
  const clean = text.trim()
  if (!clean) return false
  try {
    await navigator.clipboard.writeText(clean)
    reportCopyFeedback(button, true)
    return true
  } catch {
    if (legacyCopy(clean)) {
      reportCopyFeedback(button, true)
      return true
    }
    reportCopyFeedback(button, false)
    return false
  }
}

function readTargetText(target: Element): string {
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    return target.value
  }
  if (target instanceof HTMLElement) {
    return target.innerText || target.textContent || ''
  }
  return target.textContent || ''
}

async function copyFromTarget(button: HTMLElement, target: Element) {
  const text = readTargetText(target)
  await copyTextWithFeedback(button, text)
}

type CommandEventLike = Event & {
  command?: string
  source?: Element | null
}

/**
 * Installs a single document-level Invoker Commands handler (or click fallback
 * where `CommandEvent` is unsupported) for `button[command="--copy"]`.
 */
export function ensureCopyInvoker(): void {
  if (installed || typeof document === 'undefined') return
  installed = true

  if ('CommandEvent' in window) {
    document.addEventListener(
      'command',
      (event) => {
        const cmd = event as CommandEventLike
        if (
          cmd.command === '--copy' &&
          cmd.source instanceof HTMLElement &&
          event.target instanceof Element
        ) {
          void copyFromTarget(cmd.source, event.target)
        }
      },
      true,
    )
  } else {
    document.addEventListener('click', (event) => {
      const targetEl = event.target
      if (!(targetEl instanceof Element)) return
      const button = targetEl.closest('button[command="--copy"]')
      if (!(button instanceof HTMLElement)) return
      const targetId = button.getAttribute('commandfor')
      if (!targetId) return
      const target = document.getElementById(targetId)
      if (target) {
        void copyFromTarget(button, target)
      }
    })
  }
}
