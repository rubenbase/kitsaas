import { createSignal, For, Show } from 'solid-js'

import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/ui/field'
import {
  OTPInput,
  OTPInputGroup,
  OTPInputSeparator,
  OTPInputSlot,
} from '#/components/ui/otp-input'

import { Group } from '../demo-group'

export function OtpInputDemo() {
  const [verified, setVerified] = createSignal<string | null>(null)
  const [invalid, setInvalid] = createSignal(true)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Verification code (3 + 3)">
        <div class="flex flex-col gap-2">
          <Field>
            <FieldLabel>Two-factor code</FieldLabel>
            <OTPInput
              maxLength={6}
              onValueCommit={(code) => setVerified(code)}
              onValueChange={(code) => {
                if (code.length < 6) setVerified(null)
              }}
            >
              <OTPInputGroup>
                <OTPInputSlot index={0} />
                <OTPInputSlot index={1} />
                <OTPInputSlot index={2} />
              </OTPInputGroup>
              <OTPInputSeparator />
              <OTPInputGroup>
                <OTPInputSlot index={3} />
                <OTPInputSlot index={4} />
                <OTPInputSlot index={5} />
              </OTPInputGroup>
            </OTPInput>
            <FieldDescription>
              Type 6 digits or paste a code like 482-913.
            </FieldDescription>
          </Field>
          <Show when={verified()}>
            {(code) => (
              <p class="m-0 text-[12px] text-success">
                Code complete: <span class="font-mono">{code()}</span>
              </p>
            )}
          </Show>
        </div>
      </Group>

      <Group label="4-digit PIN">
        <Field>
          <FieldLabel>Security PIN</FieldLabel>
          <OTPInput maxLength={4} defaultValue="20" textAlign="center">
            <OTPInputGroup>
              <For each={[0, 1, 2, 3]}>
                {(index) => <OTPInputSlot index={index} />}
              </For>
            </OTPInputGroup>
          </OTPInput>
          <FieldDescription>Single 4-slot group without separator.</FieldDescription>
        </Field>
      </Group>

      <Group label="Alphanumeric recovery code">
        <Field>
          <FieldLabel>Recovery key</FieldLabel>
          <OTPInput
            maxLength={8}
            pattern="alphanumeric"
            defaultValue="K7M2"
            inputMode="text"
          >
            <OTPInputGroup>
              <For each={[0, 1, 2, 3]}>
                {(index) => (
                  <OTPInputSlot index={index} class="uppercase" />
                )}
              </For>
            </OTPInputGroup>
            <OTPInputSeparator />
            <OTPInputGroup>
              <For each={[4, 5, 6, 7]}>
                {(index) => (
                  <OTPInputSlot index={index} class="uppercase" />
                )}
              </For>
            </OTPInputGroup>
          </OTPInput>
          <FieldDescription>
            Accepts letters and numbers; paste ab12-cd34 to fill all slots.
          </FieldDescription>
        </Field>
      </Group>

      <Group label="Invalid">
        <Field invalid={invalid()}>
          <FieldLabel>Expired code</FieldLabel>
          <OTPInput
            maxLength={6}
            defaultValue="482913"
            invalid={invalid()}
            onValueChange={() => setInvalid(false)}
          >
            <OTPInputGroup>
              <OTPInputSlot index={0} />
              <OTPInputSlot index={1} />
              <OTPInputSlot index={2} />
            </OTPInputGroup>
            <OTPInputSeparator />
            <OTPInputGroup>
              <OTPInputSlot index={3} />
              <OTPInputSlot index={4} />
              <OTPInputSlot index={5} />
            </OTPInputGroup>
          </OTPInput>
          <FieldError>
            That code has expired. Edit any digit to clear the error.
          </FieldError>
        </Field>
      </Group>

      <Group label="Disabled">
        <Field disabled>
          <FieldLabel>Locked verification</FieldLabel>
          <OTPInput maxLength={6} defaultValue="123456" disabled>
            <OTPInputGroup>
              <OTPInputSlot index={0} />
              <OTPInputSlot index={1} />
              <OTPInputSlot index={2} />
            </OTPInputGroup>
            <OTPInputSeparator />
            <OTPInputGroup>
              <OTPInputSlot index={3} />
              <OTPInputSlot index={4} />
              <OTPInputSlot index={5} />
            </OTPInputGroup>
          </OTPInput>
        </Field>
      </Group>

      <Group label="Read-only">
        <Field>
          <FieldLabel>Device pairing code</FieldLabel>
          <OTPInput maxLength={6} defaultValue="904218" readOnly>
            <OTPInputGroup>
              <OTPInputSlot index={0} />
              <OTPInputSlot index={1} />
              <OTPInputSlot index={2} />
            </OTPInputGroup>
            <OTPInputSeparator />
            <OTPInputGroup>
              <OTPInputSlot index={3} />
              <OTPInputSlot index={4} />
              <OTPInputSlot index={5} />
            </OTPInputGroup>
          </OTPInput>
          <FieldDescription>Focusable and copyable, but not editable.</FieldDescription>
        </Field>
      </Group>
    </div>
  )
}
