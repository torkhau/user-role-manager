import { Checkbox, FormControl, ListItemText, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import type { IUserRole } from '../../../core/types';

interface MultipleSelectCheckmarksProps<T extends IUserRole> {
  items: T[];
  onChange?: (selected: T[]) => void;
}

const WIDTH = 200;

export function MultipleSelectCheckmarks<T extends IUserRole>({ items, onChange }: MultipleSelectCheckmarksProps<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>(items.filter((item) => item.checked).map((item) => item.id));

  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    const ids = typeof value === 'string' ? value.split(',') : value;
    setSelectedIds(ids);

    if (onChange) {
      onChange(items.filter((item) => ids.includes(item.id)));
    }
  };

  return (
    <FormControl sx={{ width: WIDTH }}>
      <Select
        labelId='multiple-checkbox-label'
        multiple
        value={selectedIds}
        onChange={handleChange}
        renderValue={(selected) =>
          items
            .filter((item) => selected.includes(item.id))
            .map((item) => item.roleName)
            .join(', ')
        }
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id} disabled={item.disabled}>
            <Checkbox checked={selectedIds.includes(item.id)} />
            <ListItemText primary={item.roleName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
