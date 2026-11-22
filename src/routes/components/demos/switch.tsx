import { Switch, SwitchThumb } from '#/components/ui/switch'

import { Group } from '../demo-group'

export function SwitchDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Off and on">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Notifications</span>
          <Switch>
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Notifications</span>
          <Switch defaultChecked>
            <SwitchThumb />
          </Switch>
        </label>
      </Group>

      <Group label="Appearances">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Compact, on</span>
          <Switch defaultChecked>
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Standard, off</span>
          <Switch appearance="standard">
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Standard, on</span>
          <Switch appearance="standard" defaultChecked>
            <SwitchThumb />
          </Switch>
        </label>
      </Group>

      <Group label="Disabled">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Off, disabled</span>
          <Switch disabled>
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>On, disabled</span>
          <Switch defaultChecked disabled>
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Standard, disabled</span>
          <Switch appearance="standard" defaultChecked disabled>
            <SwitchThumb />
          </Switch>
        </label>
      </Group>

      <Group label="Read-only">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Focusable, unchanged</span>
          <Switch defaultChecked readOnly>
            <SwitchThumb />
          </Switch>
        </label>
      </Group>

      <Group label="Invalid">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Standard</span>
          <Switch appearance="standard" invalid>
            <SwitchThumb />
          </Switch>
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <span>Compact (no ring upstream)</span>
          <Switch invalid>
            <SwitchThumb />
          </Switch>
        </label>
      </Group>
    </div>
  )
}
