import { TableCell, TableRow } from '@mui/material';
import { TableApp, TableSkeleton } from '../../ui';
import { useTableData } from './useTableData';

export function TableRoles() {
  const { rows, headCells, loading } = useTableData();

  if (loading) return <TableSkeleton />;

  return (
    <TableApp tableName='Roles' headCells={headCells}>
      {rows.map((row) => (
        <TableRow tabIndex={-1} key={row.id}>
          {headCells.map(({ id }) => (
            <TableCell key={String(id)}>{String(row[id])}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableApp>
  );
}
