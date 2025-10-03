import { TableCell, TableRow } from '@mui/material';
import type { IRole } from '../../../core/types';
import { MultipleSelectCheckmarks, TableApp, TableSkeleton } from '../../ui';
import { useTableData } from './useTableData';

export function TableUsers() {
  const { rows, headCells, loading, updateUserRoles, updatingRoles, rolesForFilter, setRoleFilterIds } = useTableData();

  const handleRoleSubmit = async (rowId: string, newRoles: IRole[]) => updateUserRoles(rowId, newRoles);

  if (loading) return <TableSkeleton />;

  const filterActions = (
    <MultipleSelectCheckmarks
      items={rolesForFilter}
      onSubmit={(selectedRoles) => {
        setRoleFilterIds(selectedRoles.map((r) => r.id));
      }}
    />
  );

  return (
    <TableApp tableName='Users' headCells={headCells} filterActions={filterActions}>
      {rows.map((row) => (
        <TableRow tabIndex={-1} key={row.id}>
          {headCells.map(({ id }) => {
            return (
              <TableCell key={String(id)}>
                {id === 'roles' ? (
                  <MultipleSelectCheckmarks
                    items={row[id]}
                    loading={updatingRoles[row.id]}
                    onSubmit={(newRoles) => handleRoleSubmit(row.id, newRoles)}
                  />
                ) : (
                  String(row[id])
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableApp>
  );
}
