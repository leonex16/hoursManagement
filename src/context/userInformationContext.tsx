// import { createContext, useEffect, useReducer } from 'react';
export const e = 1;

// import { IContext } from '../shared/models/IContext';
// import { ILogIn } from '../shared/models/ILogIn';
// import { TUserInformation } from '../shared/models/TUserInformation';

// import { userReducer } from './reducers/rootReducer';

// import { getAllUsers } from '../services/userService';
// import { fillUserInformation } from './actions/userAction';

// const userInformationInit: ILogIn = {
// 	uid: '',
// 	firtname: '',
// 	lastname: '',
// 	email: '',
// };

// export const UserInformationContext = createContext<IContext<ILogIn, TUserInformation> | null>(null);

// export function UserInformationProvider({ children }: { children: any }) {
// 	const [userInformation, dispatch] = useReducer(userReducer, userInformationInit);

// 	// useEffect(() => {
// 	// 	getAllUsers().then(users => {
// 	// 		const user: ILogIn | undefined = users.find(user => user.rut === 10569251);

// 	// 		dispatch(fillUserInformation(user));
// 	// 	});
// 	// }, []);

// 	return (
// 		<UserInformationContext.Provider value={{ ctx: userInformation, dispatch }}>
// 			{children}
// 		</UserInformationContext.Provider>
// 	);
// }
