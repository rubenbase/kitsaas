import { defineComponent, h } from 'vue'

import './aspect-ratio.css'

/**
 * AspectRatio, shadcn's AspectRatio on CSS `aspect-ratio` instead of Radix's
 * padding hack. `ratio` is width over height, like `16 / 9` (default 1).
 */

export const AspectRatio = defineComponent({
  name: 'AspectRatio',
  props: { ratio: { type: Number, default: 1 } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-slot': 'aspect-ratio',
          style: [attrs.style, { '--aspect-ratio': String(props.ratio) }],
        },
        slots.default?.(),
      )
  },
  inheritAttrs: false,
})
