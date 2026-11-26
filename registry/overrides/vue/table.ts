import { defineComponent, h, type PropType } from 'vue'

import './table.css'

/**
 * Table, opencode console's data tables on native table elements, with
 * shadcn's part names. There is no behaviour, so the parts are plain markup
 * styled by `table.css`. `variant="framed"` is the console's raised data
 * table; `numeric` right-aligns a column with tabular figures. For a sortable
 * column, set `aria-sort` on TableHead and put a <button> inside.
 */

export type TableVariant = 'default' | 'framed'

function part(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.())
    },
    inheritAttrs: false,
  })
}

function cell(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    props: { numeric: { type: Boolean, default: false } },
    setup(props, { slots, attrs }) {
      return () =>
        h(
          tag,
          { ...attrs, 'data-slot': slot, 'data-numeric': props.numeric ? '' : undefined },
          slots.default?.(),
        )
    },
    inheritAttrs: false,
  })
}

/** Attributes go to the <table>; `containerClass` to the scroll container around it. */
export const Table = defineComponent({
  name: 'Table',
  props: {
    variant: { type: String as PropType<TableVariant>, default: 'default' },
    containerClass: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h('div', { class: props.containerClass, 'data-slot': 'table-container' }, [
        h('table', { ...attrs, 'data-slot': 'table', 'data-variant': props.variant }, slots.default?.()),
      ])
  },
  inheritAttrs: false,
})

export const TableHeader = part('TableHeader', 'thead', 'table-header')
export const TableBody = part('TableBody', 'tbody', 'table-body')
export const TableFooter = part('TableFooter', 'tfoot', 'table-footer')
export const TableCaption = part('TableCaption', 'caption', 'table-caption')
export const TableHead = cell('TableHead', 'th', 'table-head')
export const TableCell = cell('TableCell', 'td', 'table-cell')

export const TableRow = defineComponent({
  name: 'TableRow',
  props: { selected: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'tr',
        { ...attrs, 'data-slot': 'table-row', 'data-state': props.selected ? 'selected' : undefined },
        slots.default?.(),
      )
  },
  inheritAttrs: false,
})
