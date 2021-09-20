import { ThemeProvider, } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LocalizationProvider } from '@material-ui/lab';
import DateAdapter from '@material-ui/lab/AdapterDateFns';

import { LogInProvider } from './context/logInContext';
import { HomeFormProvider } from './context/homeFormContext';
import { Router } from './routes/router';
import { themeMode } from './styles/themes/themeMode';

function App() {
	return (
		<ThemeProvider theme={themeMode}>
			<CssBaseline>
				<LogInProvider>
					<LocalizationProvider dateAdapter={DateAdapter}>
							<HomeFormProvider>
								<Router />
							</HomeFormProvider>
					</LocalizationProvider>
				</LogInProvider>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;