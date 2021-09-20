import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
// import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import { ROUTES } from '../constants/routes';
import { findIndxByRoutePath } from '../utils/findIndxByRoutePath';

export const BottomNavbar = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const history = useHistory();

	const handleChange = (_: any, indx: number) => {
		setCurrentPage(indx);
		history.push(ROUTES[indx]);
	};

	useEffect(() => {
		const currentPath = history.location.pathname;
		const routeIndx = findIndxByRoutePath(currentPath);
		setCurrentPage(routeIndx);
	}, [history.location.pathname]);

	return (
		<Container disableGutters>
			<BottomNavigation value={currentPage} onChange={handleChange}>
				<BottomNavigationAction value={findIndxByRoutePath('/')} label='Inicio' icon={<HomeRoundedIcon />} />
				<BottomNavigationAction value={findIndxByRoutePath('/resume')} label='Resumen' icon={<AssessmentRoundedIcon />} />
				{/* <BottomNavigationAction label ='Ajustes' icon={<SettingsRoundedIcon />} /> */}
			</BottomNavigation>
		</Container>
	);
};
