import { ListItem, ListItemButton, ListItemIcon, ListItemText, type ListItemButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

interface SidebarItemProps extends Pick<ListItemButtonProps, 'onClick' | 'selected'> {
  label: string;
  icon: ReactNode;
}

export function SidebarItem({ label, icon, ...rest }: SidebarItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton {...rest}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
