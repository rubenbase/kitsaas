import "./table.css";

/**
 * Table, opencode console's data tables on native table elements, with
 * shadcn's part names. There is no behaviour, so there is no component to
 * register: mark plain elements with `data-slot`; `table.css` does the rest.
 * `tableAttrs({ variant: "framed" })` is the console's raised data table;
 * `data-numeric` right-aligns a column with tabular figures; for a sortable
 * column, set `aria-sort` on the <th> and put a <button> inside.
 *
 *   <div data-slot="table-container">
 *     <table {...tableAttrs()}>
 *       <caption data-slot="table-caption">Spend this month</caption>
 *       <thead data-slot="table-header">
 *         <tr data-slot="table-row">
 *           <th data-slot="table-head" scope="col">Member</th>
 *           <th data-slot="table-head" scope="col" data-numeric>Spent</th>
 *         </tr>
 *       </thead>
 *       <tbody data-slot="table-body">
 *         <tr {...tableRowAttrs({ selected: true })}>
 *           <td data-slot="table-cell">Ada</td>
 *           <td data-slot="table-cell" data-numeric>$7.90</td>
 *         </tr>
 *       </tbody>
 *       <tfoot data-slot="table-footer">…</tfoot>
 *     </table>
 *   </div>
 */

export type TableVariant = "default" | "framed";

export function tableAttrs(options: { variant?: TableVariant } = {}) {
  return {
    "data-slot": "table",
    "data-variant": options.variant ?? "default",
  } as const;
}

export function tableRowAttrs(options: { selected?: boolean } = {}) {
  return {
    "data-slot": "table-row",
    ...(options.selected ? { "data-state": "selected" } : {}),
  } as const;
}

/** Applies `tableAttrs()` to an existing <table> (for web components / vanilla DOM). */
export function applyTable(el: HTMLTableElement, options: { variant?: TableVariant } = {}) {
  for (const [key, value] of Object.entries(tableAttrs(options))) el.setAttribute(key, value);
  return el;
}

/** Applies `tableRowAttrs()` to an existing <tr>, clearing a stale selection. */
export function applyTableRow(el: HTMLTableRowElement, options: { selected?: boolean } = {}) {
  el.removeAttribute("data-state");
  for (const [key, value] of Object.entries(tableRowAttrs(options))) el.setAttribute(key, value);
  return el;
}
