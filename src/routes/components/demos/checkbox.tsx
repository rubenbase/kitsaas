import { Checkbox, CheckboxIndicator } from '#/components/ui/checkbox'

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

function CompactCheckMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.53564 8.17857L6.39279 11.75L12.4642 4.25"
        stroke="currentColor"
        stroke-width="1"
      />
    </svg>
  )
}

export function CheckboxDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="States">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Unchecked
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox defaultChecked>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Checked
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox defaultChecked="indeterminate">
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Indeterminate
        </label>
      </Group>

      <Group label="Disabled">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox disabled>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Off, disabled
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox defaultChecked disabled>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          On, disabled
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact" defaultChecked disabled>
            <CheckboxIndicator>
              <CompactCheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Compact, disabled
        </label>
      </Group>

      <Group label="Read-only">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox defaultChecked readOnly>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Focusable, unchanged
        </label>
      </Group>

      <Group label="Invalid">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox invalid>
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Accept the terms
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact" invalid>
            <CheckboxIndicator>
              <CompactCheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Compact, invalid
        </label>
      </Group>

      <Group label="With label and description">
        <label class="flex select-none items-start gap-2">
          <Checkbox defaultChecked class="mt-[2px]">
            <CheckboxIndicator>
              <CheckMark />
            </CheckboxIndicator>
          </Checkbox>
          <span class="flex flex-col gap-1.5">
            <span class="text-[13px] text-secondary">
              Email me about product updates
            </span>
            <span class="text-[11px] text-muted">
              Product news and tips, once a week. Unsubscribe anytime.
            </span>
          </span>
        </label>
      </Group>

      <Group label="Compact">
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact">
            <CheckboxIndicator>
              <CompactCheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Base
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact" defaultChecked>
            <CheckboxIndicator>
              <CompactCheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Checked
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact" surface="layer-1" defaultChecked>
            <CheckboxIndicator>
              <CompactCheckMark />
            </CheckboxIndicator>
          </Checkbox>
          Layer-1 surface
        </label>
        <label class="flex select-none items-center gap-2 text-[13px] text-secondary">
          <Checkbox appearance="compact" defaultChecked="indeterminate">
            <CheckboxIndicator>
              <CompactCheckMark />
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.75 8H3.25"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
              </svg>
            </CheckboxIndicator>
          </Checkbox>
          Mixed
        </label>
      </Group>
    </div>
  )
}
