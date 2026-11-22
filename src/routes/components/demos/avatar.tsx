import { For } from 'solid-js'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'

import { Group } from '../demo-group'

export function AvatarDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Sizes">
        <For
          each={
            [
              { size: 'small', label: 'Small · 16px' },
              { size: 'normal', label: 'Normal · 20px' },
              { size: 'large', label: 'Large · 28px' },
            ] as const
          }
        >
          {(item) => (
            <div class="flex items-center gap-2">
              <Avatar size={item.size}>
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <span class="text-[12px] text-muted">{item.label}</span>
            </div>
          )}
        </For>
      </Group>

      <Group label="Image and fallback">
        <div class="flex items-center gap-2">
          <Avatar hasImage>
            <AvatarImage
              src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'><defs><linearGradient id='a' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%233b82f6'/><stop offset='1' stop-color='%239333ea'/></linearGradient></defs><rect width='28' height='28' fill='url(%23a)'/><circle cx='14' cy='11' r='4' fill='%23fff' fill-opacity='0.9'/><path d='M4.5 28a9.5 9.5 0 0 1 19 0z' fill='%23fff' fill-opacity='0.9'/></svg>"
              alt="Rene Cost"
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span class="text-[12px] text-muted">Loaded image</span>
        </div>
        <div class="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span class="text-[12px] text-muted">Initials</span>
        </div>
        <div class="flex items-center gap-2">
          <Avatar hasImage>
            <AvatarImage src="data:image/png;base64,AA==" alt="Rene Cost" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span class="text-[12px] text-muted">Failed image</span>
        </div>
      </Group>

      <Group label="Kinds">
        <For each={['user', 'org'] as const}>
          {(kind) => (
            <div class="flex items-center gap-2">
              <Avatar kind={kind} size="small">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar kind={kind} size="normal">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar kind={kind} size="large">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span class="text-[12px] text-muted">
                {kind === 'org'
                  ? 'Org · 6px, 4px at small and normal'
                  : 'User · circle'}
              </span>
            </div>
          )}
        </For>
      </Group>
    </div>
  )
}
