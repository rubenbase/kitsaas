import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";

import "./table.css";

/**
 * Table, opencode console's data tables on native table elements, with
 * shadcn's part names:
 *
 *   <Table>
 *     <TableCaption>Usage this month</TableCaption>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Model</TableHead>
 *         <TableHead numeric>Requests</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>Model A</TableCell>
 *         <TableCell numeric>1,204</TableCell>
 *       </TableRow>
 *     </TableBody>
 *     <TableFooter>…</TableFooter>
 *   </Table>
 *
 * `variant="default"` is the console's members table: a framed header pill
 * and rows that highlight on hover. `variant="framed"` is the console's data
 * table: a raised body inside a muted frame that also holds the header.
 *
 * A plain table has no behaviour, so there is no ui-sdk primitive under it.
 * Compose behaviour on top: a sortable column is a `<button>` inside a
 * TableHead with `aria-sort`, which `table.css` styles with an arrow; row
 * selection is ui-sdk's CheckboxGroup with a parent Checkbox in the header
 * (see the demo), with `selected` on each TableRow for the highlight.
 */

export type TableVariant = "default" | "framed";

export type TableProps = JSX.HTMLAttributes<HTMLTableElement> & {
  /** Defaults to `default`, the console's members table. */
  variant?: TableVariant;
  /** Class for the scroll container around the table. */
  containerClass?: string;
};

/** A <table> inside a container that scrolls sideways when the table is wider. */
export function Table(props: TableProps) {
  const rest = omit(props, "variant", "containerClass");

  return (
    <div class={props.containerClass} data-slot="table-container">
      <table {...rest} data-slot="table" data-variant={props.variant ?? "default"} />
    </div>
  );
}

export type TableHeaderProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

/** A <thead>. */
export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} data-slot="table-header" />;
}

export type TableBodyProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

/** A <tbody>. */
export function TableBody(props: TableBodyProps) {
  return <tbody {...props} data-slot="table-body" />;
}

export type TableFooterProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

/** A <tfoot>, for totals. */
export function TableFooter(props: TableFooterProps) {
  return <tfoot {...props} data-slot="table-footer" />;
}

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement> & {
  /** Highlights the row, as shadcn's `data-state="selected"`. */
  selected?: boolean;
};

/** A <tr>. */
export function TableRow(props: TableRowProps) {
  const rest = omit(props, "selected");

  return (
    <tr {...rest} data-slot="table-row" data-state={props.selected ? "selected" : undefined} />
  );
}

export type TableHeadProps = JSX.ThHTMLAttributes<HTMLTableCellElement> & {
  /** Right-aligns the column heading for a column of numbers. */
  numeric?: boolean;
};

/**
 * A <th>. For a sortable column, set `aria-sort` and put a `<button>` inside;
 * the arrow follows `aria-sort`.
 */
export function TableHead(props: TableHeadProps) {
  const rest = omit(props, "numeric");

  return <th {...rest} data-slot="table-head" data-numeric={props.numeric ? "" : undefined} />;
}

export type TableCellProps = JSX.TdHTMLAttributes<HTMLTableCellElement> & {
  /** Right-aligned with tabular figures, so numbers line up. */
  numeric?: boolean;
};

/** A <td>. */
export function TableCell(props: TableCellProps) {
  const rest = omit(props, "numeric");

  return <td {...rest} data-slot="table-cell" data-numeric={props.numeric ? "" : undefined} />;
}

export type TableCaptionProps = JSX.HTMLAttributes<HTMLTableCaptionElement>;

/** A <caption>, shown under the table. */
export function TableCaption(props: TableCaptionProps) {
  return <caption {...props} data-slot="table-caption" />;
}
