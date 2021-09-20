import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { ROUTES } from '../constants/routes';

import { Home } from '../screens/home/Home';
import { LogIn } from '../screens/auth/LogIn';
import { Resume } from '../screens/resume/resume';
// import { Settings } from '../screens/settings/Settings';
import { PrivateRoute } from './PrivateRoute';

export const Router = () => {
	return (
		<HashRouter basename={process.env.PUBLIC_URL} hashType='slash'>
			<Box className='router-container'>
				<Box className='router-body'>
					<Switch>
						<PrivateRoute exact={true} path={ROUTES[1]} Component={Home} />
						<PrivateRoute exact={true} path={ROUTES[2]} Component={Resume} />
						<Route exact path={ROUTES[0]} component={LogIn} />
						{/* <Route exact path={Routes['/settings'].toString()} component={Settings} /> */}
						<Redirect to={ROUTES[0]}/> {/* TODO: CREATE PAGE NOT FOUND 404 */}
					</Switch>
				</Box>
			</Box>
		</HashRouter>
	);
};
