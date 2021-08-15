import { IAction } from '../../shared/models/IAction';
import { IHomeForm } from '../../shared/models/IHomeForm';
import { THomeForm } from '../../shared/models/THomeForm';

export function homeReducer(
	state: IHomeForm,
	action: IAction<THomeForm>,
): IHomeForm {
	switch (action.type) {
		case 'CALCULATE_OVERTIME':
			return { ...state, overtimeQuant: action.payload };
		case 'VALIDATE_FORM':
			return { ...state, isFormValidated: action.payload };
		default:
			return state;
	}
}
