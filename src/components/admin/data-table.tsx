import * as React from "react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
  }[];
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200/80 bg-white p-12 text-center text-xs text-stone-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200/80 bg-white shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50/70 text-[11px] uppercase tracking-wider text-stone-400 font-medium border-b border-stone-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={cn("py-3.5 px-6", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.map((item, rowIdx) => (
              <tr
                key={item.id ?? rowIdx}
                className="hover:bg-stone-50/50 transition"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn("py-4 px-6 text-xs", col.className)}
                  >
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? "")
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

