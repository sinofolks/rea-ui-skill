"use client";

import "./DataTable.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type PointerEvent,
  memo,
  useLayoutEffect,
  type RefObject,
} from "react";
type DataTableTone = "blue" | "violet" | "pink" | "green" | "amber" | "gray";
interface DataTableRow {
  id: string | number;
  logo?: ReactNode;
  [column: string]: ReactNode;
}
interface DataTableColumn<
  Row extends {
    id: string | number;
  } = DataTableRow,
> {
  key: Extract<keyof Row, string>;
  label: string;
  type?: "title" | "text" | "tag" | "link" | "number";
  icon?: ReactNode;
  width?: number | string;
  options?: string[];
  /** Prevent editing this column while keeping selection and sorting available. */
  editable?: boolean;
  format?: (value: number) => string | number;
}
interface DataTableProps<
  Row extends {
    id: string | number;
  } = DataTableRow,
> {
  title?: ReactNode;
  icon?: ReactNode;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  tagTones?: Record<string, DataTableTone>;
  editable?: boolean;
  onRowsChange?: (rows: Row[]) => void;
  onSelectionChange?: (ids: Row["id"][]) => void;
  className?: string;
}
interface CellPosition {
  row: number;
  column: number;
}
interface CellRange {
  firstRow: number;
  lastRow: number;
  firstColumn: number;
  lastColumn: number;
}
interface SortOrder {
  key: string;
  direction: "asc" | "desc";
}
interface CellEdit {
  cell: CellPosition;
  value: string;
}
type RowIdentity = {
  id: string | number;
};
interface TableHandlers<Row extends RowIdentity> {
  down(
    event: PointerEvent<HTMLTableCellElement>,
    row: number,
    column: number,
    editing: boolean,
  ): void;
  enter(row: number, column: number): void;
  edit(row: number, column: number): void;
  toggle(id: Row["id"]): void;
  change(value: string): void;
  done(
    row: number,
    column: number,
    save: boolean,
    move?: "down" | "right",
    value?: string,
  ): void;
  options(column: DataTableColumn<Row>): string[];
}
type TableSkin = "default" | "clean";
type TableIconName = "add" | "delete" | "undo" | "redo" | "sort" | "text" | "tag";
interface ViewProps<Row extends RowIdentity> extends DataTableProps<Row> {
  skin: TableSkin;
}
interface TableRowProps<Row extends RowIdentity> {
  skin: TableSkin;
  prefix: string;
  row: Row;
  rowIndex: number;
  columns: DataTableColumn<Row>[];
  tones: Record<string, DataTableTone>;
  editable: boolean;
  checked: boolean;
  activeColumn: number;
  firstColumn: number;
  lastColumn: number;
  editColumn: number;
  editValue: string;
  handlers: RefObject<TableHandlers<Row> | null>;
}
type FinishEdit = (save: boolean, move?: "down" | "right", value?: string) => void;
interface CellEditorProps<Row extends RowIdentity> {
  skin: TableSkin;
  prefix: string;
  column: DataTableColumn<Row>;
  value: string;
  options?: string[];
  tones: Record<string, DataTableTone>;
  onChange(value: string): void;
  onDone: FinishEdit;
}
function DataTable<
  Row extends {
    id: string | number;
  } = DataTableRow,
