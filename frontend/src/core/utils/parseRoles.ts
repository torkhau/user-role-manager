import type { HeadTableCell, IRole } from '../types';

export const parseRoles = (roles: IRole[]) => {
  const headCells: HeadTableCell<IRole>[] = [
    { id: 'id', label: 'ID' },
    { id: 'roleName', label: 'Role Name' },
  ];

  return { rows: roles, headCells };
};
