export interface HeadTableCell<T> {
  id: keyof T;
  label: string;
}

export interface TableData<T> {
  rows: T[];
  headCells: HeadTableCell<T>[];
}