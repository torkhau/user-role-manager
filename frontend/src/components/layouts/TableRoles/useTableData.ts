import { useEffect, useState } from 'react';
import { getRoles } from '../../../core/api';
import { useMenuItemContext } from '../../../core/contexts/menuItem';
import type { HeadTableCell, IRole } from '../../../core/types';
import { parseRoles } from '../../../core/utils';

export const useTableData = () => {
  const { menuItem } = useMenuItemContext();
  const [rows, setRows] = useState<IRole[]>([]);
  const [headCells, setHeadCells] = useState<HeadTableCell<IRole>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const apiResponse = await getRoles();
      const { rows, headCells } = parseRoles(apiResponse);
      setRows(rows);
      setHeadCells(headCells);

      setLoading(false);
    };

    fetchData();
  }, [menuItem]);

  return { rows, headCells, loading };
};
