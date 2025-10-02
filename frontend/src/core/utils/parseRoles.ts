import type { TApiResponse } from '../api/types';
import type { HeadTableCell, IRole, TableData } from '../types';
import { isResponseSuccess } from './isResponseSuccess';

export const parseRoles = (roles: TApiResponse<IRole[]>): TableData<IRole> => {
  if (!isResponseSuccess(roles)) {
    console.error('Error loading roles');
    return { rows: [], headCells: [] };
  }

  const rows = roles.data;

  const headCells: HeadTableCell<IRole>[] = [
    { id: 'id', label: 'ID' },
    { id: 'roleName', label: 'Role Name' },
  ];

  return { rows, headCells };
};
