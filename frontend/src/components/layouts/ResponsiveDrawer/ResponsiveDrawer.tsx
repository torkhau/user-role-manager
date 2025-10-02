import { Box, Drawer, Toolbar } from '@mui/material';
import { useState, type ReactNode } from 'react';
import { DRAWER_WIDTH } from '../../../core/const';
import { Sidebar } from '../Sidebar';
import { TopBar } from '../TopBar';

export function ResponsiveDrawer({ children }: { children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <TopBar onMenuClick={handleDrawerToggle} />
      <Box component='nav' sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          slotProps={{ root: { keepMounted: true } }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </>
  );
}
