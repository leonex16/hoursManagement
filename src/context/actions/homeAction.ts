import { IAction } from "../../shared/models/IAction";
import { IHomeForm } from "../../shared/models/IHomeForm";
import { THomeForm } from "../../shared/models/THomeForm";

import { calculateDiffDates } from "../../utils/calculateDiffDates";
import { subtractOvertime } from "../../utils/subtractOvertime";

export function calculateOvertime(homeForm: IHomeForm) {
  const action: IAction<THomeForm> = {type: 'NOT_ACTION', payload: null};
  const { checkIn, checkOut, shiftType } = homeForm;
  const overtimeQuant: number = 
    calculateDiffDates(new Date(checkIn!), new Date(checkOut!))
    - subtractOvertime(new Date(checkOut!).getDay(), shiftType);
  
  if (overtimeQuant <= 0) return action;

  action.type = 'CALCULATE_OVERTIME';
  action.payload = overtimeQuant;

  return action;
};

export function isFormValidated(checkOut: any) {
  const action: IAction<THomeForm> = {type: 'NOT_ACTION', payload: null};
  
  action.type = 'VALIDATE_FORM';
  action.payload = checkOut === null 
    ? false
    : true;

  return action;
};

export function inputChange(evt: any) {
  const action: IAction<THomeForm> = {type: 'NOT_ACTION', payload: null};
  const nameInp = evt?.target?.name;
  const valueInp = evt?.target?.value ?? evt;		

  action.type = 'CALCULATE_OVERTIME';
  action.payload = { [nameInp]: valueInp };

  return action;
};