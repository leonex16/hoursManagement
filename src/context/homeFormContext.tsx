import { createContext, useReducer } from 'react';

import { EOvertime } from '../shared/models/EOvertime';
import { EShift } from '../shared/models/EShift';
import { IContext } from '../shared/models/IContext';
import { IHomeForm } from '../shared/models/IHomeForm';
import { THomeForm } from '../shared/models/THomeForm';

import { homeReducer } from './reducers/rootReducer';

export const homeFormInit: IHomeForm = {
	checkIn: null,
	checkOut: null,
	overtimeType: EOvertime.fifty,
	overtimeQuant: -1,
	shiftType: EShift['Mañana'],
	isFormValidated: false,
};

export const HomeFormContext = createContext<IContext<IHomeForm, THomeForm> | null>(null);

export function HomeFormProvider({ children }: { children: any }) {
	const [homeForm, dispatch] = useReducer(homeReducer, homeFormInit);

	return <HomeFormContext.Provider value={{ ctx: homeForm, dispatch }}>{children}</HomeFormContext.Provider>;
}
