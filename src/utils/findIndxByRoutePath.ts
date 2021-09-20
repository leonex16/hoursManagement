import { ROUTES } from "../constants/routes";

export function findIndxByRoutePath(routeStr: string) {
  const routeIndx = ROUTES.findIndex(routeElem => routeElem.toLowerCase() === routeStr.toLowerCase());
  if ( routeIndx === -1 ) throw new Error(`ROUTE ${routeStr.toLowerCase()} NOT FOUND`);
  return routeIndx;	
}