import { Separator } from '#/components/ui/separator'

import { Group } from '../demo-group'

export function SeparatorDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Horizontal">
        <div class="flex w-[280px] max-w-full flex-col gap-4 text-[13px] text-secondary">
          <span>Above</span>
          <Separator />
          <span>Below</span>
        </div>
      </Group>

      <Group label="Vertical">
        <div class="flex h-10 items-center gap-3 text-[13px] text-secondary">
          <span>24 Projects</span>
          <Separator orientation="vertical" />
          <span>1,280 Followers</span>
          <Separator orientation="vertical" />
          <span>312 Following</span>
        </div>
      </Group>

      <Group label="Decorative (no aria role)">
        <div class="flex w-[280px] max-w-full flex-col gap-3 text-[13px] text-secondary">
          <span>Sign in with a passkey</span>
          <div class="flex items-center gap-3">
            <Separator decorative class="flex-1" />
            <span class="text-[11px] uppercase tracking-[0.08em] text-faint">
              or
            </span>
            <Separator decorative class="flex-1" />
          </div>
          <span>Email me a link</span>
        </div>
      </Group>
    </div>
  )
}
