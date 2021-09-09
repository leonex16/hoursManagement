import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { ROUTES } from '../constants/routes';

import { Home } from '../screens/home/Home';
import { Reports } from '../screens/reports/Reports';
// import { Settings } from '../screens/settings/Settings';
import { BottomNavbar } from '../components/BottomNavbar';

export const Router = () => {
	return (
		<HashRouter basename={process.env.PUBLIC_URL} hashType='slash'>
			<Box className='router-container'>
				<Box className='router-body'>
					<Switch>
						<Route exact path={ROUTES[0]} component={Home} />
						<Route exact path={ROUTES[1]} component={Reports} />
						{/* <Route exact path={Routes['/settings'].toString()} component={Settings} /> */}
						<Redirect to={ROUTES[0]}/>
					</Switch>
				</Box>
				<Box data-bottom-navbar={true}>
					<BottomNavbar />
				</Box>
			</Box>
		</HashRouter>
	);
};
