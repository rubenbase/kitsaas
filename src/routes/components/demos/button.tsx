import { For } from 'solid-js'

import {
  ArrowUpRightIcon,
  ComponentsIcon,
  DownloadIcon,
  PlusIcon,
} from '#/components/icons'
import { Button, type ButtonProps } from '#/components/ui/button'

import { Group } from '../demo-group'

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

export function ButtonDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Variants">
        <For each={variants}>
          {(item) => <Button variant={item.variant}>{item.label}</Button>}
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
          onClick={() => new Promise((resolve) => setTimeout(resolve, 1500))}
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
  )
}
