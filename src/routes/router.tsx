import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { Home } from '../screens/home/Home';
import { Reports } from '../screens/reports/Reports';
// import { Settings } from '../screens/settings/Settings';
import React from 'react';
import { BottomNavbar } from '../components/BottomNavbar';

export enum Routes {
	'/',
	'/reports',
	'/settings',
}

export const Router = () => {
	return (
		<BrowserRouter>
		<Box className="router-container">
			<Box className="router-body">
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path={Routes['/reports'].toString()} component={Reports} />
					{/* <Route exact path={Routes['/settings'].toString()} component={Settings} /> */}
				</Switch>
			</Box>
			<Box data-bottom-navbar={true}>
				<BottomNavbar />
			</Box>
		</Box>
		</BrowserRouter>
	);
};
