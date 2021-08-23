import { IAction } from '../../shared/models/IAction';
import { IUserInformation } from '../../shared/models/IUserInformation';
import { TUserInformation } from '../../shared/models/TUserInformation';

export function fillUserInformation(newState: IUserInformation | undefined) {
	const action: IAction<TUserInformation> = { type: 'NOT_ACTION', payload: null };

	if (newState === undefined) {
		console.error('NOT FOUND USER INFORMATION');
		return action;
	}

	action.type = 'FILL_INFORMATION';
	action.payload = newState;

	return action;
}
