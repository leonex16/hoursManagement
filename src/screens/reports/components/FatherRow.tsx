import { TableRow, TableCell, IconButton, TableContainer, Table, TableHead, TableBody, Container, Collapse } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useState } from 'react';

import { ChildRow } from './ChildRow';

import { generateKey } from '../../../utils/generateKey';

import { IDialHistory } from '../../../shared/models/IDialHistory';
import { ITotalOvertime } from '../../../shared/models/ITotalOvertime';

interface IFatherRow {
  dialHistory: IDialHistory[]; periodName: string; totalOvertime: ITotalOvertime;
}
export const FatherRow = ({ dialHistory, periodName, totalOvertime }: IFatherRow) => {
  const [ isRetracted, setIsRetracted ] = useState<boolean>(false);
  const period = periodName.split('_').slice(1).join(' ').toUpperCase();

  return (
    <>
      {/* Row Father */}
      <TableRow >
        <TableCell colSpan={3} align={'center'}>{period}</TableCell>
        <TableCell colSpan={2} align={'center'}>{totalOvertime[ 50 ]}</TableCell>
        <TableCell colSpan={2} align={'center'}>{totalOvertime[ 100 ]}</TableCell>
        <TableCell colSpan={1} align={'center'}>
          <IconButton
            size="small"
            onClick={() => setIsRetracted(!isRetracted)}
          >
            {isRetracted ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* Row Child */}
      <TableRow>
        <TableCell style={{ padding: 0, }} colSpan={8}>
          <Collapse in={isRetracted} timeout={'auto'} unmountOnExit>
            <Container>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} rowSpan={2} align={'center'}>Fecha</TableCell>
                      <TableCell colSpan={4} align={'center'}>Horas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} align={'center'}>50%</TableCell>
                      <TableCell colSpan={2} align={'center'}>100%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dialHistory.map(recordHour => <ChildRow key={generateKey()} dialHistory={recordHour} />)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  )
}
