import { Textarea } from '#/components/ui/textarea'

import { Group } from '../demo-group'

export function TextareaDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <Textarea placeholder="Placeholder" aria-label="Placeholder" />
        <Textarea defaultValue="With value" aria-label="With value" />
      </Group>

      <Group label="Invalid">
        <div class="flex flex-col gap-2">
          <Textarea defaultValue="Great." invalid aria-label="Invalid value" />
          <p class="text-[12px] text-danger">Write at least 20 characters.</p>
        </div>
      </Group>

      <Group label="Disabled">
        <Textarea placeholder="Disabled" disabled aria-label="Disabled" />
        <Textarea
          defaultValue="Disabled with value"
          disabled
          aria-label="Disabled with value"
        />
      </Group>

      <Group label="Auto resizing">
        <Textarea
          autoResize
          class="max-h-40"
          aria-label="Notes"
          defaultValue={'Line one\nLine two\nLine three\nLine four'}
        />
      </Group>
    </div>
  )
}
