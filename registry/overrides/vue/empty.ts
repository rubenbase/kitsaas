import { defineComponent, h, type PropType } from 'vue'

import './empty.css'

/**
 * Empty, opencode console's empty list state with shadcn's part names. There
 * is no behaviour, so the parts are plain markup styled by `empty.css`. Pass
 * `role="status"` to Empty when it replaces a list after a user action.
 */

function part(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.())
    },
    inheritAttrs: false,
  })
}

export const Empty = part('Empty', 'div', 'empty')
export const EmptyHeader = part('EmptyHeader', 'div', 'empty-header')
export const EmptyTitle = part('EmptyTitle', 'p', 'empty-title')
export const EmptyDescription = part('EmptyDescription', 'p', 'empty-description')
export const EmptyContent = part('EmptyContent', 'div', 'empty-content')

export type EmptyMediaVariant = 'default' | 'icon'

export const EmptyMedia = defineComponent({
  name: 'EmptyMedia',
  props: { variant: { type: String as PropType<EmptyMediaVariant>, default: 'default' } },
  setup(props, { slots, attrs }) {
    return () =>
      h('div', { ...attrs, 'data-slot': 'empty-media', 'data-variant': props.variant }, slots.default?.())
  },
  inheritAttrs: false,
})
