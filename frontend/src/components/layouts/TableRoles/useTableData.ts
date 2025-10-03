import { useEffect, useState } from 'react';
import { getRoles } from '../../../core/api';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import { useNotificationContext } from '../../../core/contexts/notifications';
import type { HeadTableCell, IRole } from '../../../core/types';
import { parseRoles } from '../../../core/utils';
import { isResponseSuccess } from '../../../core/utils/isResponseSuccess';

export const useTableData = () => {
  const { menuItem } = useMenuItemContext();
  const [rows, setRows] = useState<IRole[]>([]);
  const [headCells, setHeadCells] = useState<HeadTableCell<IRole>[]>([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotificationContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const roles = await getRoles();

      if (isResponseSuccess(roles)) {
        const { rows, headCells } = parseRoles(roles.data);

        setRows(rows);
        setHeadCells(headCells);
      } else {
        setRows([]);
      }

      if (roles.message) showNotification({ text: roles.message, severity: roles.success ? 'success' : 'error' });

      setLoading(false);
    };

    fetchData();
  }, [menuItem, showNotification]);

  return { rows, headCells, loading };
};
