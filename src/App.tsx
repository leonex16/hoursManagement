import { LocalizationProvider } from '@material-ui/lab';
import DateAdapter from '@material-ui/lab/AdapterDateFns';

import { HomeFormProvider } from './context/homeFormContext';
import { UserInformationProvider } from './context/userInformationContext';
import { Router } from './routes/router';

function App() {
	return (
		<>
			<LocalizationProvider dateAdapter={DateAdapter}>
				{
					<UserInformationProvider>
						<HomeFormProvider>
							<Router />
						</HomeFormProvider>
					</UserInformationProvider>
				}
			</LocalizationProvider>
		</>
	);
}

export default App;
