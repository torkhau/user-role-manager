import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { type ReactNode } from 'react';
import { DRAWER_WIDTH } from '../../../core/const';
import { UserMenu } from '../UserMenu';

type TopBarProps = {
  children?: ReactNode;
  onMenuClick: () => void;
};

export function TopBar({ children, onMenuClick }: TopBarProps) {
  return (
    <AppBar position='fixed' sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box display='flex' justifyContent={children ? 'space-between' : 'flex-end'} width={1}>
          {children}
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
