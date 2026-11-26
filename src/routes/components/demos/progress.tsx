import { For } from 'solid-js'

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '#/components/ui/progress'

import { Group } from '../demo-group'

export function ProgressDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Determinate">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <For
            each={[
              { label: 'Starting', value: 0 },
              { label: 'Uploading photos', value: 25 },
              { label: 'Exporting video', value: 60 },
              { label: 'Backup', value: 100 },
            ]}
          >
            {(item) => (
              <Progress value={item.value}>
                <div data-slot="progress-header">
                  <ProgressLabel>{item.label}</ProgressLabel>
                  <ProgressValue />
                </div>
                <ProgressTrack>
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            )}
          </For>
        </div>
      </Group>

      <Group label="Indeterminate">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <Progress>
            <div data-slot="progress-header">
              <ProgressLabel>Connecting to server</ProgressLabel>
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress aria-label="Syncing">
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </Group>

      <Group label="With a value label">
        <div class="w-[280px] max-w-full">
          <Progress
            value={3}
            max={12}
            getValueLabel={(value, details) =>
              `${value} of ${details.max} files, ${details.formatted}`
            }
          >
            <div data-slot="progress-header">
              <ProgressLabel>Copying files</ProgressLabel>
              <ProgressValue>3 of 12</ProgressValue>
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </Group>
    </div>
  )
}
