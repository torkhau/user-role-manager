import type { HeadTableCell, IRole, IUser, IUserRole, IUserTableItem } from '../types';

const mapUserRoles = (userRoles: IRole[], allRoles: IRole[], isAdmin: boolean): IUserRole[] =>
  allRoles.map((role) => {
    const roleName = role.roleName.toLowerCase();
    const userHasRole = userRoles.some((r) => r.roleName.toLowerCase() === roleName);

    return { ...role, checked: userHasRole, disabled: !isAdmin };
  });

export const parseUsers = (users: IUser[], roles: IRole[], isAdmin = false) => {
  const rows = users.map(({ roles: userRoles, ...rest }) => ({
    ...rest,
    roles: mapUserRoles(userRoles, roles, isAdmin),
  }));

  const headCells: HeadTableCell<IUserTableItem>[] = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'username', label: 'Name' },
    { id: 'roles', label: 'Roles' },
  ];

  return { rows, headCells };
};
