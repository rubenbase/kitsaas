import { Radio, RadioGroup, RadioIndicator } from '#/components/ui/radio'

import { Group } from '../demo-group'

export function RadioDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <RadioGroup defaultValue="daily" aria-label="Notification frequency">
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="daily">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Daily
            </span>
          </label>
          <label class="flex cursor-default select-none items-start gap-2">
            <Radio value="weekly" class="mt-[2px]">
              <RadioIndicator />
            </Radio>
            <span class="flex flex-col gap-1.5">
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
                Weekly
              </span>
              <span class="text-[11px] leading-none tracking-[0.05px] text-secondary">
                Every Monday morning.
              </span>
            </span>
          </label>
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="never">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Never
            </span>
          </label>
        </RadioGroup>
      </Group>

      <Group label="Disabled">
        <RadioGroup defaultValue="daily" disabled aria-label="Disabled group">
          <label class="flex cursor-not-allowed select-none items-center gap-2">
            <Radio value="daily">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-secondary">
              Daily
            </span>
          </label>
          <label class="flex cursor-not-allowed select-none items-start gap-2">
            <Radio value="weekly" class="mt-[2px]">
              <RadioIndicator />
            </Radio>
            <span class="flex flex-col gap-1.5">
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-secondary">
                Weekly
              </span>
              <span class="text-[11px] leading-none tracking-[0.05px] text-muted">
                Every Monday morning.
              </span>
            </span>
          </label>
        </RadioGroup>
      </Group>

      <Group label="Disabled item">
        <RadioGroup defaultValue="daily" aria-label="Backups">
          <label class="flex cursor-not-allowed select-none items-center gap-2">
            <Radio value="hourly" disabled>
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-secondary">
              Hourly
            </span>
          </label>
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="daily">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Daily
            </span>
          </label>
        </RadioGroup>
      </Group>

      <Group label="Read-only">
        <RadioGroup defaultValue="pro" readOnly aria-label="Your plan">
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="free">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Free
            </span>
          </label>
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="pro">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Pro
            </span>
          </label>
          <label class="flex cursor-default select-none items-center gap-2">
            <Radio value="team">
              <RadioIndicator />
            </Radio>
            <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
              Team
            </span>
          </label>
        </RadioGroup>
      </Group>

      <Group label="Invalid">
        <div class="flex flex-col gap-2">
          <RadioGroup invalid aria-label="Order updates">
            <label class="flex cursor-default select-none items-center gap-2">
              <Radio value="email">
                <RadioIndicator />
              </Radio>
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
                Email only
              </span>
            </label>
            <label class="flex cursor-default select-none items-center gap-2">
              <Radio value="sms">
                <RadioIndicator />
              </Radio>
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
                SMS only
              </span>
            </label>
          </RadioGroup>
          <p class="text-[12px] text-danger">
            Choose how to get order updates.
          </p>
        </div>
      </Group>

      <Group label="Fieldset and legend">
        <fieldset class="m-0 flex flex-col gap-2 border-0 p-0">
          <legend class="text-[11px] uppercase tracking-[0.08em] text-faint">
            Billing period
          </legend>
          <p class="text-[11px] text-muted">
            Yearly billing gets you two months free.
          </p>
          <RadioGroup defaultValue="monthly" aria-label="Billing period">
            <label class="flex cursor-default select-none items-center gap-2">
              <Radio value="monthly">
                <RadioIndicator />
              </Radio>
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
                Monthly
              </span>
            </label>
            <label class="flex cursor-default select-none items-center gap-2">
              <Radio value="yearly">
                <RadioIndicator />
              </Radio>
              <span class="text-[13px] leading-5 tracking-[-0.04px] text-foreground">
                Yearly
              </span>
            </label>
          </RadioGroup>
        </fieldset>
      </Group>
    </div>
  )
}
