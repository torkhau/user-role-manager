import { Skeleton, TableCell, TableRow } from '@mui/material';
import type { HeadTableCell } from '../../../core/types';
import { TableApp } from '../TableApp';

interface TableSkeletonProps {
  rows?: number;
}

interface SkeletonRow {
  id: string;
  col1: string;
  col2: string;
  col3: string;
}

export function TableSkeleton({ rows = 5 }: TableSkeletonProps) {
  const skeletonRows: SkeletonRow[] = Array.from({ length: rows }).map((_, index) => ({
    id: `row-${index}`,
    col1: '',
    col2: '',
    col3: '',
  }));

  const headCells: HeadTableCell<SkeletonRow>[] = [
    { id: 'id', label: <Skeleton variant='text' width={120} /> },
    { id: 'col1', label: <Skeleton variant='text' width={80} /> },
    { id: 'col2', label: <Skeleton variant='text' width={95} /> },
    { id: 'col3', label: <Skeleton variant='text' width={250} /> },
  ] as const;

  return (
    <TableApp tableName={<Skeleton variant='text' width={150} />} headCells={headCells}>
      {skeletonRows.map((row) => (
        <TableRow key={row.id}>
          {headCells.map((col) => (
            <TableCell key={`${row.id}-${col.id}`}>
              <Skeleton variant='text' width='100%' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableApp>
  );
}
