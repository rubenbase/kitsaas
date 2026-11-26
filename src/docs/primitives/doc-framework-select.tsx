import { For, Match, Switch } from 'solid-js'

import {
  ReactFrameworkIcon,
  SolidFrameworkIcon,
  SvelteFrameworkIcon,
  VueFrameworkIcon,
  WebFrameworkIcon,
} from '#/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

import { TARGET_FRAMEWORKS, type TargetFramework } from '../preferences'
import '../docs.css'

const FRAMEWORK_SELECT_ITEMS = TARGET_FRAMEWORKS.map((fw) => ({
  value: fw.id,
  label: fw.label,
}))

export function DocFrameworkIcon(props: {
  framework: TargetFramework
  class?: string
}) {
  const cls = () =>
    ['doc-fw-icon size-3.5 shrink-0', props.class].filter(Boolean).join(' ')

  return (
    <Switch>
      <Match when={props.framework === 'solid'}>
        <SolidFrameworkIcon data-fw="solid" class={cls()} />
      </Match>
      <Match when={props.framework === 'react'}>
        <ReactFrameworkIcon data-fw="react" class={cls()} />
      </Match>
      <Match when={props.framework === 'vue'}>
        <VueFrameworkIcon data-fw="vue" class={cls()} />
      </Match>
      <Match when={props.framework === 'svelte'}>
        <SvelteFrameworkIcon data-fw="svelte" class={cls()} />
      </Match>
      <Match when={props.framework === 'web'}>
        <WebFrameworkIcon data-fw="web" class={cls()} />
      </Match>
    </Switch>
  )
}

export function DocFrameworkSelect(props: {
  value: TargetFramework
  onChange: (next: TargetFramework) => void
}) {
  return (
    <Select
      items={FRAMEWORK_SELECT_ITEMS}
      value={props.value}
      onValueChange={(next: unknown) => {
        if (typeof next === 'string') {
          props.onChange(next as TargetFramework)
        }
      }}
    >
      <SelectTrigger
        appearance="inline"
        aria-label="Target framework"
        class="doc-fw-select-trigger"
      >
        <DocFrameworkIcon framework={props.value} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" sideOffset={6} class="min-w-[144px]">
        <For each={TARGET_FRAMEWORKS}>
          {(fw) => (
            <SelectItem value={fw.id}>
              <DocFrameworkIcon framework={fw.id} />
              <span>{fw.label}</span>
            </SelectItem>
          )}
        </For>
      </SelectContent>
    </Select>
  )
}
