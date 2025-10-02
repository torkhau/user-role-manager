import { TableApp } from '../../ui';
import { useTableData } from './useTableData';

export function TableUsers() {
  const { rows, headCells, loading } = useTableData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <TableApp tableName='Users' rows={rows} headCells={headCells} />
}