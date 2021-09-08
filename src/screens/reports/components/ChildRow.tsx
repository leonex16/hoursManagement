import { TableRow, TableCell } from '@material-ui/core';

import { firestoreDateToDate } from '../../../utils/firestoreDate';
import { ICheck, IDialHistory } from '../../../shared/models/IDialHistory';

interface IChildRow {
  dialHistory: IDialHistory;
}

export const ChildRow = ({ dialHistory }: IChildRow) => {
  const date = firestoreDateToDate((dialHistory.checkOut as ICheck).seconds);
  const overtimeDone = dialHistory.overtimeQuant;
  const typeHour = dialHistory.overtimeType;

  return <TableRow>
    <TableCell colSpan={3} align={'center'}>{date.toLocaleDateString('es-CL')}</TableCell>
    <TableCell colSpan={2} align={'center'}>{typeHour === 0 ? overtimeDone : '-'}</TableCell>
    <TableCell colSpan={2} align={'center'}>{typeHour === 1 ? overtimeDone : '-'}</TableCell>
  </TableRow>;
}
