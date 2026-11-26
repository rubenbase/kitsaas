import type { JSX } from '@solidjs/web'
import { createContext, createMemo, useContext } from 'solid-js'

import {
  DocPreview,
  DocSection,
  extractGroupSnippet,
  slugify,
} from '#/docs'

export type ComponentDocContextValue = {
  slug: () => string
  demoSource: () => string | null
}

export const ComponentDocContext =
  createContext<ComponentDocContextValue | null>(null)

export type GroupProps = {
  label: string
  description?: string
  caption?: string
  /** Always render the interactive live Console terminal under the preview. */
  console?: boolean
  children: JSX.Element
}

/**
 * Wraps each example inside `src/routes/components/demos/*.tsx`.
 *
 * When rendered inside a component doc page (`ComponentDocContext`), every
 * `<Group label="...">` automatically becomes:
 * - A self-registering `h3` section in the right-hand "On this page" TOC
 * - A `DocPreview` frame with `Preview` | `Code` tabs, auto-extracted Solid
 *   source code, Reset, Copy, and optional live Console terminal
 */
export function Group(props: GroupProps) {
  const ctx = useContext(ComponentDocContext)

  const snippet = createMemo(() => {
    const source = ctx?.demoSource() ?? null
    return extractGroupSnippet(source, props.label)
  })

  const filename = () => {
    const slug = ctx?.slug()
    const suffix = slugify(props.label)
    return slug ? `${slug}-${suffix}.tsx` : `${suffix}.tsx`
  }

  if (!ctx) {
    return (
      <div class="min-w-0">
        <h2 class="text-[11px] uppercase tracking-[0.08em] text-faint">
          {props.label}
        </h2>
        <div class="mt-2.5 flex flex-wrap items-center gap-2">
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <DocSection level={3} title={props.label} description={props.description}>
      <DocPreview
        code={snippet()}
        filename={filename()}
        console={props.console}
        caption={props.caption}
      >
        {() => (
          <div class="flex flex-wrap items-center gap-3">{props.children}</div>
        )}
      </DocPreview>
    </DocSection>
  )
}
