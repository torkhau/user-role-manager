import { People, Shield } from '@mui/icons-material';
import { List, Toolbar } from '@mui/material';
import { SidebarItem } from '../../ui';
import { useMenuItemContext } from '../../../core/contexts/menuItem';

const items = [
  { label: 'Users', icon: <People /> },
  { label: 'Roles', icon: <Shield /> },
];

export function Sidebar() {
  const {menuItem, setMenuItem} = useMenuItemContext()

  const handleSelect = (index: number) => {
    setMenuItem(index);
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
            selected={menuItem === index}
            onClick={() => handleSelect(index)}
          />
        ))}
      </List>
    </>
  );
}
