import { IAction } from '../../shared/models/IAction';
import { IUserInformation } from '../../shared/models/IUserInformation';
import { TUserInformation } from '../../shared/models/TUserInformation';

export function userReducer(state: IUserInformation, action: IAction<TUserInformation>) {
	switch (action.type) {
		case 'FILL_INFORMATION':
			return action.payload;
		case 'NOT_ACTION':
			return state;
	}
}
