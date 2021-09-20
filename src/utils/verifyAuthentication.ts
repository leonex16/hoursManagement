import { ROUTES } from "../constants/routes";
import { IUserInformation } from "../shared/models/IUserInformation";
import { findIndxByRoutePath } from "./findIndxByRoutePath";

export function verifyAuthentication(userInformation: IUserInformation, history: any, pathProp: string) {
  const authIndx = findIndxByRoutePath('/auth');

  userInformation?.uid?.length === 0
    ? history.replace(ROUTES[authIndx])
    : history.push(pathProp);
}