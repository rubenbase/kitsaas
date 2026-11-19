import type { JSX } from '@solidjs/web'
import { For } from 'solid-js'

import { PageContent, PageLayout } from '#/components/app-shell'
import {
  ArrowUpRightIcon,
  ComponentsIcon,
  DownloadIcon,
  PlusIcon,
} from '#/components/icons'
import { Button, type ButtonProps } from '#/components/ui/button'

const variants: { variant: ButtonProps['variant']; label: string }[] = [
  { variant: 'neutral', label: 'Neutral' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'contrast', label: 'Contrast' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'ghost-muted', label: 'Ghost muted' },
  { variant: 'ghost-faint', label: 'Ghost faint' },
  { variant: 'danger', label: 'Danger' },
  { variant: 'warning', label: 'Warning' },
]

const sizes: { size: ButtonProps['size']; label: string }[] = [
  { size: 'small', label: 'Small' },
  { size: 'normal', label: 'Normal' },
  { size: 'large', label: 'Large' },
]

export function ComponentsPage() {
  return (
    <PageLayout>
      <PageContent class="pt-12 max-md:pt-8">
        <header class="max-w-2xl">
          <p class="text-[11px] uppercase tracking-[0.08em] text-faint">
            Kitsaas
          </p>
          <h1 class="mt-1 text-[22px] leading-7 tracking-[-0.02em] [font-weight:530]">
            Components
          </h1>
          <p class="mt-2 text-muted">
            Styled with CSS, powered by ui-sdk behaviors. No Base UI, no Radix —
            every control runs on the framework-agnostic core.
          </p>
        </header>

        <section class="mt-8 rounded-[10px] border border-border bg-surface">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-border-muted px-5 py-4">
            <div>
              <h2 class="[font-weight:530]">Button</h2>
              <p class="mt-0.5 text-[12px] text-muted">
                Stays pending while an async action runs, handles disabled
                state, and renders as a link when given an href.
              </p>
            </div>
            <code class="rounded-[4px] bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">
              @ui-sdk/solid/button
            </code>
          </div>

          <div class="grid gap-6 px-5 py-5 lg:grid-cols-2">
            <Group label="Variants">
              <For each={variants}>
                {(item) => (
                  <Button variant={item.variant}>{item.label}</Button>
                )}
              </For>
            </Group>

            <Group label="Sizes">
              <For each={sizes}>
                {(item) => (
                  <Button variant="neutral" size={item.size}>
                    {item.label}
                  </Button>
                )}
              </For>
            </Group>

            <Group label="Nav">
              <Button variant="nav" icon={<ComponentsIcon />}>
                Components
              </Button>
              <Button variant="nav" icon={<ComponentsIcon />} active>
                Active
              </Button>
            </Group>

            <Group label="With icons">
              <Button variant="neutral" icon={<PlusIcon />}>
                Add limit
              </Button>
              <Button variant="outline" icon={<DownloadIcon />}>
                Download
              </Button>
              <Button variant="ghost-muted" icon={<ArrowUpRightIcon />}>
                Details
              </Button>
            </Group>

            <Group label="States">
              <Button variant="neutral" disabled>
                Disabled
              </Button>
              <Button
                variant="contrast"
                onClick={() =>
                  new Promise((resolve) => setTimeout(resolve, 1500))
                }
                pendingAnnouncement="Saving"
              >
                Save changes
              </Button>
            </Group>

            <Group label="Links">
              <Button
                href="https://ui-sdk.dev/docs/solid/components/button"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                icon={<ArrowUpRightIcon />}
              >
                ui-sdk docs
              </Button>
              <Button href="/charts" variant="ghost">
                Open charts
              </Button>
            </Group>
          </div>
        </section>

        <section class="mt-6 rounded-[10px] border border-border bg-surface p-5">
          <h2 class="[font-weight:530]">How it works</h2>
          <p class="mt-1 text-[12px] text-muted">
            ui-sdk owns the behavior: focus, keyboard, ARIA state, pending
            presses and disabled handling. Kitsaas owns the look.
          </p>
          <pre class="mt-4 overflow-x-auto rounded-[6px] border border-border-muted bg-background p-4 font-mono text-[12px] leading-5 text-secondary">
            {`<Button href="/charts" variant="nav" icon={<ChartsIcon />}>\n  Charts\n</Button>`}
          </pre>
        </section>
      </PageContent>
    </PageLayout>
  )
}

function Group(props: { label: string; children: JSX.Element }) {
  return (
    <div>
      <p class="text-[11px] uppercase tracking-[0.08em] text-faint">
        {props.label}
      </p>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        {props.children}
      </div>
    </div>
  )
}
