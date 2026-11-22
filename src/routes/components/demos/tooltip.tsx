import { For } from 'solid-js'

import { DownloadIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipShortcut,
  TooltipTrigger,
} from '#/components/ui/tooltip'

import { Group } from '../demo-group'

export function TooltipDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Sides">
        <div class="grid w-full grid-cols-2 gap-x-16">
          <For
            each={
              [
                { side: 'top', label: 'Top' },
                { side: 'bottom', label: 'Bottom' },
                { side: 'left', label: 'Left' },
                { side: 'right', label: 'Right' },
              ] as const
            }
          >
            {(item) => (
              <div class="flex justify-center py-6">
                <Tooltip forceOpen>
                  <TooltipTrigger
                    render={(triggerProps) => (
                      <Button {...triggerProps} variant="outline">
                        {item.label}
                      </Button>
                    )}
                  />
                  <TooltipContent side={item.side}>
                    {item.label} tooltip
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </For>
        </div>
      </Group>

      <Group label="Appearances">
        <div class="flex w-full flex-wrap items-center justify-center gap-x-40">
          <For
            each={[{ appearance: 'compact' }, { appearance: 'large' }] as const}
          >
            {(item) => (
              <div class="flex justify-center py-6">
                <Tooltip forceOpen appearance={item.appearance}>
                  <TooltipTrigger
                    render={(triggerProps) => (
                      <Button {...triggerProps} variant="outline">
                        {item.appearance === 'compact' ? 'Compact' : 'Large'}
                      </Button>
                    )}
                  />
                  <TooltipContent>
                    {item.appearance === 'compact'
                      ? 'Compact tooltip'
                      : 'Large tooltip with more room'}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </For>
        </div>
      </Group>

      <Group label="With a shortcut">
        <div class="flex w-full justify-center py-6">
          <Tooltip forceOpen shortcut="mod+s">
            <TooltipTrigger
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  variant="outline"
                  icon={<DownloadIcon />}
                >
                  Save
                </Button>
              )}
            />
            <TooltipContent>
              Save
              <TooltipShortcut />
            </TooltipContent>
          </Tooltip>
        </div>
      </Group>

      <Group label="Disabled button (aria-disabled)">
        <div class="flex w-full justify-center py-6">
          <Tooltip forceOpen>
            <TooltipTrigger
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  variant="neutral"
                  aria-disabled="true"
                >
                  Publish
                </Button>
              )}
            />
            <TooltipContent side="right">
              Add a title to publish
            </TooltipContent>
          </Tooltip>
        </div>
      </Group>
    </div>
  )
}
