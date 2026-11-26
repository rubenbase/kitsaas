import type { ComponentProps } from "react";

import "./table.css";

/**
 * Table, opencode console's data tables on native table elements, with
 * shadcn's part names. There is no behaviour, so the parts are plain markup
 * styled by `table.css`. `variant="framed"` is the console's raised data
 * table; `numeric` right-aligns a column with tabular figures. For a sortable
 * column, set `aria-sort` on TableHead and put a <button> inside.
 */

export type TableVariant = "default" | "framed";

export function Table({
  variant = "default",
  containerClassName,
  ...props
}: ComponentProps<"table"> & { variant?: TableVariant; containerClassName?: string }) {
  return (
    <div className={containerClassName} data-slot="table-container">
      <table {...props} data-slot="table" data-variant={variant} />
    </div>
  );
}

export function TableHeader(props: ComponentProps<"thead">) {
  return <thead {...props} data-slot="table-header" />;
}

export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody {...props} data-slot="table-body" />;
}

export function TableFooter(props: ComponentProps<"tfoot">) {
  return <tfoot {...props} data-slot="table-footer" />;
}

export function TableRow({ selected, ...props }: ComponentProps<"tr"> & { selected?: boolean }) {
  return <tr {...props} data-slot="table-row" data-state={selected ? "selected" : undefined} />;
}

export function TableHead({ numeric, ...props }: ComponentProps<"th"> & { numeric?: boolean }) {
  return <th {...props} data-slot="table-head" data-numeric={numeric ? "" : undefined} />;
}

export function TableCell({ numeric, ...props }: ComponentProps<"td"> & { numeric?: boolean }) {
  return <td {...props} data-slot="table-cell" data-numeric={numeric ? "" : undefined} />;
}

export function TableCaption(props: ComponentProps<"caption">) {
  return <caption {...props} data-slot="table-caption" />;
}
