import { Checkbox, CheckboxIndicator } from '#/components/ui/checkbox'
import { Input, InputGroup } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Switch, SwitchThumb } from '#/components/ui/switch'

import { Group } from '../demo-group'

function CheckMark() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="10"
      height="10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7.17905L5.02703 8.85135L9 3.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  )
}

export function LabelDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="With Input">
        <div class="flex w-[280px] max-w-full flex-col gap-2">
          <Label for="demo-workspace-name" required>
            Workspace name
          </Label>
          <InputGroup>
            <Input
              id="demo-workspace-name"
              required
              placeholder="Acme Cloud"
            />
          </InputGroup>
        </div>
      </Group>

      <Group label="With Checkbox">
        <div class="flex flex-col gap-3">
          <Label>
            <Checkbox defaultChecked>
              <CheckboxIndicator>
                <CheckMark />
              </CheckboxIndicator>
            </Checkbox>
            Send weekly usage digest
          </Label>

          <div class="flex items-center gap-2">
            <Checkbox id="demo-terms">
              <CheckboxIndicator>
                <CheckMark />
              </CheckboxIndicator>
            </Checkbox>
            <Label for="demo-terms" required>
              Accept terms of service
            </Label>
          </div>
        </div>
      </Group>

      <Group label="With Switch">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <Switch id="demo-auto-deploy" defaultChecked>
              <SwitchThumb />
            </Switch>
            <Label for="demo-auto-deploy">Auto-deploy pull requests</Label>
          </div>

          <div class="flex items-center gap-2.5">
            <Switch id="demo-audit-log">
              <SwitchThumb />
            </Switch>
            <Label for="demo-audit-log">Stream audit logs</Label>
          </div>
        </div>
      </Group>

      <Group label="States">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <Label for="demo-invalid-email" required invalid>
              Billing email
            </Label>
            <InputGroup invalid>
              <Input
                id="demo-invalid-email"
                type="email"
                invalid
                defaultValue="invalid-address"
              />
            </InputGroup>
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="demo-disabled-region" disabled>
              Region
            </Label>
            <InputGroup>
              <Input
                id="demo-disabled-region"
                disabled
                defaultValue="us-east-1"
              />
            </InputGroup>
          </div>
        </div>
      </Group>
    </div>
  )
}
