import { For } from 'solid-js'

import { CloseIcon, SearchIcon } from '#/components/icons'
import {
  Input,
  InputClear,
  InputGroup,
  type InputAppearance,
  type InputSurface,
} from '#/components/ui/input'

import { Group } from '../demo-group'

export function InputDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <InputGroup>
          <Input placeholder="Placeholder" aria-label="Placeholder" />
        </InputGroup>
        <InputGroup>
          <Input defaultValue="With value" aria-label="With value" />
          <InputClear aria-label="Clear value">
            <CloseIcon />
          </InputClear>
        </InputGroup>
      </Group>

      <Group label="Leading icon">
        <InputGroup leadingIcon={<SearchIcon />}>
          <Input type="search" placeholder="Search" aria-label="Search" />
          <InputClear aria-label="Clear search">
            <CloseIcon />
          </InputClear>
        </InputGroup>
        <InputGroup leadingIcon={<SearchIcon />} surface="invisible">
          <Input placeholder="Invisible" aria-label="Filter" />
        </InputGroup>
      </Group>

      <Group label="Appearances">
        <For
          each={
            [
              { appearance: 'small', label: 'Small (24px)' },
              { appearance: 'base', label: 'Base (28px)' },
              { appearance: 'large', label: 'Large (32px)' },
            ] satisfies { appearance: InputAppearance; label: string }[]
          }
        >
          {(item) => (
            <InputGroup appearance={item.appearance}>
              <Input placeholder={item.label} aria-label={item.label} />
            </InputGroup>
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
            ] satisfies { surface: InputSurface; label: string }[]
          }
        >
          {(item) => (
            <InputGroup surface={item.surface}>
              <Input placeholder={item.label} aria-label={item.label} />
            </InputGroup>
          )}
        </For>
      </Group>

      <Group label="Numeric">
        <InputGroup numeric>
          <Input
            defaultValue="1280.50"
            inputmode="decimal"
            aria-label="Amount"
          />
        </InputGroup>
      </Group>

      <Group label="Invalid">
        <div class="flex flex-col gap-2">
          <InputGroup invalid>
            <Input
              defaultValue="not-an-email"
              type="email"
              aria-label="Email"
            />
            <InputClear aria-label="Clear email">
              <CloseIcon />
            </InputClear>
          </InputGroup>
          <p class="text-[12px] text-danger">
            Enter an email address like name@example.com.
          </p>
        </div>
      </Group>

      <Group label="Disabled">
        <InputGroup>
          <Input placeholder="Disabled" disabled aria-label="Disabled" />
        </InputGroup>
        <InputGroup>
          <Input
            defaultValue="Disabled with value"
            disabled
            aria-label="Disabled with value"
          />
          <InputClear aria-label="Clear disabled value">
            <CloseIcon />
          </InputClear>
        </InputGroup>
      </Group>

      <Group label="Read-only">
        <InputGroup>
          <Input
            defaultValue="name@example.com"
            readonly
            aria-label="Email, read only"
          />
          <InputClear aria-label="Clear read-only email">
            <CloseIcon />
          </InputClear>
        </InputGroup>
      </Group>
    </div>
  )
}
