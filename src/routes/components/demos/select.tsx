import { For } from 'solid-js'

import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectAppearance,
  type SelectSurface,
} from '#/components/ui/select'
import { useDocLog } from '#/docs'

import { Group } from '../demo-group'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

const fontGroups = [
  {
    label: 'Sans serif',
    items: [
      { value: 'inter', label: 'Inter' },
      { value: 'geist', label: 'Geist' },
    ],
  },
  {
    label: 'Serif',
    items: [
      { value: 'source-serif', label: 'Source Serif' },
      { value: 'lora', label: 'Lora' },
    ],
  },
  {
    label: 'Monospace',
    items: [
      { value: 'geist-mono', label: 'Geist Mono' },
      { value: 'jetbrains-mono', label: 'JetBrains Mono' },
    ],
  },
]

const fonts = fontGroups.flatMap((group) => group.items)

const countries = [
  { value: 'canada', label: 'Canada' },
  { value: 'denmark', label: 'Denmark', disabled: true },
  { value: 'france', label: 'France' },
  { value: 'japan', label: 'Japan' },
]

const amounts = [
  { value: '1280.50', label: '1,280.50' },
  { value: '42.00', label: '42.00' },
  { value: '999.99', label: '999.99' },
]

function MultipleSelectExample() {
  const log = useDocLog()

  return (
    <div class="w-[280px] max-w-full self-start">
      <Field name="fruits-multiple">
        <FieldLabel>Fruits</FieldLabel>
        <Select
          items={fruits}
          multiple
          defaultValue={['apple', 'cherry']}
          placeholder="Pick fruits"
          onValueChange={(value: unknown, details: { reason: string }) =>
            log(`value: ${JSON.stringify(value)} (${details.reason})`)
          }
        >
          <SelectTrigger appearance="base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <For each={fruits}>
              {(fruit) => (
                <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
              )}
            </For>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

export function SelectDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Trigger states">
        <div class="w-[280px] max-w-full self-start">
          <Field name="fruit">
            <FieldLabel>Fruit</FieldLabel>
            <Select items={fruits} placeholder="Pick a fruit">
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div class="w-[280px] max-w-full self-start">
          <Field name="fruit-selected">
            <FieldLabel>Fruit, selected</FieldLabel>
            <Select items={fruits} defaultValue="banana">
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div class="w-[280px] max-w-full self-start">
          <Field name="fruit-invalid" invalid>
            <FieldLabel>Invalid</FieldLabel>
            <Select items={fruits} placeholder="Pick a fruit">
              <SelectTrigger appearance="base" invalid>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
            <FieldError>Pick a fruit to continue.</FieldError>
          </Field>
        </div>

        <div class="w-[280px] max-w-full self-start">
          <Field name="fruit-disabled">
            <FieldLabel>Disabled</FieldLabel>
            <Select items={fruits} defaultValue="cherry" disabled>
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Group>

      <Group label="Open content">
        <div class="w-[280px] max-w-full self-start">
          <Field name="fruit-open">
            <FieldLabel>Fruit, open</FieldLabel>
            <Select items={fruits} defaultValue="cherry" defaultOpen>
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Group>

      <Group label="Groups with labels">
        <div class="w-[280px] max-w-full self-start">
          <Field name="font">
            <FieldLabel>Font</FieldLabel>
            <Select items={fonts} placeholder="Select a font">
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fontGroups}>
                  {(group, index) => (
                    <>
                      {index() > 0 ? <SelectSeparator /> : null}
                      <SelectGroup>
                        <SelectGroupLabel>{group.label}</SelectGroupLabel>
                        <For each={group.items}>
                          {(item) => (
                            <SelectItem value={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </For>
                      </SelectGroup>
                    </>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Group>

      <Group label="Disabled item">
        <div class="w-[280px] max-w-full self-start">
          <Field name="country">
            <FieldLabel>Country</FieldLabel>
            <Select items={countries} defaultValue="france">
              <SelectTrigger appearance="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={countries}>
                  {(country) => (
                    <SelectItem
                      value={country.value}
                      disabled={country.disabled}
                    >
                      {country.label}
                    </SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Group>

      <Group label="Appearances">
        <For
          each={
            [
              { appearance: 'inline', label: 'Inline (default)' },
              { appearance: 'small', label: 'Small (24px)' },
              { appearance: 'base', label: 'Base (28px)' },
              { appearance: 'large', label: 'Large (32px)' },
            ] satisfies {
              appearance: SelectAppearance
              label: string
            }[]
          }
        >
          {(item) => (
            <Select items={fruits} defaultValue="date">
              <SelectTrigger
                appearance={item.appearance}
                aria-label={item.label}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
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
            ] satisfies { surface: SelectSurface; label: string }[]
          }
        >
          {(item) => (
            <Select items={fruits} placeholder={item.label}>
              <SelectTrigger
                appearance="base"
                surface={item.surface}
                aria-label={item.label}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <For each={fruits}>
                  {(fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
          )}
        </For>
      </Group>

      <Group label="Numeric">
        <Select items={amounts} defaultValue="1280.50">
          <SelectTrigger appearance="base" numeric aria-label="Amount">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <For each={amounts}>
              {(amount) => (
                <SelectItem value={amount.value}>{amount.label}</SelectItem>
              )}
            </For>
          </SelectContent>
        </Select>
      </Group>

      <Group
        label="Multiple"
        console
        caption="Toggle options while the list stays open; the live Console logs each value change and reason."
      >
        <MultipleSelectExample />
      </Group>
    </div>
  )
}
