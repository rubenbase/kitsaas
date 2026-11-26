import type { JSX } from '@solidjs/web'
import {
  Dialog as UiDialog,
  DialogBackdrop as UiDialogBackdrop,
  DialogClose as UiDialogClose,
  DialogContent as UiDialogContent,
  DialogDescription as UiDialogDescription,
  DialogTitle as UiDialogTitle,
  DialogTrigger as UiDialogTrigger,
} from '@ui-sdk/solid/dialog'
import { Show } from 'solid-js'

import { CloseIcon, CodeIcon } from '#/components/icons'

import { DocCodeBlock } from './doc-code-block'
import { DocCopyButton } from './doc-copy-button'
import { DocFrame } from './doc-frame'
import { DocInstallTerminal } from './doc-terminal'
import '../docs.css'

export type DocChartCardProps = {
  /** Stable identifier (also used as filename in code viewer, e.g. `chart-area-interactive`). */
  id: string
  /** Human-readable chart title shown in the toolbar and code sheet. */
  title: string
  /** Optional subtitle shown in the code sheet header. */
  description?: string
  /** Small category icon rendered in the toolbar left slot. */
  icon?: JSX.Element
  /** Copyable Solid 2 source code for this chart card. */
  code: string
  /** Span full row width in the chart showcase grid (for interactive hero charts). */
  fullWidth?: boolean
  class?: string
  children: JSX.Element
}

/**
 * Internal chart showcase card inspired by shadcn/ui's `ChartDisplay` +
 * `ChartToolbar` + `ChartCodeViewer`:
 * - Subtle outer frame with toolbar (icon + label on left, Copy + View Code on right)
 * - Clean framed chart stage inside
 * - Slide-over `View Code` sheet built on headless `@ui-sdk/solid/dialog`
 *   showing the live preview, install terminal, and highlighted source code
 */
export function DocChartCard(props: DocChartCardProps) {
  return (
    <DocFrame
      class={[
        'group flex min-w-0 flex-col overflow-hidden transition-colors',
        props.fullWidth ? 'md:col-span-2 lg:col-span-3' : '',
        props.class,
      ]}
    >
      {/* Toolbar */}
      <div class="flex items-center gap-2 border-b border-border-muted bg-surface px-3 py-2">
        <div class="flex min-w-0 items-center gap-1.5 text-[12px] text-muted">
          <Show when={props.icon}>
            <span class="inline-flex shrink-0 text-faint [&>svg]:size-3.5">
              {props.icon}
            </span>
          </Show>
          <span class="truncate [font-weight:500]">{props.title}</span>
        </div>

        <div class="ml-auto flex shrink-0 items-center gap-1.5">
          <DocCopyButton
            text={() => props.code}
            ariaLabel={`Copy ${props.title} code`}
          />

          <span
            aria-hidden="true"
            class="hidden h-3.5 w-px bg-border-muted sm:inline-block"
          />

          <UiDialog>
            <UiDialogTrigger class="inline-flex h-7 items-center gap-1.5 rounded-[6px] border border-border-muted bg-background px-2.5 text-[11.5px] text-foreground [font-weight:500] transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--v2-border-border-focus)]">
              <CodeIcon class="size-3.5 text-faint" />
              <span>View Code</span>
            </UiDialogTrigger>

            <UiDialogBackdrop class="doc-sheet-backdrop" />
            <UiDialogContent class="doc-sheet-content">
              <div class="flex shrink-0 items-start justify-between gap-4 border-b border-border-muted px-5 py-4">
                <div class="min-w-0">
                  <UiDialogTitle class="text-[15px] leading-5 text-foreground [font-weight:530]">
                    {props.title}
                  </UiDialogTitle>
                  <Show when={props.description}>
                    <UiDialogDescription class="mt-1 text-[12.5px] text-muted">
                      {props.description}
                    </UiDialogDescription>
                  </Show>
                </div>

                <UiDialogClose
                  aria-label="Close code viewer"
                  class="doc-icon-btn shrink-0"
                >
                  <CloseIcon class="size-4" />
                </UiDialogClose>
              </div>

              <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
                <div class="mb-5 overflow-hidden rounded-[10px] border border-border bg-background">
                  {props.children}
                </div>

                <div class="mb-5">
                  <p class="mb-2 text-[11.5px] uppercase tracking-[0.06em] text-faint">
                    CLI
                  </p>
                  <DocInstallTerminal exec={`kitsaas add ${props.id}`} />
                </div>

                <div>
                  <p class="mb-2 text-[11.5px] uppercase tracking-[0.06em] text-faint">
                    Source
                  </p>
                  <DocCodeBlock
                    title={`${props.id}.tsx`}
                    code={props.code}
                    lang="tsx"
                  />
                </div>
              </div>
            </UiDialogContent>
          </UiDialog>
        </div>
      </div>

      {/* Chart content stage */}
      <div class="flex min-w-0 flex-1 flex-col bg-background">
        {props.children}
      </div>
    </DocFrame>
  )
}
