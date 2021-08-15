import { createContext, useReducer } from "react";

import { EOvertime } from "../shared/models/EOvertime";
import { EShift } from "../shared/models/EShift";
import { IHomeForm } from "../shared/models/IHomeForm";
import { IHomeFormContext } from "../shared/models/IHomeFormContext";

import { homeReducer } from "./reducers/rootReducer";

const homeFormInit: IHomeForm = {
  checkIn: null,
  checkOut: null,
  overtimeType: EOvertime.fifty,
  overtimeQuant: -1,
  shiftType: EShift['Mañana'],
	isFormValidated: false,
};

export const HomeFormContext = createContext<IHomeFormContext | null>(null);

export function HomeFormProvider({ children }: { children: any }) {
		const [homeForm, dispatch] = useReducer(homeReducer, homeFormInit);

  return (
    <HomeFormContext.Provider value={{homeForm, dispatch}}>
      { children }
    </HomeFormContext.Provider>
  );
}