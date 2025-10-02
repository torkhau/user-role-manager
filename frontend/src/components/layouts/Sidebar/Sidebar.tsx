import { People, Shield } from '@mui/icons-material';
import { List, Toolbar } from '@mui/material';
import { useState } from 'react';
import { SidebarItem } from '../../ui';

const items = [
  { label: 'Users', icon: <People /> },
  { label: 'Roles', icon: <Shield /> },
];

export function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Toolbar />
      <List>
        {items.map((item, index) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={selectedIndex === index}
            onClick={() => handleSelect(index)}
          />
        ))}
      </List>
    </>
  );
}
