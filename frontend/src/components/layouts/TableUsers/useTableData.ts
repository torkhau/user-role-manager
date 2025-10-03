import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRoles, getUsers, patchUserRoles } from '../../../core/api';
import { useAuthContext } from '../../../core/contexts/auth';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import { useNotificationContext } from '../../../core/contexts/notifications';
import type {
  HeadTableCell,
  INotificationMessage,
  IRole,
  IUserRole,
  IUserSessionData,
  IUserTableItem,
} from '../../../core/types';
import { parseUsers } from '../../../core/utils';
import { isResponseSuccess } from '../../../core/utils/isResponseSuccess';

export const useTableData = () => {
  const { user, login } = useAuthContext();
  const { menuItem } = useMenuItemContext();
  const { showNotification } = useNotificationContext();

  const [allRows, setAllRows] = useState<IUserTableItem[]>([]);
  const [allRoles, setAllRoles] = useState<IRole[]>([]);
  const [headCells, setHeadCells] = useState<HeadTableCell<IUserTableItem>[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingRoles, setUpdatingRoles] = useState<Record<string, boolean>>({});
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [roles, users] = await Promise.all([getRoles(), getUsers()]);

      if (isResponseSuccess(roles) && isResponseSuccess(users)) {
        const usersData = users.data;
        const rolesData = roles.data;

        const { rows, headCells } = parseUsers(usersData, rolesData, user?.isAdmin);

        setAllRows(rows);
        setAllRoles(rolesData);
        setHeadCells(headCells);
      } else {
        setAllRows([]);
        setAllRoles([]);
      }

      const msg: INotificationMessage = { text: '', severity: 'info' };

      if (roles.message) {
        msg['text'] = roles.message;
        msg['severity'] = roles.success ? 'success' : 'error';
      }

      if (users.message) {
        msg['text'] = users.message;
        msg['severity'] = users.success ? 'success' : 'error';
      }

      if (msg.text) showNotification(msg);

      setLoading(false);
    };

    fetchData();
  }, [menuItem, showNotification, user?.isAdmin]);

  const rows = useMemo(() => {
    if (!roleFilter || roleFilter.length === 0) return allRows;

    return allRows.filter((row) => row.roles.some((r) => r.checked && roleFilter.includes(r.id)));
  }, [allRows, roleFilter]);

  const rolesForFilter: IUserRole[] = useMemo(() => {
    return allRoles.map((r) => ({
      id: r.id,
      roleName: r.roleName,
      checked: roleFilter.includes(r.id),
      disabled: false,
    }));
  }, [allRoles, roleFilter]);

  const setLoadingForUser = useCallback((userId: string, isLoading: boolean) => {
    setUpdatingRoles((prev) => ({ ...prev, [userId]: isLoading }));
  }, []);

  const updateUserRoles = useCallback(
    async (rowId: string, newRoles: IRole[]) => {
      if (!user) return;

      setLoadingForUser(rowId, true);

      const updatedUser = await patchUserRoles(user, { userId: rowId, roles: newRoles });

      if (isResponseSuccess(updatedUser)) {
        const updatedUserData = updatedUser.data;

        if (user.id === updatedUserData.id) {
          const userSessionData: IUserSessionData = {
            id: updatedUserData.id,
            email: updatedUserData.email,
            username: updatedUserData.username,
          };

          if (updatedUserData.roles.some(({ roleName }) => roleName.toLowerCase() === 'admin'))
            userSessionData.isAdmin = true;

          login(userSessionData);
        }

        setAllRows((prev) =>
          prev.map((row) => {
            if (row.id !== updatedUserData.id) return row;

            const { roles: prevRoles, ...rest } = row;
            const newRoles = prevRoles.map((prevRole) => {
              const roleName = prevRole.roleName.toLowerCase();
              const userHasRole = updatedUserData.roles.some((r) => r.roleName.toLowerCase() === roleName);

              return { ...prevRole, checked: userHasRole };
            });

            return { ...rest, roles: newRoles };
          })
        );
      }

      if (updatedUser.message)
        showNotification({ text: updatedUser.message, severity: updatedUser.success ? 'success' : 'error' });

      setLoadingForUser(rowId, false);
    },
    [login, setLoadingForUser, showNotification, user]
  );

  const setRoleFilterIds = useCallback((ids: string[]) => {
    setRoleFilter(ids);
  }, []);

  return { rows, headCells, loading, updateUserRoles, updatingRoles, rolesForFilter, setRoleFilterIds };
};
