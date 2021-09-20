import { Dispatch } from "react";
import { IAction } from "./IAction";
import { IUserInformation } from "./IUserInformation";
import { TUserInformation } from "./TUserInformation";

export interface ILogInContext {
  userInformation: IUserInformation;
  dispatch: Dispatch<IAction<TUserInformation>>;
}