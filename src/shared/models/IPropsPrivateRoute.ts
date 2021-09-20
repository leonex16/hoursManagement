import { ComponentType } from "react";

export interface IPropsPrivateRoute {
  exact: boolean;
  path: string;
  Component: ComponentType<JSX.Element>;
}