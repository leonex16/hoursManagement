import { Container, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
// import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const BottomNavbar = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const history = useHistory();

	const handleChange = (_: any, indx: number) => {
		setCurrentPage(indx);
		history.push(ROUTES[indx]);
	};

	return (
		<Container disableGutters>
			<BottomNavigation value={currentPage} onChange={handleChange}>
				<BottomNavigationAction label='Inicio' icon={<HomeRoundedIcon />} />
				<BottomNavigationAction label='Reportes' icon={<AssessmentRoundedIcon />} />
				{/* <BottomNavigationAction label ='Ajustes' icon={<SettingsRoundedIcon />} /> */}
			</BottomNavigation>
		</Container>
	);
};
