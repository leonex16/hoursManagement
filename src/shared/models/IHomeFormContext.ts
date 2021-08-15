import { Dispatch } from "react";
import { IAction } from "./IAction";
import { IHomeForm } from "./IHomeForm";
import { THomeForm } from "./THomeForm";

export interface IHomeFormContext {
	homeForm: IHomeForm, dispatch: Dispatch<IAction<THomeForm>>
}