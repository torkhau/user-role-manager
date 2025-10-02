import { FilterList } from '@mui/icons-material';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

interface TableToolbarProps {
  tableName: string;
}

export function TableToolbar({ tableName }: TableToolbarProps) {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography sx={{ flex: '1 1 100%' }} variant='h6' component='div'>
        {tableName}
      </Typography>
      <Tooltip title='Filter list'>
        <IconButton>
          <FilterList />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
