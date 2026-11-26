import { defineComponent, h, type PropType } from 'vue'

import './card.css'

/**
 * Card, opencode console's dashboard card with shadcn's part names. There is
 * no behaviour, so the parts are plain markup styled by `card.css`. A link
 * inside CardTitle makes the whole card clickable.
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

export const Card = part('Card', 'section', 'card')
export const CardHeader = part('CardHeader', 'div', 'card-header')
export const CardTitle = part('CardTitle', 'h2', 'card-title')
export const CardDescription = part('CardDescription', 'p', 'card-description')
export const CardAction = part('CardAction', 'div', 'card-action')
export const CardContent = part('CardContent', 'div', 'card-content')
export const CardFooter = part('CardFooter', 'div', 'card-footer')
export const CardFacts = part('CardFacts', 'dl', 'card-facts')

export type CardInsetVariant = 'neutral' | 'warning' | 'danger'

export const CardInset = defineComponent({
  name: 'CardInset',
  props: { variant: { type: String as PropType<CardInsetVariant>, default: 'neutral' } },
  setup(props, { slots, attrs }) {
    return () =>
      h('div', { ...attrs, 'data-slot': 'card-inset', 'data-variant': props.variant }, slots.default?.())
  },
  inheritAttrs: false,
})

/** One row of CardFacts: the `label` slot (or prop) on the left, the default slot on the right. */
export const CardFact = defineComponent({
  name: 'CardFact',
  props: { label: { type: String, default: '' } },
  setup(props, { slots, attrs }) {
    return () =>
      h('div', attrs, [h('dt', slots.label?.() ?? props.label), h('dd', slots.default?.())])
  },
  inheritAttrs: false,
})
