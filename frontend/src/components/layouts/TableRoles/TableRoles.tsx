import { TableApp } from '../../ui';
import { useTableData } from './useTableData';

export function TableRoles() {
  const { rows, headCells, loading } = useTableData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <TableApp tableName='Roles' rows={rows} headCells={headCells} />
}