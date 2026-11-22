import { createSignal, For } from 'solid-js'

import { CheckIcon } from '#/components/icons'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
  type PasswordInputAppearance,
  type PasswordInputSurface,
} from '#/components/ui/password-input'

import { Group } from '../demo-group'

const rules = [
  {
    label: 'At least 8 characters',
    test: (value: string) => value.length >= 8,
  },
  {
    label: 'Includes a number',
    test: (value: string) => /\d/.test(value),
  },
  {
    label: 'Mixed uppercase & lowercase',
    test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
]

function LockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.25}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
      <path d="M5.25 7V5a2.75 2.75 0 0 1 5.5 0v2" />
    </svg>
  )
}

export function PasswordInputDemo() {
  const [newPassword, setNewPassword] = createSignal('')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <PasswordInput>
          <PasswordInputControl
            placeholder="Enter password"
            aria-label="Password"
          />
          <PasswordInputToggle aria-label="Show password" />
        </PasswordInput>
        <PasswordInput
          defaultVisible
          defaultValue="maple-orbit-42"
          autoComplete="off"
          leadingIcon={<LockIcon />}
        >
          <PasswordInputControl aria-label="Wi-Fi password" />
          <PasswordInputToggle aria-label="Show Wi-Fi password" />
        </PasswordInput>
      </Group>

      <Group label="Inside Field with requirements">
        <Field name="new-password">
          <FieldLabel>Create password</FieldLabel>
          <PasswordInput
            value={newPassword()}
            onValueChange={(next) => setNewPassword(next)}
            autoComplete="new-password"
          >
            <PasswordInputControl placeholder="Choose a strong password" />
            <PasswordInputToggle aria-label="Show password" />
          </PasswordInput>
          <FieldDescription>
            Used to encrypt your local workspace credentials.
          </FieldDescription>
          <ul
            class="m-0 flex list-none flex-col gap-1 p-0 pt-1 text-[12px]"
            aria-label="Password requirements"
          >
            <For each={rules}>
              {(rule) => {
                const passed = () => rule.test(newPassword())
                return (
                  <li
                    class={
                      passed()
                        ? 'flex items-center gap-1.5 text-success'
                        : 'flex items-center gap-1.5 text-faint'
                    }
                  >
                    <CheckIcon
                      class={
                        passed()
                          ? 'size-3.5 shrink-0 opacity-100'
                          : 'size-3.5 shrink-0 opacity-35'
                      }
                    />
                    <span>{rule.label}</span>
                  </li>
                )
              }}
            </For>
          </ul>
        </Field>
      </Group>

      <Group label="Appearances">
        <For
          each={
            [
              { appearance: 'small', label: 'Small (24px)' },
              { appearance: 'base', label: 'Base (28px)' },
              { appearance: 'large', label: 'Large (32px)' },
            ] satisfies {
              appearance: PasswordInputAppearance
              label: string
            }[]
          }
        >
          {(item) => (
            <PasswordInput appearance={item.appearance}>
              <PasswordInputControl
                placeholder={item.label}
                aria-label={item.label}
              />
              <PasswordInputToggle aria-label={`Show ${item.label}`} />
            </PasswordInput>
          )}
        </For>
      </Group>

      <Group label="Surfaces">
        <For
          each={
            [
              { surface: 'base', label: 'Base' },
              { surface: 'layer-1', label: 'Layer 1' },
              { surface: 'invisible', label: 'Invisible' },
            ] satisfies { surface: PasswordInputSurface; label: string }[]
          }
        >
          {(item) => (
            <PasswordInput surface={item.surface}>
              <PasswordInputControl
                placeholder={item.label}
                aria-label={item.label}
              />
              <PasswordInputToggle aria-label={`Show ${item.label}`} />
            </PasswordInput>
          )}
        </For>
      </Group>

      <Group label="Invalid">
        <Field invalid name="current-password">
          <FieldLabel>Current password</FieldLabel>
          <PasswordInput invalid defaultValue="wrong-pass">
            <PasswordInputControl invalid />
            <PasswordInputToggle aria-label="Show current password" />
          </PasswordInput>
          <FieldError>Incorrect password. Check Caps Lock and try again.</FieldError>
        </Field>
      </Group>

      <Group label="Disabled & read-only">
        <div class="flex flex-wrap gap-3">
          <Field disabled class="w-auto">
            <FieldLabel>SSO managed</FieldLabel>
            <PasswordInput defaultValue="hunter22">
              <PasswordInputControl />
              <PasswordInputToggle aria-label="Show SSO password" />
            </PasswordInput>
          </Field>

          <Field class="w-auto">
            <FieldLabel>Recovery token</FieldLabel>
            <PasswordInput
              readOnly
              defaultValue="7Hq2-vX9p-Lm4c"
              autoComplete="off"
            >
              <PasswordInputControl />
              <PasswordInputToggle aria-label="Show recovery token" />
            </PasswordInput>
          </Field>
        </div>
      </Group>
    </div>
  )
}
