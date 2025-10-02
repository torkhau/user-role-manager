import type { ReactNode } from 'react';

export interface HeadTableCell<T> {
  id: keyof T;
  label: ReactNode;
}

export interface TableData<T> {
  headCells: HeadTableCell<T>[];
}
