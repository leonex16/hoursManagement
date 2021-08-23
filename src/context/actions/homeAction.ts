import { IAction } from '../../shared/models/IAction';
import { IHomeForm } from '../../shared/models/IHomeForm';
import { THomeForm } from '../../shared/models/THomeForm';

import { calculateDiffDates } from '../../utils/calculateDiffDates';

export function calculateOvertime(homeForm: IHomeForm) {
	const action: IAction<THomeForm> = { type: 'NOT_ACTION', payload: null };
	const { checkIn, checkOut, shiftType } = homeForm;
	const hoursWorked: any = {
		// [shiftType]: quantity hours to subtract
		0: 7,
		1: 9,
		2: 9,
	};

	if (checkIn === null || checkOut === null) return action;

	const overtimeQuant: number = calculateDiffDates(new Date(checkIn), new Date(checkOut)) - hoursWorked[shiftType];

	if (overtimeQuant < 0) return action;

	action.type = 'CALCULATE_OVERTIME';
	action.payload = overtimeQuant;

	return action;
}

export function isFormValidated(homeForm: IHomeForm | null) {
	const action: IAction<THomeForm> = { type: 'VALIDATE_FORM', payload: true };

	if (homeForm === null || homeForm.checkOut === null || homeForm.overtimeQuant < 0) {
		action.payload = false;
	}

	return action;
}

export function inputChange(evt: any) {
	const action: IAction<THomeForm> = { type: 'NOT_ACTION', payload: null };
	const nameInp = evt?.target?.name;
	const valueInp = evt?.target?.value ?? evt;

	if (valueInp instanceof Date) valueInp.setSeconds(0);

	action.type = 'UPDATE_STATE';
	action.payload = { [nameInp]: valueInp };

	return action;
}
