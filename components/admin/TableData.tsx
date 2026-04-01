import React, { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  stickyHeader?: boolean;
}

export default function TableData<T>({
  data,
  columns,
  stickyHeader = true,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-auto custom-scrollbar">
        <table className="w-full text-left rtl:text-right border-collapse min-w-[800px]">
          <thead className={stickyHeader ? "sticky top-0 z-10 bg-surface" : ""}>
            <tr className="bg-bg/80 backdrop-blur-md border-b border-border">
              {columns.map((column, index) => (
                <th
                  key={index}
                  colSpan={column.colSpan}
                  className={`px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                        ? "text-right rtl:text-left"
                        : ""
                  } ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-bg/40 transition-colors duration-150 group"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      colSpan={column.colSpan}
                      className={`px-6 py-4 text-sm font-medium transition-colors ${
                        column.align === "center"
                          ? "text-center"
                          : column.align === "right"
                            ? "text-right rtl:text-left"
                            : ""
                      } ${column.className || ""}`}
                    >
                      {typeof column.accessor === "function"
                        ? column.accessor(row)
                        : (row[column.accessor] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.reduce((acc, col) => acc + (col.colSpan || 1), 0)}
                  className="px-6 py-12 text-center text-text-muted italic"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
