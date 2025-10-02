import Box from '@mui/material/Box';
import type { FC } from 'react';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import { TableRoles } from '../TableRoles';
import { TableUsers } from '../TableUsers';

const tableMap: Record<number, FC> = {
  0: TableUsers,
  1: TableRoles,
};

export function Main() {
  const { menuItem } = useMenuItemContext();
  const TableComponent = tableMap[menuItem];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2, overflowY: 'hidden' }}>
      {TableComponent && <TableComponent />}
    </Box>
  );
}
