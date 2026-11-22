import { defineComponent, h, type PropType } from 'vue'

import './typography.css'

/**
 * Typography, opencode console's prose (the changelog's rendered markdown)
 * with shadcn's Typography names. The parts set a font; wrap them (or
 * rendered markdown, via `v-html`) in Typography for the console's flow
 * spacing. There is no behaviour, so the parts are plain markup styled by
 * `typography.css`.
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

export type TypographySize = 'default' | 'compact'

export const Typography = defineComponent({
  name: 'Typography',
  props: { size: { type: String as PropType<TypographySize>, default: 'default' } },
  setup(props, { slots, attrs }) {
    return () =>
      h('div', { ...attrs, 'data-slot': 'typography', 'data-size': props.size }, slots.default?.())
  },
  inheritAttrs: false,
})

export const TypographyH1 = part('TypographyH1', 'h1', 'typography-h1')
export const TypographyH2 = part('TypographyH2', 'h2', 'typography-h2')
export const TypographyH3 = part('TypographyH3', 'h3', 'typography-h3')
export const TypographyH4 = part('TypographyH4', 'h4', 'typography-h4')
export const TypographyP = part('TypographyP', 'p', 'typography-p')
export const TypographyBlockquote = part('TypographyBlockquote', 'blockquote', 'typography-blockquote')
export const TypographyList = part('TypographyList', 'ul', 'typography-list')
export const TypographyInlineCode = part('TypographyInlineCode', 'code', 'typography-inline-code')
export const TypographyLead = part('TypographyLead', 'p', 'typography-lead')
export const TypographyLarge = part('TypographyLarge', 'div', 'typography-large')
export const TypographySmall = part('TypographySmall', 'small', 'typography-small')
export const TypographyMuted = part('TypographyMuted', 'p', 'typography-muted')
