import type { JSX } from '@solidjs/web'
import {
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsTab as UiTabsTab,
} from '@ui-sdk/solid/tabs'
import {
  For,
  Show,
  createContext,
  createEffect,
  createMemo,
  createUniqueId,
  useContext,
} from 'solid-js'

import { ChevronRightIcon, TerminalIcon } from '#/components/icons'

import { highlightCode } from '../highlight'
import {
  PACKAGE_MANAGERS,
  formatExecCommand,
  formatInstallCommand,
  usePackageManager,
  type PackageManager,
} from '../preferences'
import { DocCopyButton } from './doc-copy-button'
import { DocFrame } from './doc-frame'
import '../docs.css'

export type DocInstallTerminalProps = {
  /** Packages for `add` / `install` (e.g. `['@ui-sdk/solid', '@ui-sdk/core']`). */
  packages?: string | string[]
  /** Optional `dlx` / `npx` CLI command arguments (e.g. `'kitsaas add select'`). */
  exec?: string
  /** Optional explicit raw command (overrides package manager formatting). */
  command?: string
  /** Optional label in the header bar. */
  label?: string
  /** Optional custom leading control (replaces the default terminal icon + label). */
  leading?: JSX.Element
  class?: string
}

/**
 * Internal terminal command block with a globally synced package-manager
 * switcher (`pnpm` / `npm` / `yarn` / `bun`), `$` prompt, syntax highlighting,
 * and Invoker Commands copy button.
 */
export function DocInstallTerminal(props: DocInstallTerminalProps) {
  const [pm, setPm] = usePackageManager()
  const cmdId = `doc-term-${createUniqueId()}`

  const resolvedCommand = createMemo(() => {
    if (props.command) return props.command
    if (props.exec) return formatExecCommand(pm(), props.exec)
    if (props.packages) return formatInstallCommand(pm(), props.packages)
    return ''
  })

  const tokens = createMemo(() => highlightCode(resolvedCommand(), 'bash')[0] ?? [])

  return (
    <DocFrame class={['overflow-hidden', props.class]}>
      <div class="doc-tabbar">
        <Show
          when={props.leading}
          fallback={
            <span class="inline-flex items-center gap-1.5 pl-1.5 text-[11.5px] text-faint">
              <TerminalIcon class="size-3.5 shrink-0" />
              <Show when={props.label}>
                <span class="font-mono">{props.label}</span>
              </Show>
            </span>
          }
        >
          <div class="inline-flex shrink-0 items-center gap-1.5">
            {props.leading}
            <Show when={!props.command}>
              <span aria-hidden="true" class="h-3.5 w-px bg-border-muted" />
            </Show>
          </div>
        </Show>

        <Show when={!props.command}>
          <UiTabs
            value={pm()}
            onValueChange={(next) => {
              if (next) setPm(next as PackageManager)
            }}
            class="min-w-0"
          >
            <UiTabsList aria-label="Package manager" class="doc-tablist">
              <For each={PACKAGE_MANAGERS}>
                {(manager) => (
                  <UiTabsTab
                    value={manager}
                    class="doc-tab font-mono text-[11.5px]"
                  >
                    {manager}
                  </UiTabsTab>
                )}
              </For>
            </UiTabsList>
          </UiTabs>
        </Show>

        <DocCopyButton
          targetId={cmdId}
          ariaLabel="Copy terminal command"
          class="ml-auto"
        />
      </div>

      <div class="overflow-x-auto bg-background px-4 py-3 font-mono text-[12.5px] leading-5">
        <div class="flex items-center gap-2.5 whitespace-nowrap">
          <span aria-hidden="true" class="select-none text-faint">
            $
          </span>
          <code id={cmdId} class="text-foreground">
            <For each={tokens()}>
              {(token) =>
                token.kind === 'plain' ? (
                  token.text
                ) : (
                  <span class={`doc-tok-${token.kind}`}>{token.text}</span>
                )
              }
            </For>
          </code>
        </div>
      </div>
    </DocFrame>
  )
}

/* -------------------------------------------------------------------------- */
/* Interactive Preview Console (mirrors vercel-labs/ui ExampleConsole)        */
/* -------------------------------------------------------------------------- */

export type DocLogFn = (message: string) => void

export const DocLogContext = createContext<DocLogFn | null>(null)

/**
 * Allows any interactive component demo inside a `DocPreview` to write live
 * event output into the preview's built-in Console terminal.
 */
export function useDocLog(): DocLogFn {
  const ctx = useContext(DocLogContext)
  return (message: string) => {
    ctx?.(message)
  }
}

export type DocConsoleProps = {
  entries: string[]
  onClear?: () => void
  label?: string
}

/**
 * Fixed-height live console terminal attached under an interactive preview,
 * keeping layout stable while logging user interactions.
 */
export function DocConsole(props: DocConsoleProps) {
  let listRef!: HTMLOListElement

  createEffect(
    () => props.entries.length,
    (count) => {
      if (count > 0 && listRef) {
        listRef.scrollTop = listRef.scrollHeight
      }
    },
  )

  return (
    <section
      role="group"
      aria-label={props.label ?? 'Console'}
      class="doc-console"
    >
      <div class="doc-console-header">
        <span class="inline-flex items-center gap-1.5">
          <TerminalIcon class="size-3.5" />
          <span>{props.label ?? 'Console'}</span>
        </span>
        <Show when={props.entries.length > 0 && props.onClear}>
          <button
            type="button"
            onClick={() => props.onClear?.()}
            class="rounded-[4px] px-1.5 py-0.5 text-[11px] text-faint transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-[var(--v2-border-border-focus)]"
          >
            Clear
          </button>
        </Show>
      </div>
      <ol ref={listRef} aria-live="polite" class="doc-console-list">
        <For each={props.entries}>
          {(entry) => (
            <li class="doc-console-entry">
              <span class="truncate">{entry}</span>
            </li>
          )}
        </For>
        <li
          aria-hidden="true"
          class="flex h-[22px] items-center gap-1 text-faint opacity-70"
        >
          <ChevronRightIcon class="-ml-1 size-3.5" />
          <Show when={props.entries.length === 0}>
            <span class="text-[11px]">Interact with the preview above…</span>
          </Show>
        </li>
      </ol>
    </section>
  )
}
