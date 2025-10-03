import { Checkbox, FormControl, ListItemText, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import type { IRole, IUserRole } from '../../../core/types';

interface MultipleSelectCheckmarksProps<T extends IUserRole> {
  items: T[];
  onSubmit?: (selected: IRole[]) => void;
}

const WIDTH = 200;

export function MultipleSelectCheckmarks<T extends IUserRole>({ items, onSubmit }: MultipleSelectCheckmarksProps<T>) {
  const initialIds = useRef<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    const ids = typeof value === 'string' ? value.split(',') : value;
    setSelectedIds(ids);
  };

  const handleClose = () => {
    const initial = initialIds.current.sort().join(',');
    const current = selectedIds.sort().join(',');

    if (initial !== current && onSubmit) {
      const selectedRoles: IRole[] = items
        .filter(({ id }) => selectedIds.includes(id))
        .map(({ id, roleName }) => ({ id, roleName }));
      onSubmit(selectedRoles);
    }
  };

  useEffect(() => {
    const checkedIds = items.filter(({ checked }) => checked).map(({ id }) => id);
    initialIds.current = checkedIds;
    setSelectedIds(checkedIds);
  }, [items]);

  return (
    <FormControl sx={{ width: WIDTH }}>
      <Select
        labelId='multiple-checkbox-label'
        multiple
        value={selectedIds}
        onChange={handleChange}
        onClose={handleClose}
        renderValue={(selected) =>
          items
            .filter(({ id }) => selected.includes(id))
            .map(({ roleName }) => roleName)
            .join(', ')
        }
      >
        {items.map(({ id, disabled, roleName }) => (
          <MenuItem key={id} value={id} disabled={disabled}>
            <Checkbox checked={selectedIds.includes(id)} />
            <ListItemText primary={roleName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
