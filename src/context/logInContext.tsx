import { createContext, useReducer } from "react";

import { IUserInformation } from '../shared/models/IUserInformation';
import { ILogInContext } from "../shared/models/ILogInContext";

import { userReducer } from './reducers/rootReducer';

const logInInit: IUserInformation = {
  uid: '',
  firtname: '',
  lastname: '',
  email: '',
};

export const logInContext = createContext<ILogInContext | null>(null);

export function LogInProvider({ children }: { children: JSX.Element }) {
  const [ userInformation, dispatch ] = useReducer(userReducer, logInInit);

  return (
    <logInContext.Provider value={{ userInformation, dispatch }}>
      {children}
    </logInContext.Provider>
  );
}