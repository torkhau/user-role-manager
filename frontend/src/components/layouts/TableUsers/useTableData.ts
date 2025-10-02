import { useEffect, useState } from 'react';
import { getRoles, getUsers } from '../../../core/api';
import { useAuthContext } from '../../../core/contexts/auth';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import type { HeadTableCell, IUserTableItem } from '../../../core/types';
import { parseUsers } from '../../../core/utils';

export const useTableData = () => {
  const { user } = useAuthContext();
  const { menuItem } = useMenuItemContext();
  const [rows, setRows] = useState<IUserTableItem[]>([]);
  const [headCells, setHeadCells] = useState<HeadTableCell<IUserTableItem>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [roles, users] = await Promise.all([getRoles(), getUsers()]);

      const { rows, headCells } = parseUsers(users, roles, user?.isAdmin);

      console.log(rows, headCells)
      
      setRows(rows);
      setHeadCells(headCells);

      setLoading(false);
    };

    fetchData();
  }, [menuItem, user?.isAdmin]);

  return { rows, headCells, loading };
};
