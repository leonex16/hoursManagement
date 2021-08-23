import { Dispatch } from 'react';
import { IAction } from './IAction';

export interface IContext<ICtxInit, TAction> {
	ctx: ICtxInit;
	dispatch: Dispatch<IAction<TAction>>;
}
