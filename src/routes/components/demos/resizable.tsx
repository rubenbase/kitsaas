import { createSignal } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createResizableController,
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from '#/components/ui/resizable'

import { Group } from '../demo-group'

export function ResizableDemo() {
  const collapsibleController = createResizableController()
  const [locked, setLocked] = createSignal(false)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Nested horizontal & vertical workspace">
          <div class="h-[260px] w-full">
            <Resizable class="h-full">
              <ResizablePanel defaultSize={28} minSize={18} maxSize={45}>
                {(state) => (
                  <div class="flex h-full flex-col bg-surface p-3">
                    <div class="flex items-center justify-between">
                      <h3 class="text-[12px] font-medium text-foreground">
                        Explorer
                      </h3>
                      <span class="text-[11px] text-faint tabular-nums">
                        {Math.round(state.size)}%
                      </span>
                    </div>
                    <ul class="mt-2.5 flex flex-col gap-1 text-[12px] text-muted">
                      <li class="rounded bg-surface-2 px-2 py-1 text-foreground">
                        src/components/ui/resizable.tsx
                      </li>
                      <li class="px-2 py-1">src/components/ui/resizable.css</li>
                      <li class="px-2 py-1">src/theme.css</li>
                    </ul>
                  </div>
                )}
              </ResizablePanel>

              <ResizableHandle aria-label="Resize explorer" />

              <ResizablePanel defaultSize={72} minSize={40}>
                <Resizable orientation="vertical" class="h-full">
                  <ResizablePanel defaultSize={62} minSize={30}>
                    {(state) => (
                      <div class="flex h-full flex-col justify-between p-3">
                        <div class="flex items-center justify-between">
                          <h3 class="text-[12px] font-medium text-foreground">
                            Editor · resizable.tsx
                          </h3>
                          <span class="text-[11px] text-faint tabular-nums">
                            {Math.round(state.size)}%
                          </span>
                        </div>
                        <p class="font-mono text-[12px] text-muted">
                          export function Resizable(props: ResizableProps)
                        </p>
                      </div>
                    )}
                  </ResizablePanel>

                  <ResizableHandle aria-label="Resize terminal" withHandle />

                  <ResizablePanel defaultSize={38} minSize={24}>
                    {(state) => (
                      <div class="flex h-full flex-col justify-between bg-surface p-3">
                        <div class="flex items-center justify-between">
                          <h3 class="text-[12px] font-medium text-foreground">
                            Terminal
                          </h3>
                          <span class="text-[11px] text-faint tabular-nums">
                            {Math.round(state.size)}%
                          </span>
                        </div>
                        <p class="font-mono text-[12px] text-muted">
                          $ pnpm typecheck — 0 errors
                        </p>
                      </div>
                    )}
                  </ResizablePanel>
                </Resizable>
              </ResizablePanel>
            </Resizable>
          </div>
        </Group>
      </div>

      <Group label="Collapsible sidebar with controller">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-2">
            <Button
              size="small"
              variant="outline"
              onClick={() => collapsibleController.collapse('sidebar')}
            >
              Collapse
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => collapsibleController.expand('sidebar')}
            >
              Expand
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => collapsibleController.setLayout([32, 68])}
            >
              Reset
            </Button>
          </div>

          <div class="h-[190px] w-full">
            <Resizable controller={collapsibleController} class="h-full">
              <ResizablePanel
                id="sidebar"
                defaultSize={32}
                minSize={22}
                collapsible
                collapsedSize="44px"
              >
                {(state) => (
                  <div class="flex h-full flex-col gap-2 bg-surface p-3">
                    <div class="flex items-center justify-between">
                      <h3 class="truncate text-[12px] font-medium text-foreground">
                        {state.collapsed ? 'Nav' : 'Navigation'}
                      </h3>
                    </div>
                    <p class="truncate text-[12px] text-muted tabular-nums">
                      {state.collapsed
                        ? 'Min'
                        : `${Math.round(state.size)}% · Double-click handle`}
                    </p>
                  </div>
                )}
              </ResizablePanel>

              <ResizableHandle aria-label="Resize navigation" withHandle />

              <ResizablePanel minSize={40}>
                <div class="flex h-full flex-col justify-between p-3">
                  <h3 class="text-[12px] font-medium text-foreground">
                    Document canvas
                  </h3>
                  <p class="text-[12px] text-muted">
                    Drag the sidebar past its minimum width or press Enter on
                    the handle to collapse.
                  </p>
                </div>
              </ResizablePanel>
            </Resizable>
          </div>
        </div>
      </Group>

      <Group label="Vertical split & lock toggle">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex items-center gap-2">
            <Button
              size="small"
              variant={locked() ? 'contrast' : 'outline'}
              aria-pressed={locked() ? 'true' : 'false'}
              onClick={() => setLocked((prev) => !prev)}
            >
              {locked() ? 'Layout locked' : 'Lock layout'}
            </Button>
          </div>

          <div class="h-[190px] w-full">
            <Resizable
              orientation="vertical"
              disabled={locked()}
              class="h-full"
            >
              <ResizablePanel defaultSize={48} minSize={25}>
                <div class="flex h-full flex-col justify-between p-3">
                  <h3 class="text-[12px] font-medium text-foreground">Inbox</h3>
                  <p class="text-[12px] text-muted">
                    3 unread messages · Release notes ready
                  </p>
                </div>
              </ResizablePanel>

              <ResizableHandle aria-label="Resize inbox" />

              <ResizablePanel defaultSize={52} minSize={25}>
                <div class="flex h-full flex-col justify-between bg-surface p-3">
                  <h3 class="text-[12px] font-medium text-foreground">
                    Message preview
                  </h3>
                  <p class="text-[12px] text-muted">
                    Focus the separator and use Up/Down arrows (Shift for 10%
                    steps).
                  </p>
                </div>
              </ResizablePanel>
            </Resizable>
          </div>
        </div>
      </Group>
    </div>
  )
}
