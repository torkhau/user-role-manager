import { Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface TableToolbarProps {
  tableName: ReactNode;
  actions?: ReactNode;
}

export function TableToolbar({ tableName, actions }: TableToolbarProps) {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography sx={{ flex: '1 1 100%' }} variant='h6' component='div'>
        {tableName}
      </Typography>
      {actions}
    </Toolbar>
  );
}
