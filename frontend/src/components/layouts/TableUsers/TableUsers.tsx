import { TableCell, TableRow } from '@mui/material';
import { MultipleSelectCheckmarks, TableApp, TableSkeleton } from '../../ui';
import { useTableData } from './useTableData';

export function TableUsers() {
  const { rows, headCells, loading } = useTableData();

  if (loading) return <TableSkeleton />;

  return (
    <TableApp tableName='Users' headCells={headCells}>
      {rows.map((row) => (
        <TableRow tabIndex={-1} key={row.id}>
          {headCells.map(({ id }) => {
            return (
              <TableCell key={String(id)}>
                {id === 'roles' ? <MultipleSelectCheckmarks items={row[id]} /> : String(row[id])}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableApp>
  );
}
