import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { useAuthContext } from '../../../core/contexts/auth';

export function UserMenu() {
  const { logout, user } = useAuthContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorElUser(currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenUserMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Paper elevation={3} sx={{ m: 1, p: 1}}>
          <Stack spacing={1}>
            <Typography variant='h5'>{user?.username}</Typography>
            <Typography variant='subtitle1'>{user?.email}</Typography>
          </Stack>
        </Paper>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