>(props: DataTableProps<Row>): ReactElement {
  return <TableView {...props} skin="default" />;
}
function TextColumnIcon(): ReactElement {
  return <TableIcon name="text" skin="default" />;
}
function TagColumnIcon(): ReactElement {
  return <TableIcon name="tag" skin="default" />;
}
function cellText(value: unknown): string {
  if (typeof value === "string") return value;
  return typeof value === "number" && Number.isFinite(value) ? String(value) : "";
}
function displayNumber(value: number): string {
  return (Math.abs(value) >= 1000 ? integerFormatter : decimalFormatter)
    .format(value)
    .replace(/^-/, "−");
}
function preciseNumber(value: number): string {
  return preciseFormatter.format(value).replace(/^-/, "−");
}
function columnLetter(index: number): string {
  return String.fromCharCode(65 + (index % 26));
}
function usesMacShortcuts(): boolean {
  return typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
}
function parseCellText(
  text: string,
  column: {
    type?: string;
  },
): string | number {
  const trimmed = text.trim();
  if (column.type !== "number" || trimmed === "") return trimmed;
  const numeric = Number(
    trimmed
      .replace(/\u2212/g, "-")
      .replace(/[^\d.,-]/g, "")
      .replace(/,/g, ""),
  );
  return Number.isFinite(numeric) ? numeric : trimmed;
}
function selectedRange(
  active: CellPosition | null,
  anchor: CellPosition | null,
): CellRange | null {
  if (!active) return null;
  const start = anchor ?? active;
  return {
    firstRow: Math.min(start.row, active.row),
    lastRow: Math.max(start.row, active.row),
    firstColumn: Math.min(start.column, active.column),
    lastColumn: Math.max(start.column, active.column),
  };
}
function fillRange(range: CellRange, value: string): string[][] {
  return Array.from({ length: range.lastRow - range.firstRow + 1 }, () =>
    Array.from({ length: range.lastColumn - range.firstColumn + 1 }, () => value),
  );
}
function selectionSummary<Row extends RowIdentity>(
  rows: Row[],
  columns: DataTableColumn<Row>[],
  range: CellRange | null,
  active: CellPosition | null,
): string | null {
  if (!range || !active) return null;
  if (range.firstRow === range.lastRow && range.firstColumn === range.lastColumn)
    return `${columnLetter(active.column)}${active.row + 1}`;
  let valueCount = 0;
  let numericSum = 0;
  let hasNumbers = false;
  for (let rowIndex = range.firstRow; rowIndex <= range.lastRow; rowIndex++) {
    for (
      let columnIndex = range.firstColumn;
      columnIndex <= range.lastColumn;
      columnIndex++
    ) {
      const column = columns[columnIndex];
      const value = rows[rowIndex]?.[column.key];
      if (cellText(value) !== "") valueCount++;
      if (column.type === "number" && typeof value === "number") {
        hasNumbers = true;
        numericSum += value;
      }
    }
  }
  return `${valueCount.toLocaleString("en-US")} ${valueCount === 1 ? "value" : "values"}${hasNumbers ? ` · Sum ${displayNumber(numericSum)}` : ""}`;
}
/** Local editing state mirrors a spreadsheet: selection is positional, edits target row IDs. */
function useDataTable<Row extends RowIdentity>({
  rows,
  columns,
  editable = true,
  onRowsChange,
  onSelectionChange,
}: DataTableProps<Row>) {
  const [tableRows, setTableRows] = useState(rows);
  const history = useRef<{
    past: Row[][];
    future: Row[][];
  }>({
    past: [],
    future: [],
  });
  const [selectedIds, setSelectedIds] = useState<Set<Row["id"]>>(() => new Set());
  const [sort, setSort] = useState<SortOrder | null>(null);
  const [activeCell, setActiveCellState] = useState<CellPosition | null>(null);
  const [anchorCell, setAnchorCellState] = useState<CellPosition | null>(null);
  // Pointer events can arrive before React commits; keep the newest selection in a ref.
  const selection = useRef<{
    active: CellPosition | null;
    anchor: CellPosition | null;
  }>({ active: null, anchor: null });
  const [editing, setEditing] = useState<CellEdit | null>(null);
  const [dragging, setDragging] = useState(false);
  const [, refreshToolbar] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const newRowCount = useRef(0);
  const sortedRows = useMemo(() => {
    if (!sort) return tableRows;
    const column = columns.find((column) => column.key === sort.key);
    if (!column) return tableRows;
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...tableRows].sort((leftRow, rightRow) => {
      const left = leftRow[column.key];
      const right = rightRow[column.key];
      if (cellText(left) === "") return 1;
      if (cellText(right) === "") return -1;
      return column.type === "number"
        ? (Number(left) - Number(right)) * direction
        : cellText(left).localeCompare(cellText(right), undefined, {
            numeric: true,
          }) * direction;
    });
  }, [tableRows, sort, columns]);
  const range = useMemo(
    () => selectedRange(activeCell, anchorCell),
    [activeCell, anchorCell],
  );
  function setActiveCell(cell: CellPosition | null) {
    selection.current.active = cell;
    setActiveCellState(cell);
  }
  function setAnchorCell(cell: CellPosition | null) {
    selection.current.anchor = cell;
    setAnchorCellState(cell);
  }
  function canEdit(column: number) {
    return editable && columns[column]?.editable !== false;
  }
  function commitRows(nextRows: Row[]) {
    history.current.past.push(tableRows);
    if (history.current.past.length > 100) history.current.past.shift();
    history.current.future = [];
    setTableRows(nextRows);
    onRowsChange?.(nextRows);
  }
  function undo() {
    const previous = history.current.past.pop();
    if (!previous) return;
    history.current.future.push(tableRows);
    setTableRows(previous);
    onRowsChange?.(previous);
  }
  function redo() {
    const next = history.current.future.pop();
    if (!next) return;
    history.current.past.push(tableRows);
    setTableRows(next);
    onRowsChange?.(next);
  }
  function applyValues(start: CellPosition, values: string[][]) {
    const changes = new Map<Row["id"], Record<string, string | number>>();
    values.forEach((cells, rowOffset) =>
      cells.forEach((text, columnOffset) => {
        const row = sortedRows[start.row + rowOffset];
        const columnIndex = start.column + columnOffset;
        const column = columns[columnIndex];
        if (row && column && canEdit(columnIndex))
          changes.set(row.id, {
            ...changes.get(row.id),
            [column.key]: parseCellText(text, column),
          });
      }),
    );
    if (changes.size)
      commitRows(
        tableRows.map((row) =>
          changes.has(row.id) ? { ...row, ...changes.get(row.id) } : row,
        ),
      );
  }
  function focusCell(cell: CellPosition, extend = false) {
    const target = {
      row: Math.max(0, Math.min(sortedRows.length - 1, cell.row)),
      column: Math.max(0, Math.min(columns.length - 1, cell.column)),
    };
    if (extend) {
      if (!selection.current.anchor) setAnchorCell(selection.current.active ?? target);
    } else setAnchorCell(null);
    setActiveCell(target);
  }
  function startEditing(cell: CellPosition, initialValue?: string) {
    const row = sortedRows[cell.row];
    const column = columns[cell.column];
    if (canEdit(cell.column) && row && column)
      setEditing({ cell, value: initialValue ?? cellText(row[column.key]) });
  }
  function finishEditing(save: boolean, nextCell?: CellPosition, value?: string) {
    if (editing && save) {
      const text = value ?? editing.value;
      const column = columns[editing.cell.column];
      if (column && text !== cellText(sortedRows[editing.cell.row]?.[column.key]))
        applyValues(editing.cell, [[text]]);
    }
    setEditing(null);
    if (nextCell) focusCell(nextCell);
    requestAnimationFrame(() => gridRef.current?.focus({ preventScroll: true }));
  }
  useEffect(() => {
    if (activeCell)
      gridRef.current
        ?.querySelector(`[data-cell="${activeCell.row}-${activeCell.column}"]`)
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeCell]);
  useEffect(() => {
    if (!dragging) return;
    const endDrag = () => setDragging(false);
    window.addEventListener("pointerup", endDrag);
    return () => window.removeEventListener("pointerup", endDrag);
  }, [dragging]);
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (editing) return;
    const shortcut = usesMacShortcuts() ? event.metaKey : event.ctrlKey;
    if (shortcut && event.key.toLowerCase() === "z") {
      event.preventDefault();
      event.shiftKey ? redo() : undo();
      return;
    }
    if (shortcut && event.key.toLowerCase() === "y") {
      event.preventDefault();
      redo();
      return;
    }
    if (shortcut && event.key.toLowerCase() === "a") {
      event.preventDefault();
      setAnchorCell({ row: 0, column: 0 });
      setActiveCell({ row: sortedRows.length - 1, column: columns.length - 1 });
      return;
    }
    const active = selection.current.active;
    if (!active) {
      if (event.key.startsWith("Arrow") || event.key === "Enter") {
        event.preventDefault();
        focusCell({ row: 0, column: 0 });
      }
      return;
    }
    const { row, column } = active;
    const navigation: Record<string, CellPosition> = {
      ArrowUp: { row: shortcut ? 0 : row - 1, column },
      ArrowDown: { row: shortcut ? sortedRows.length - 1 : row + 1, column },
      ArrowLeft: { row, column: shortcut ? 0 : column - 1 },
      ArrowRight: { row, column: shortcut ? columns.length - 1 : column + 1 },
      Home: { row: shortcut ? 0 : row, column: 0 },
      End: {
        row: shortcut ? sortedRows.length - 1 : row,
        column: columns.length - 1,
      },
    };
    if (navigation[event.key]) {
      event.preventDefault();
      focusCell(navigation[event.key], event.shiftKey);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      focusCell({ row, column: column + (event.shiftKey ? -1 : 1) });
      return;
    }
    if (event.key === "Enter" || event.key === "F2") {
      event.preventDefault();
      startEditing(active);
      return;
    }
    if (event.key === "Escape") {
      setAnchorCell(null);
      return;
    }
    if ((event.key === "Delete" || event.key === "Backspace") && range) {
      event.preventDefault();
      clearCells();
      return;
    }
    if (
      event.key.length === 1 &&
      !shortcut &&
      !event.altKey &&
      columns[column]?.type !== "tag"
    ) {
      event.preventDefault();
      startEditing(active, event.key);
    }
  }
  function clearCells() {
    if (range)
      applyValues(
        { row: range.firstRow, column: range.firstColumn },
        fillRange(range, ""),
      );
  }
  function onCopy(event: ClipboardEvent<HTMLDivElement>) {
    if (editing || !range) return;
    event.preventDefault();
    const text = sortedRows
      .slice(range.firstRow, range.lastRow + 1)
      .map((row) =>
        columns
          .slice(range.firstColumn, range.lastColumn + 1)
          .map((column) => cellText(row[column.key]).replace(/[\t\n]/g, " "))
          .join("\t"),
      )
      .join("\n");
    event.clipboardData.setData("text/plain", text);
  }
  function onCut(event: ClipboardEvent<HTMLDivElement>) {
    if (!editing && range) {
      onCopy(event);
      clearCells();
    }
  }
  function onPaste(event: ClipboardEvent<HTMLDivElement>) {
    if (editing || !activeCell) return;
    event.preventDefault();
    const text = event.clipboardData
      .getData("text/plain")
      .replace(/\r/g, "")
      .replace(/\n$/, "");
    if (!text) return;
    const values = text.split("\n").map((line) => line.split("\t"));
    const start = range ? { row: range.firstRow, column: range.firstColumn } : activeCell;
    applyValues(
      start,
      values.length === 1 && values[0].length === 1 && range
        ? fillRange(range, values[0][0])
        : values,
    );
  }
  function cycleSort(key: string) {
    setSort((current) =>
      current?.key === key
        ? current.direction === "asc"
          ? { key, direction: "desc" }
          : null
        : { key, direction: "asc" },
    );
  }
  function selectRows(ids: Set<Row["id"]>) {
    setSelectedIds(ids);
    onSelectionChange?.(tableRows.filter((row) => ids.has(row.id)).map((row) => row.id));
  }
  function addRow() {
    const titleColumn = columns.find((column) => column.type === "title") ?? columns[0];
    if (!titleColumn) return;
    newRowCount.current++;
    // New rows have only an ID and a blank title; callers can populate extra fields in onRowsChange.
    const newRow = {
      id: `new-${newRowCount.current}`,
      [titleColumn.key]: "",
    } as Row;
    commitRows([...tableRows, newRow]);
    setSort(null);
    const cell = {
      row: tableRows.length,
      column: Math.max(0, columns.indexOf(titleColumn)),
    };
    setActiveCell(cell);
    setAnchorCell(null);
    setEditing({ cell, value: "" });
  }
  function deleteRows() {
    commitRows(tableRows.filter((row) => !selectedIds.has(row.id)));
    selectRows(new Set());
    setActiveCell(null);
    setAnchorCell(null);
  }
  const handlers = useRef<TableHandlers<Row> | null>(null);
  handlers.current = {
    down(event, row, column, alreadyEditing) {
      if (
        alreadyEditing ||
        event.button !== 0 ||
        (event.target instanceof Element && event.target.closest("a"))
      )
        return;
      event.preventDefault();
      gridRef.current?.focus({ preventScroll: true });
      if (editing) finishEditing(true);
      focusCell({ row, column }, event.shiftKey);
      setDragging(true);
    },
    enter(row, column) {
      if (dragging) {
        if (!selection.current.anchor) setAnchorCell(selection.current.active);
        setActiveCell({ row, column });
      }
    },
    edit(row, column) {
      startEditing({ row, column });
    },
    toggle(id) {
      const ids = new Set(selectedIds);
      ids.has(id) ? ids.delete(id) : ids.add(id);
      selectRows(ids);
    },
    change(value) {
      if (editing) setEditing({ cell: editing.cell, value });
    },
    done(row, column, save, move, value) {
      finishEditing(
        save,
        move
          ? {
              row: row + Number(move === "down"),
              column: column + Number(move === "right"),
            }
          : undefined,
        value,
      );
    },
    options(column) {
      return (
        column.options ?? [
          ...new Set(tableRows.map((row) => cellText(row[column.key])).filter(Boolean)),
        ]
      );
    },
  };
  const allSelected = sortedRows.length > 0 && selectedIds.size === sortedRows.length;
  return {
    tableRows,
    sortedRows,
    selectedIds,
    sort,
    activeCell,
    range,
    editing,
    dragging,
    gridRef,
    handlers,
    history,
    allSelected,
    someSelected: selectedIds.size > 0 && !allSelected,
    summary: selectionSummary(sortedRows, columns, range, activeCell),
    onKeyDown,
    onCopy,
    onCut,
    onPaste,
    cycleSort,
    selectRows,
    addRow,
    deleteRows,
    undo: () => {
      undo();
      refreshToolbar((value) => value + 1);
    },
    redo: () => {
      redo();
      refreshToolbar((value) => value + 1);
    },
  };
}
function TableIcon({
  name,
  skin,
}: {
  name: TableIconName;
  skin: TableSkin;
}): ReactElement {
  const clean = skin === "clean";
  const size = clean
    ? name === "sort"
      ? 12
      : name === "text" || name === "tag"
        ? 14
        : 16
    : name === "sort"
      ? 11
      : name === "add" || name === "delete"
        ? 14
        : 15;
  const stroke = clean
    ? "1.1"
    : name === "add"
      ? "1.5"
      : name === "text" || name === "tag"
        ? "1.3"
        : "1.4";
  return (
    <svg
      viewBox={!clean && name === "sort" ? "0 0 12 12" : "0 0 16 16"}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin={!clean && name === "add" ? undefined : "round"}
      aria-hidden="true"
    >
      <path d={(clean ? cleanPaths : paths)[name]} />
    </svg>
  );
}
function TableView<Row extends RowIdentity = DataTableRow>({
  skin,
  tagTones = emptyTones,
  editable = true,
  ...props
}: ViewProps<Row>): ReactElement {
  const table = useDataTable({ ...props, tagTones, editable });
  const { title, icon, columns, className } = props;
  const prefix = skin === "clean" ? "ui-dtc" : "ui-dt";
  const morphRef = useHeightMorph(table.gridRef);
  const shortcutLabel = usesMacShortcuts() ? "⌘" : "Ctrl";
  const accessibleTitle =
    typeof title === "string" || typeof title === "number" ? String(title) : undefined;
  return (
    <>
      <section
        className={[prefix, className].filter(Boolean).join(" ")}
        aria-label={accessibleTitle}
      >
        <header className={`${prefix}__head`}>
          {icon && <span className={`${prefix}__title-icon`}>{icon}</span>}
          <h3 className={`${prefix}__title`} title={accessibleTitle}>
            {title}
          </h3>
          {editable && (
            <div className={`${prefix}__tools`}>
              <button
                type="button"
                className={`${prefix}__tool`}
                aria-label={`Undo (${shortcutLabel} Z)`}
                title={`Undo · ${shortcutLabel} Z`}
                disabled={!table.history.current.past.length}
                onClick={table.undo}
              >
                <TableIcon skin={skin} name="undo" />
              </button>
              <button
                type="button"
                className={`${prefix}__tool`}
                aria-label={`Redo (${shortcutLabel} Shift Z)`}
                title={`Redo · ${shortcutLabel} ⇧ Z`}
                disabled={!table.history.current.future.length}
                onClick={table.redo}
              >
                <TableIcon skin={skin} name="redo" />
              </button>
            </div>
          )}
        </header>
        <div className={`${prefix}__${skin === "clean" ? "body" : "card"}`}>
          <div className={`${prefix}__morph`} ref={morphRef}>
            <div
              ref={table.gridRef}
              className={`${prefix}__scroll`}
              role="grid"
              aria-label={accessibleTitle}
              aria-rowcount={table.sortedRows.length + 1}
              aria-multiselectable="true"
              tabIndex={0}
              onKeyDown={table.onKeyDown}
              onCopy={table.onCopy}
              onCut={table.onCut}
              onPaste={table.onPaste}
              data-dragging={table.dragging || undefined}
            >
              <table className={`${prefix}__table`} role="presentation">
                <colgroup>
                  <col style={{ width: skin === "clean" ? 40 : 44 }} />
                  {columns.map((column) => (
                    <col
                      style={column.width ? { width: column.width } : undefined}
                      key={column.key}
                    />
                  ))}
                </colgroup>
                <thead>
                  <tr role="row">
                    <th className={`${prefix}__select`} role="columnheader">
                      <RowCheckbox
                        skin={skin}
                        prefix={prefix}
                        checked={table.allSelected}
                        mixed={table.someSelected}
                        label="Select all rows"
                        onChange={() =>
                          table.selectRows(
                            table.allSelected
                              ? new Set()
                              : new Set(table.sortedRows.map((row) => row.id)),
                          )
                        }
                      />
                    </th>
                    {columns.map((column, columnIndex) => {
                      const direction =
                        table.sort?.key === column.key ? table.sort.direction : null;
                      return (
                        <th
                          role="columnheader"
                          aria-sort={
                            direction === "asc"
                              ? "ascending"
                              : direction === "desc"
                                ? "descending"
                                : "none"
                          }
                          data-type={column.type}
                          data-col-active={
                            (!!table.range &&
                              columnIndex >= table.range.firstColumn &&
                              columnIndex <= table.range.lastColumn) ||
                            undefined
                          }
                          key={column.key}
                        >
                          <button
                            type="button"
                            className={`${prefix}__th`}
                            onClick={() => table.cycleSort(column.key)}
                          >
                            {column.icon && (
                              <span className={`${prefix}__col-icon`}>{column.icon}</span>
                            )}
                            <span className={`${prefix}__th-label`} title={column.label}>
                              {column.label}
                            </span>
                            <span
                              className={`${prefix}__sort`}
                              data-dir={direction ?? undefined}
                              aria-hidden="true"
                            >
                              <TableIcon skin={skin} name="sort" />
                            </span>
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {table.sortedRows.map((row, rowIndex) => {
                    const inRange =
                      !!table.range &&
                      rowIndex >= table.range.firstRow &&
                      rowIndex <= table.range.lastRow;
                    const editing = table.editing?.cell.row === rowIndex;
                    return (
                      <MemoTableRow
                        skin={skin}
                        prefix={prefix}
                        row={row}
                        rowIndex={rowIndex}
                        columns={columns}
                        tones={tagTones}
                        editable={editable}
                        checked={table.selectedIds.has(row.id)}
                        activeColumn={
                          table.activeCell?.row === rowIndex
                            ? table.activeCell.column
                            : -1
                        }
                        firstColumn={inRange ? table.range!.firstColumn : -1}
                        lastColumn={inRange ? table.range!.lastColumn : -1}
                        editColumn={editing ? table.editing!.cell.column : -1}
                        editValue={editing ? table.editing!.value : ""}
                        handlers={table.handlers}
                        key={row.id}
                      />
                    );
                  })}
                </tbody>
              </table>
              {table.sortedRows.length === 0 && (
                <p className={`${prefix}__empty`}>No rows yet</p>
              )}
            </div>
          </div>
        </div>
        <footer className={`${prefix}__foot`}>
          {table.selectedIds.size > 0 ? (
            <div className={`${prefix}__bulk`} role="status">
              <span>
                {table.selectedIds.size.toLocaleString("en-US")}
                {" selected"}
              </span>
              {editable && (
                <button
                  type="button"
                  className={`${prefix}__add ${prefix}__add--danger`}
                  onClick={table.deleteRows}
                >
                  <TableIcon skin={skin} name="delete" />
                  Delete
                </button>
              )}
              <button
                type="button"
                className={`${prefix}__add`}
                onClick={() => table.selectRows(new Set())}
              >
                Clear
              </button>
            </div>
          ) : editable ? (
            <button type="button" className={`${prefix}__add`} onClick={table.addRow}>
              <TableIcon skin={skin} name="add" />
              Add row
            </button>
          ) : (
            <span />
          )}
          <span className={`${prefix}__summary`} aria-live="polite">
            {table.summary ?? (editable ? "Double-click a cell to edit" : "")}
          </span>
        </footer>
      </section>
    </>
  );
}
function TableRowView<Row extends RowIdentity>({
  skin,
  prefix,
  row,
  rowIndex,
  columns,
  tones,
  editable,
  checked,
  activeColumn,
  firstColumn,
  lastColumn,
  editColumn,
  editValue,
  handlers,
}: TableRowProps<Row>): ReactElement {
  const titleColumn = columns.find((column) => column.type === "title") ?? columns[0];
  return (
    <tr role="row" data-selected={checked || undefined}>
      <td className={`${prefix}__select`} role="gridcell">
        <RowCheckbox
          skin={skin}
          prefix={prefix}
          checked={checked}
          label={`Select ${(titleColumn && cellText(row[titleColumn.key])) || "row"}`}
          onChange={() => handlers.current?.toggle(row.id)}
        />
      </td>
      {columns.map((column, columnIndex) => {
        const active = activeColumn === columnIndex;
        const editing = editColumn === columnIndex;
        const inRange = columnIndex >= firstColumn && columnIndex <= lastColumn;
        return (
          <td
            role="gridcell"
            data-cell={`${rowIndex}-${columnIndex}`}
            data-type={column.type}
            data-active={active || undefined}
            data-in-range={(inRange && !active) || undefined}
            data-editing={editing || undefined}
            aria-selected={inRange}
            aria-readonly={!(editable && column.editable !== false) || undefined}
            onPointerDown={(event) =>
              handlers.current?.down(event, rowIndex, columnIndex, editing)
            }
            onPointerEnter={() => handlers.current?.enter(rowIndex, columnIndex)}
            onDoubleClick={() => handlers.current?.edit(rowIndex, columnIndex)}
            key={column.key}
          >
            {editing ? (
              <CellEditor
                skin={skin}
                prefix={prefix}
                column={column}
                value={editValue}
                options={
                  column.type === "tag" ? handlers.current?.options(column) : undefined
                }
                tones={tones}
                onChange={(value) => handlers.current?.change(value)}
                onDone={(save, move, value) =>
                  handlers.current?.done(rowIndex, columnIndex, save, move, value)
                }
              />
            ) : (
              <CellValue prefix={prefix} column={column} row={row} tones={tones} />
            )}
          </td>
        );
      })}
    </tr>
  );
}
function CellValue<Row extends RowIdentity>({
  prefix,
  column,
  row,
  tones,
}: {
  prefix: string;
  column: DataTableColumn<Row>;
  row: Row;
  tones: Record<string, DataTableTone>;
}): ReactElement | null {
  const value = row[column.key];
  const text = cellText(value);
  if (column.type === "title") {
    const logo = "logo" in row ? (row.logo as ReactNode) : undefined;
    return (
      <span className={`${prefix}__name`}>
        {logo ? (
          <span className={`${prefix}__logo`}>{logo}</span>
        ) : (
          <span className={`${prefix}__logo ${prefix}__logo--empty`} />
        )}
        <span
          className={`${prefix}__name-text`}
          data-empty={text === "" || undefined}
          dir="auto"
          title={text || undefined}
        >
          {text || "Untitled"}
        </span>
      </span>
    );
  }
  if (text === "") return null;
  if (column.type === "tag")
    return (
      <span
        className={`${prefix}__tag`}
        data-tone={tones[text] ?? "blue"}
        dir="auto"
        title={text}
      >
        {text}
      </span>
    );
  if (column.type === "link") {
    const href = /^https?:\/\//.test(text) ? text : `https://${text}`;
    return (
      <a
        className={`${prefix}__link`}
        href={href}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        title={href}
      >
        {text.replace(/^https?:\/\//, "")}
      </a>
    );
  }
  if (column.type === "number" && typeof value === "number") {
    let formatted: string;
    try {
      formatted = column.format ? String(column.format(value)) : displayNumber(value);
    } catch {
      formatted = displayNumber(value);
    }
    return (
      <span className={`${prefix}__text`} title={preciseNumber(value)}>
        {formatted}
      </span>
    );
  }
  return (
    <span className={`${prefix}__text`} dir="auto" title={text || undefined}>
      {text}
    </span>
  );
}
function CellEditor<Row extends RowIdentity>({
  skin,
  prefix,
  column,
  value,
  options,
  tones,
  onChange,
  onDone,
}: CellEditorProps<Row>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, []);
  return options ? (
    <TagPicker
      skin={skin}
      prefix={prefix}
      label={column.label}
      value={value}
      options={options}
      tones={tones}
      onChange={onChange}
      onDone={onDone}
    />
  ) : (
    <input
      ref={inputRef}
      className={`${prefix}__input`}
      value={value}
      inputMode={column.type === "number" ? "decimal" : undefined}
      aria-label={column.label}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => onDone(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onDone(true, "down");
        } else if (event.key === "Tab") {
          event.preventDefault();
          onDone(true, "right");
        } else if (event.key === "Escape") {
          event.preventDefault();
          onDone(false);
        }
      }}
    />
  );
}
function TagPicker({
  skin,
  prefix,
  label,
  value,
  options,
  tones,
  onChange,
  onDone,
}: {
  skin: TableSkin;
  prefix: string;
  label: string;
  value: string;
  options: string[];
  tones: Record<string, DataTableTone>;
  onChange(value: string): void;
  onDone: FinishEdit;
}): ReactElement {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  useLayoutEffect(() => {
    const positionMenu = () => {
      const cell = anchorRef.current?.closest("td");
      const menu = menuRef.current;
      if (!cell || !menu) return;
      const rect = cell.getBoundingClientRect();
      const height = menu.offsetHeight;
      const top =
        window.innerHeight - rect.top - 4 >= height + 8
          ? rect.top + 4
          : Math.max(8, rect.bottom - 4 - height);
      setPosition({
        left: rect.left + 6,
        top,
        width: Math.max(rect.width - 12, 160),
      });
    };
    positionMenu();
    window.addEventListener("scroll", positionMenu, true);
    window.addEventListener("resize", positionMenu);
    return () => {
      window.removeEventListener("scroll", positionMenu, true);
      window.removeEventListener("resize", positionMenu);
    };
  }, []);
  useEffect(() => {
    const dismiss = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Node) || !menuRef.current?.contains(event.target))
        onDone(false);
    };
    window.addEventListener("pointerdown", dismiss, true);
    return () => window.removeEventListener("pointerdown", dismiss, true);
  }, [onDone]);
  return (
    <span ref={anchorRef} className={`${prefix}__picker-anchor`}>
      <div
        ref={menuRef}
        className={`${prefix}__picker`}
        role="listbox"
        aria-label={label}
        style={
          position
            ? {
                left: position.left,
                top: position.top,
                minWidth: position.width,
              }
            : { visibility: "hidden" }
        }
      >
        {options.map((option) => (
          <button
            type="button"
            role="option"
            aria-selected={option === value}
            className={`${prefix}__option`}
            autoFocus={option === value || (!value && option === options[0])}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => {
              onChange(option);
              onDone(true, undefined, option);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") onDone(false);
              const buttons = [
                ...(event.currentTarget.parentElement?.querySelectorAll("button") ?? []),
              ];
              const index = buttons.indexOf(event.currentTarget);
              if (event.key === "ArrowDown")
                buttons[Math.min(buttons.length - 1, index + 1)]?.focus();
              if (event.key === "ArrowUp") buttons[Math.max(0, index - 1)]?.focus();
              if (event.key.startsWith("Arrow")) event.preventDefault();
            }}
            key={option}
          >
            {skin === "clean" ? (
              <>
                <span className={`${prefix}__tag`} data-tone={tones[option] ?? "blue"}>
                  {option}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  className={`${prefix}__option-check`}
                  aria-hidden="true"
                >
                  <path d="m4 8.25 2.6 2.6L12 5.25" />
                </svg>
              </>
            ) : (
              option
            )}
          </button>
        ))}
      </div>
    </span>
  );
}
function RowCheckbox({
  skin,
  prefix,
  checked,
  mixed,
  label,
  onChange,
}: {
  skin: TableSkin;
  prefix: string;
  checked: boolean;
  mixed?: boolean;
  label: string;
  onChange(): void;
}): ReactElement {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={mixed ? "mixed" : checked}
      aria-label={label}
      className={`${prefix}__check`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onChange}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {mixed ? (
          <path d={skin === "clean" ? "M5 8h6" : "M4.5 8h7"} />
        ) : (
          <path
            d={
              skin === "clean"
                ? "m4.5 8.25 2.25 2.25L11.5 5.75"
                : "m4.25 8.25 2.5 2.5 5-5.5"
            }
          />
        )}
      </svg>
    </button>
  );
}
function useHeightMorph(contentRef: RefObject<HTMLDivElement | null>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    const syncHeight = () => {
      wrapper.style.height = `${content.offsetHeight}px`;
    };
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(content);
    const frame = requestAnimationFrame(() => wrapper.setAttribute("data-smooth", ""));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [contentRef]);
  return wrapperRef;
}
const decimalFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});
const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const preciseFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 10,
});
const paths: Record<TableIconName, string> = {
  add: "M8 3v10M3 8h10",
  delete: "M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5",
  undo: "M5.5 3.5 2.5 6.5l3 3M2.5 6.5h7a4 4 0 0 1 0 8H7",
  redo: "m10.5 3.5 3 3-3 3M13.5 6.5h-7a4 4 0 0 0 0 8H9",
  sort: "M6 2.5v7M3.5 7l2.5 2.5L8.5 7",
  text: "M3 4h10M3 7h10M3 10h10M3 13h6",
  tag: "M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z",
};
const cleanPaths = {
  ...paths,
  add: "M8 3.5v9M3.5 8h9",
  undo: "M5.5 3.5 2.5 6.5l3 3M2.5 6.5h7a3.5 3.5 0 0 1 0 7H7",
  redo: "m10.5 3.5 3 3-3 3M13.5 6.5h-7a3.5 3.5 0 0 0 0 7H9",
  sort: "M8 3.5v9M5 9.5l3 3 3-3",
};
const emptyTones: Record<string, DataTableTone> = {};
// memo preserves rendering; this assertion retains the generic row model for callers.
const MemoTableRow = memo(TableRowView) as typeof TableRowView;
export { DataTable };
export { TextColumnIcon };
export { TagColumnIcon };
export type { DataTableTone };
export type { DataTableRow };
export type { DataTableColumn };
export type { DataTableProps };
