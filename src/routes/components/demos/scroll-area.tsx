import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createScrollAreaController,
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaFade,
  ScrollAreaScrollbar,
  ScrollAreaScrollToEnd,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '#/components/ui/scroll-area'

import { Group } from '../demo-group'

const versions = Array.from({ length: 24 }, (_, idx) => ({
  tag: `v2.${24 - idx}.0`,
  date: `Oct ${String(28 - (idx % 25)).padStart(2, '0')}`,
  summary:
    idx % 3 === 0
      ? 'Improved keyboard navigation and focus restoration.'
      : idx % 3 === 1
        ? 'Refined dark-scheme semantic border and elevation tokens.'
        : 'Reduced layout shift on dynamic resize observers.',
}))

const paletteTokens = [
  { name: 'Blue', token: 'var(--v2-blue-600)' },
  { name: 'Cyan', token: 'var(--v2-cyan-600)' },
  { name: 'Green', token: 'var(--v2-green-600)' },
  { name: 'Yellow', token: 'var(--v2-yellow-600)' },
  { name: 'Orange', token: 'var(--v2-orange-600)' },
  { name: 'Red', token: 'var(--v2-red-600)' },
  { name: 'Pink', token: 'var(--v2-pink-600)' },
  { name: 'Purple', token: 'var(--v2-purple-600)' },
]

const releases = [
  {
    version: 'v2.12.0',
    date: 'Oct 28, 2026',
    status: 'Latest',
    downloads: '18,204',
    size: '4.3 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.11.2',
    date: 'Oct 14, 2026',
    status: 'Stable',
    downloads: '26,931',
    size: '4.2 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.11.1',
    date: 'Oct 02, 2026',
    status: 'Stable',
    downloads: '9,412',
    size: '4.2 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.11.0',
    date: 'Sep 23, 2026',
    status: 'Stable',
    downloads: '31,077',
    size: '4.1 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.10.3',
    date: 'Sep 09, 2026',
    status: 'Stable',
    downloads: '12,640',
    size: '4.0 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.10.2',
    date: 'Aug 27, 2026',
    status: 'Stable',
    downloads: '8,315',
    size: '4.0 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.10.1',
    date: 'Aug 18, 2026',
    status: 'Stable',
    downloads: '5,902',
    size: '3.9 MB',
    runtime: 'Solid 2.0',
  },
  {
    version: 'v2.9.4',
    date: 'Jul 21, 2026',
    status: 'Archived',
    downloads: '3,118',
    size: '3.8 MB',
    runtime: 'Solid 2.0',
  },
]

export function ScrollAreaDemo() {
  const [logs, setLogs] = createSignal([
    '12:00:01  Build pipeline initialized',
    '12:00:02  Resolving @ui-sdk/solid workspace bindings',
    '12:00:04  Compiling 6 component stylesheets',
    '12:00:05  Verifying semantic --v2-* token contrast',
    '12:00:06  TypeScript strict check passed',
    '12:00:08  Waiting for live events…',
  ])
  const logController = createScrollAreaController()

  const appendLog = () => {
    const count = logs().length + 1
    const sec = String((count * 3) % 60).padStart(2, '0')
    setLogs((prev) => [
      ...prev,
      `12:01:${sec}  Event #${count} streamed to viewport`,
    ])
  }

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Vertical with edge fades">
        <ScrollArea framed class="h-[220px] w-full">
          <ScrollAreaViewport role="region" aria-label="Changelog">
            <ScrollAreaContent class="p-3">
              <div class="flex flex-col divide-y divide-border-muted">
                <For each={versions}>
                  {(item) => (
                    <div class="py-2 first:pt-0 last:pb-0">
                      <div class="flex items-center justify-between gap-2">
                        <span class="text-[13px] font-medium text-foreground tabular-nums">
                          {item.tag}
                        </span>
                        <span class="text-[11px] text-faint tabular-nums">
                          {item.date}
                        </span>
                      </div>
                      <p class="mt-0.5 text-[12px] text-muted">
                        {item.summary}
                      </p>
                    </div>
                  )}
                </For>
              </div>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaFade edge="top" />
          <ScrollAreaFade edge="bottom" />
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </Group>

      <Group label="Horizontal scrollbar">
        <ScrollArea framed type="auto" class="w-full">
          <ScrollAreaViewport role="region" aria-label="Accent tokens">
            <ScrollAreaContent class="p-3">
              <ul class="flex w-max gap-2.5">
                <For each={paletteTokens}>
                  {(swatch) => (
                    <li class="flex w-[104px] shrink-0 flex-col gap-2 rounded-md border border-border-muted bg-surface p-2">
                      <div
                        class="h-14 w-full rounded"
                        style={{ background: swatch.token }}
                      />
                      <span class="text-[12px] font-medium text-foreground">
                        {swatch.name}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaFade edge="left" />
          <ScrollAreaFade edge="right" />
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </Group>

      <Group label="Both axes with corner">
        <ScrollArea framed type="auto" class="h-[220px] w-full">
          <ScrollAreaViewport role="region" aria-label="Release history">
            <ScrollAreaContent>
              <table class="w-[540px] border-collapse text-left text-[12px] tabular-nums">
                <thead class="sticky top-0 z-1 bg-surface text-[11px] font-medium text-faint">
                  <tr class="border-b border-border">
                    <th class="px-3 py-2">Version</th>
                    <th class="px-3 py-2">Released</th>
                    <th class="px-3 py-2">Status</th>
                    <th class="px-3 py-2 text-right">Downloads</th>
                    <th class="px-3 py-2 text-right">Size</th>
                    <th class="px-3 py-2">Runtime</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-muted">
                  <For each={releases}>
                    {(row) => (
                      <tr>
                        <th
                          scope="row"
                          class="px-3 py-2 font-medium text-foreground"
                        >
                          {row.version}
                        </th>
                        <td class="px-3 py-2 text-muted">{row.date}</td>
                        <td class="px-3 py-2 text-muted">{row.status}</td>
                        <td class="px-3 py-2 text-right text-foreground">
                          {row.downloads}
                        </td>
                        <td class="px-3 py-2 text-right text-muted">
                          {row.size}
                        </td>
                        <td class="px-3 py-2 text-muted">{row.runtime}</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollArea>
      </Group>

      <Group label="Stick-to-end stream & controller">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-2">
            <Button size="small" variant="outline" onClick={appendLog}>
              Append log
            </Button>
            <Button
              size="small"
              variant="ghost-muted"
              onClick={() =>
                logController.scrollToStart({ behavior: 'smooth' })
              }
            >
              Top
            </Button>
            <Button
              size="small"
              variant="ghost-muted"
              onClick={() => logController.scrollToEnd({ behavior: 'smooth' })}
            >
              Bottom
            </Button>
          </div>

          <ScrollArea
            framed
            stickToEnd
            controller={logController}
            class="h-[180px] w-full"
          >
            <ScrollAreaViewport role="log" aria-label="Build output">
              <ScrollAreaContent class="p-3">
                <ul class="flex flex-col gap-1.5 font-mono text-[12px] text-muted tabular-nums">
                  <For each={logs()}>{(line) => <li>{line}</li>}</For>
                </ul>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollToEnd>Jump to latest</ScrollAreaScrollToEnd>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </div>
      </Group>
    </div>
  )
}
