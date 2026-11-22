import { defineComponent, h, type PropType } from 'vue'

import './alert.css'

/**
 * Alert, Kitsaas's take on shadcn's Alert: a static, inline callout. ui-sdk
 * has no alert and the only behaviour is its ARIA role, so these are plain
 * elements styled by `alert.css` through `data-slot` / `data-variant`.
 *
 * `role` defaults to `alert`; pass `role="status"` or `role="note"` for a
 * callout that is on the page from the first paint and is not urgent.
 */

export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export const Alert = defineComponent({
  name: 'Alert',
  props: {
    variant: { type: String as PropType<AlertVariant>, default: 'neutral' },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        { role: 'alert', ...attrs, 'data-slot': 'alert', 'data-variant': props.variant },
        slots.default?.(),
      )
  },
  inheritAttrs: false,
})

function slotDiv(name: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h('div', { ...attrs, 'data-slot': slot }, slots.default?.())
    },
    inheritAttrs: false,
  })
}

export const AlertTitle = slotDiv('AlertTitle', 'alert-title')
export const AlertDescription = slotDiv('AlertDescription', 'alert-description')
export const AlertAction = slotDiv('AlertAction', 'alert-action')
