import { createContext, useEffect, useReducer } from 'react';

import { IContext } from '../shared/models/IContext';
import { IUserInformation } from '../shared/models/IUserInformation';
import { TUserInformation } from '../shared/models/TUserInformation';

import { userReducer } from './reducers/rootReducer';

import { getAllUsers } from '../services/userService';
import { fillUserInformation } from './actions/userAction';

const userInformationInit: IUserInformation = {
	uid: '',
	rut: 0,
	dv: '',
	firtname: '',
	lastname: '',
	email: '',
};

export const UserInformationContext = createContext<IContext<IUserInformation, TUserInformation> | null>(null);

export function UserInformationProvider({ children }: { children: any }) {
	const [userInformation, dispatch] = useReducer(userReducer, userInformationInit);

	useEffect(() => {
		getAllUsers().then(users => {
			const user: IUserInformation | undefined = users.find(user => user.rut === 10569251);

			dispatch(fillUserInformation(user));
		});
	}, []);

	return (
		<UserInformationContext.Provider value={{ ctx: userInformation, dispatch }}>
			{children}
		</UserInformationContext.Provider>
	);
}
