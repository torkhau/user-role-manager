import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { TableData } from '../../../core/types';
import { TableToolbar } from '../TableToolbar';

interface TableAppProps<T extends { id: string | number }> extends TableData<T> {
  tableName: string;
}

export function TableApp<T extends { id: string | number }>({ headCells, tableName, rows }: TableAppProps<T>) {
  return (
    <Paper sx={{ width: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', maxWidth: 750 }}>
      <TableToolbar tableName={tableName} />
      <TableContainer>
        <Table stickyHeader aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              {headCells.map(({ label }) => (
                <TableCell key={label}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow tabIndex={-1} key={row.id}>
                {headCells.map(({ id }) => (
                  <TableCell key={String(id)}>{String(row[id])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
