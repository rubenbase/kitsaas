import {
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsPanel as UiTabsPanel,
  TabsTab as UiTabsTab,
} from '@ui-sdk/solid/tabs'
import { For, Show, createMemo, createSignal, createUniqueId } from 'solid-js'

import { FileCodeIcon } from '#/components/icons'

import { highlightCode, type CodeLanguage } from '../highlight'
import { DocCopyButton } from './doc-copy-button'
import { DocFrame } from './doc-frame'
import '../docs.css'

export type DocCodeFile = {
  name: string
  lang: CodeLanguage
  code: string
}

export type DocCodeBlockProps = {
  code: string
  lang?: CodeLanguage
  title?: string
  /** Render without the surrounding DocFrame (e.g., nested inside DocPreview). */
  bare?: boolean
  /** Clamp tall blocks and offer an expand/collapse toggle. */
  collapsible?: boolean
  /** Show a copy button (defaults to true). */
  copy?: boolean
  class?: string
}

function HighlightedCode(props: {
  id: string
  code: string
  lang: CodeLanguage
  clamped: boolean
}) {
  const lines = createMemo(() => highlightCode(props.code, props.lang))

  return (
    <pre
      tabindex={0}
      class="doc-code-pre"
      data-clamped={props.clamped ? 'true' : undefined}
    >
      <code id={props.id}>
        <For each={lines()}>
          {(line, lineIndex) => (
            <>
              <span class="doc-code-line">
                <For each={line}>
                  {(token) =>
                    token.kind === 'plain' ? (
                      token.text
                    ) : (
                      <span class={`doc-tok-${token.kind}`}>{token.text}</span>
                    )
                  }
                </For>
              </span>
              {lineIndex() < lines().length - 1 ? '\n' : null}
            </>
          )}
        </For>
      </code>
    </pre>
  )
}

/**
 * Internal syntax-highlighted code block primitive with optional filename bar,
 * collapsible height for long files, and Invoker Commands copy button.
 */
export function DocCodeBlock(props: DocCodeBlockProps) {
  const codeId = `doc-code-${createUniqueId()}`
  const [expanded, setExpanded] = createSignal(false)

  const lineCount = createMemo(
    () => props.code.replace(/\n+$/, '').split('\n').length,
  )
  const canCollapse = () => Boolean(props.collapsible) && lineCount() > 18
  const clamped = () => canCollapse() && !expanded()
  const showCopy = () => props.copy !== false

  const inner = (
    <div class="relative min-w-0">
      <Show when={props.title}>
        <div class="doc-tabbar px-3">
          <span class="inline-flex min-w-0 items-center gap-1.5 truncate font-mono text-[11.5px] text-muted">
            <FileCodeIcon class="size-3.5 shrink-0 text-faint" />
            <span class="truncate">{props.title}</span>
          </span>
          <Show when={showCopy()}>
            <DocCopyButton
              targetId={codeId}
              ariaLabel={`Copy ${props.title}`}
              class="ml-auto"
            />
          </Show>
        </div>
      </Show>

      <div class={!props.title && showCopy() ? 'doc-copyable' : 'relative min-w-0'}>
        <div class="doc-code-scroll min-w-0">
          <HighlightedCode
            id={codeId}
            code={props.code}
            lang={props.lang ?? 'tsx'}
            clamped={clamped()}
          />
        </div>
        <Show when={!props.title && showCopy()}>
          <div class="doc-copy-float">
            <DocCopyButton targetId={codeId} ariaLabel="Copy code snippet" />
          </div>
        </Show>
      </div>

      <Show when={canCollapse()}>
        <div class="flex items-center justify-between border-t border-border-muted bg-surface px-3 py-1.5 text-[11.5px] text-faint">
          <span class="tabular-nums">{lineCount()} lines</span>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            class="rounded-[5px] px-2 py-0.5 text-[11.5px] text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-[var(--v2-border-border-focus)]"
          >
            {expanded() ? 'Collapse' : 'Expand all'}
          </button>
        </div>
      </Show>
    </div>
  )

  if (props.bare) {
    return <div class={['min-w-0 overflow-hidden', props.class]}>{inner}</div>
  }

  return (
    <DocFrame class={['overflow-hidden', props.class]}>{inner}</DocFrame>
  )
}

export type DocCodeTabsProps = {
  files: DocCodeFile[]
  collapsible?: boolean
  bare?: boolean
  class?: string
}

/**
 * Multi-file code viewer built on headless `@ui-sdk/solid/tabs`, with a single
 * copy button that copies whichever file tab is currently active.
 */
export function DocCodeTabs(props: DocCodeTabsProps) {
  const [selected, setSelected] = createSignal<string>(
    props.files[0]?.name ?? '',
  )

  const activeFile = createMemo(
    () => props.files.find((f) => f.name === selected()) ?? props.files[0],
  )

  const content = (
    <UiTabs
      value={activeFile()?.name ?? ''}
      onValueChange={(next) => {
        if (next) setSelected(next)
      }}
      class="flex min-w-0 flex-col"
    >
      <div class="doc-tabbar">
        <UiTabsList aria-label="Source files" class="doc-tablist">
          <For each={props.files}>
            {(file) => (
              <UiTabsTab value={file.name} class="doc-tab font-mono text-[11.5px]">
                <FileCodeIcon class="size-3.5 shrink-0 opacity-75" />
                <span>{file.name}</span>
              </UiTabsTab>
            )}
          </For>
        </UiTabsList>
        <Show when={activeFile()}>
          {(file) => (
            <DocCopyButton
              text={() => file().code}
              ariaLabel={`Copy ${file().name}`}
              class="ml-auto"
            />
          )}
        </Show>
      </div>

      <For each={props.files}>
        {(file) => (
          <UiTabsPanel value={file.name} class="min-w-0 outline-none">
            <DocCodeBlock
              code={file.code}
              lang={file.lang}
              copy={false}
              bare
              collapsible={props.collapsible}
            />
          </UiTabsPanel>
        )}
      </For>
    </UiTabs>
  )

  if (props.bare) {
    return <div class={['min-w-0 overflow-hidden', props.class]}>{content}</div>
  }

  return (
    <DocFrame class={['overflow-hidden', props.class]}>{content}</DocFrame>
  )
}
