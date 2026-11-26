import type { JSX } from '@solidjs/web'
import {
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsPanel as UiTabsPanel,
  TabsTab as UiTabsTab,
} from '@ui-sdk/solid/tabs'
import { For, Show, createMemo, createSignal } from 'solid-js'

import { FileCodeIcon, RotateCcwIcon } from '#/components/icons'

import type { CodeLanguage } from '../highlight'
import { DocCodeBlock, DocCodeTabs, type DocCodeFile } from './doc-code-block'
import { DocCopyButton } from './doc-copy-button'
import { DocFrame } from './doc-frame'
import { DocConsole, DocLogContext } from './doc-terminal'
import '../docs.css'

export type DocPreviewProps = {
  /** Single code string (ignored when `files` is provided). */
  code?: string | null
  lang?: CodeLanguage
  filename?: string
  /** Optional multi-file code view inside the Code tab. */
  files?: DocCodeFile[]
  /** Always display the live event Console terminal beneath the preview. */
  console?: boolean
  /** Optional caption rendered below the frame. */
  caption?: string
  /** Extra classes on the preview stage. */
  stageClass?: string
  class?: string
  children: JSX.Element | (() => JSX.Element)
}

/**
 * Internal interactive example primitive (inspired by ui-sdk's ComponentExample):
 * - `Preview` | `Code` tab bar built on headless `@ui-sdk/solid/tabs`
 * - `Reset` button remounts the preview cleanly and clears its console log
 * - Automatic filename badge + `Copy` button when viewing code
 * - Built-in `DocConsole` terminal shown when `console` is set or when the
 *   preview logs events via `useDocLog()`
 */
export function DocPreview(props: DocPreviewProps) {
  const [tab, setTab] = createSignal<'preview' | 'code'>('preview')
  const [run, setRun] = createSignal(0)
  const [entries, setEntries] = createSignal<string[]>([])

  const resolvedFiles = createMemo<DocCodeFile[]>(() => {
    if (props.files && props.files.length > 0) return props.files
    if (props.code) {
      return [
        {
          name: props.filename ?? 'example.tsx',
          lang: props.lang ?? 'tsx',
          code: props.code,
        },
      ]
    }
    return []
  })

  const hasCode = () => resolvedFiles().length > 0
  const isSingleFile = () => resolvedFiles().length === 1
  const showConsole = () => Boolean(props.console) || entries().length > 0

  const log = (message: string) => {
    setEntries((prev) => [...prev, message].slice(-50))
  }

  const reset = () => {
    setEntries([])
    setRun((n) => n + 1)
  }

  const renderStage = () => (
    <DocLogContext value={log}>
      <div class={['doc-preview-stage', props.stageClass]}>
        <For each={[run()]}>
          {() =>
            typeof props.children === 'function'
              ? props.children()
              : props.children
          }
        </For>
      </div>
      <Show when={showConsole()}>
        <DocConsole entries={entries()} onClear={() => setEntries([])} />
      </Show>
    </DocLogContext>
  )

  return (
    <figure class={['my-0 min-w-0', props.class]}>
      <Show
        when={hasCode()}
        fallback={
          <DocFrame class="overflow-hidden">
            <div class="doc-tabbar justify-between">
              <span class="pl-1.5 text-[11.5px] font-medium text-faint">
                Preview
              </span>
              <button
                type="button"
                class="doc-icon-btn"
                aria-label="Reset preview"
                title="Reset preview"
                onClick={reset}
              >
                <RotateCcwIcon class="size-3.5" />
              </button>
            </div>
            {renderStage()}
          </DocFrame>
        }
      >
        <DocFrame class="overflow-hidden">
          <UiTabs
            value={tab()}
            onValueChange={(next) => {
              if (next === 'preview' || next === 'code') setTab(next)
            }}
            class="flex min-w-0 flex-col"
          >
            <div class="doc-tabbar">
              <UiTabsList aria-label="Example view" class="doc-tablist">
                <UiTabsTab value="preview" class="doc-tab">
                  Preview
                </UiTabsTab>
                <UiTabsTab value="code" class="doc-tab">
                  Code
                </UiTabsTab>
              </UiTabsList>

              <div class="ml-auto flex min-w-0 items-center gap-1.5">
                <Show
                  when={tab() === 'code'}
                  fallback={
                    <button
                      type="button"
                      class="doc-icon-btn"
                      aria-label="Reset preview"
                      title="Reset preview"
                      onClick={reset}
                    >
                      <RotateCcwIcon class="size-3.5" />
                    </button>
                  }
                >
                  <Show when={isSingleFile()}>
                    <span class="hidden min-w-0 items-center gap-1.5 truncate font-mono text-[11.5px] text-faint sm:inline-flex">
                      <FileCodeIcon class="size-3.5 shrink-0" />
                      <span class="truncate">{resolvedFiles()[0]?.name}</span>
                    </span>
                    <DocCopyButton
                      text={() => resolvedFiles()[0]?.code ?? ''}
                      ariaLabel={`Copy ${resolvedFiles()[0]?.name ?? 'code'}`}
                    />
                  </Show>
                </Show>
              </div>
            </div>

            <UiTabsPanel value="preview" keepMounted class="min-w-0 outline-none">
              {renderStage()}
            </UiTabsPanel>

            <UiTabsPanel value="code" class="min-w-0 outline-none">
              <Show
                when={isSingleFile()}
                fallback={<DocCodeTabs files={resolvedFiles()} bare collapsible />}
              >
                <DocCodeBlock
                  code={resolvedFiles()[0]?.code ?? ''}
                  lang={resolvedFiles()[0]?.lang ?? 'tsx'}
                  copy={false}
                  bare
                  collapsible
                />
              </Show>
            </UiTabsPanel>
          </UiTabs>
        </DocFrame>
      </Show>

      <Show when={props.caption}>
        <figcaption class="mt-2.5 px-0.5 text-[12px] leading-[18px] text-muted">
          {props.caption}
        </figcaption>
      </Show>
    </figure>
  )
}
