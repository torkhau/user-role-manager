import type { TApiResponse } from '../api/types';
import type { HeadTableCell, IRole, IUser, IUserRole, IUserTableItem, TableData } from '../types';
import { isResponseSuccess } from './isResponseSuccess';

const mapUserRoles = (userRoles: IRole[], allRoles: IRole[], isAdmin: boolean): IUserRole[] => {
  const isAdminRow = userRoles.some((r) => r.roleName.toLowerCase() === 'admin');

  return allRoles.map((role) => {
    const roleName = role.roleName.toLowerCase();
    const userHasRole = userRoles.some((r) => r.roleName.toLowerCase() === roleName);

    if (roleName === 'viewer') return { ...role, checked: true, disabled: true };

    if (isAdminRow) {
      if (roleName === 'admin') return { ...role, checked: true, disabled: false };

      return { ...role, checked: true, disabled: true };
    }

    return { ...role, checked: userHasRole, disabled: !isAdmin };
  });
};

export const parseUsers = (
  users: TApiResponse<IUser[]>,
  roles: TApiResponse<IRole[]>,
  isAdmin = false
): TableData<IUserTableItem> => {
  if (!isResponseSuccess(users) || !isResponseSuccess(roles)) {
    console.error('Error loading users');
    return { rows: [], headCells: [] };
  }

  const rows = users.data.map(({ roles: userRoles, ...rest }) => ({
    ...rest,
    roles: mapUserRoles(userRoles, roles.data, isAdmin),
  }));

  const headCells: HeadTableCell<IUserTableItem>[] = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'username', label: 'Name' },
    { id: 'roles', label: 'Roles' },
  ];

  return { rows, headCells };
};
