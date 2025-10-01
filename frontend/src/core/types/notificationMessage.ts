import type { AlertColor } from '@mui/material';

export interface INotificationMessage {
  severity: AlertColor;
  text: string;
}