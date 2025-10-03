import { useEffect, useState } from 'react';
import { getRoles, getUsers, patchUserRoles } from '../../../core/api';
import { useAuthContext } from '../../../core/contexts/auth';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import { useNotificationContext } from '../../../core/contexts/notifications';
import type { HeadTableCell, INotificationMessage, IRole, IUserSessionData, IUserTableItem } from '../../../core/types';
import { parseUsers } from '../../../core/utils';
import { isResponseSuccess } from '../../../core/utils/isResponseSuccess';

export const useTableData = () => {
  const { user, login } = useAuthContext();
  const { menuItem } = useMenuItemContext();
  const { showNotification } = useNotificationContext();
  const [rows, setRows] = useState<IUserTableItem[]>([]);
  const [headCells, setHeadCells] = useState<HeadTableCell<IUserTableItem>[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingRoles, setUpdatingRoles] = useState<Record<string, boolean>>({});

  const setLoadingForUser = (userId: string, isLoading: boolean) => {
    setUpdatingRoles((prev) => ({ ...prev, [userId]: isLoading }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [roles, users] = await Promise.all([getRoles(), getUsers()]);

      if (isResponseSuccess(roles) && isResponseSuccess(users)) {
        const { rows, headCells } = parseUsers(users.data, roles.data, user?.isAdmin);

        setRows(rows);
        setHeadCells(headCells);
      } else {
        setRows([]);
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

  const updateUserRoles = async (rowId: string, newRoles: IRole[]) => {
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

      setRows((prev) =>
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
  };

  return { rows, headCells, loading, updateUserRoles, updatingRoles };
};
