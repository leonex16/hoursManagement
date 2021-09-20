import { useContext, useEffect } from "react"
import { Route, Redirect, useHistory} from 'react-router-dom';
import { Box } from "@material-ui/system";

import { logInContext } from "../context/logInContext"

import { IPropsPrivateRoute } from "../shared/models/IPropsPrivateRoute";

import { ROUTES } from "../constants/routes";

import { BottomNavbar } from "../components/BottomNavbar";
import { verifyAuthentication } from "../utils/verifyAuthentication";

export const PrivateRoute = (props: IPropsPrivateRoute) => {
  const { userInformation } = useContext(logInContext)!;
  const { exact, path, Component } = props;
  const history = useHistory();

  useEffect(() => {
    verifyAuthentication(userInformation, history, path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userInformation?.uid ])

  return (
    userInformation?.uid?.length ===   0
      ? <Redirect to={ROUTES[ 0 ]} />
      : (
        <Box>
          <Box>
            <Route exact={exact} path={path} component={(defaultProps: any) => <Component {...defaultProps} />} />
          </Box>

          <Box data-bottom-navbar={true}>
            <BottomNavbar />
          </Box>
        </Box>
      )
  )

}
