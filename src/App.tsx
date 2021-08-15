import { LocalizationProvider } from '@material-ui/lab';
import DateAdapter from '@material-ui/lab/AdapterDateFns';
import { HomeFormProvider } from './context/homeFormContext';
import { Router } from './routes/router';

function App() {
	return <>
	    <LocalizationProvider dateAdapter={DateAdapter}>
				{
					<HomeFormProvider>
						<Router />
					</HomeFormProvider>
				}
			</LocalizationProvider>
	</>;
}

export default App;
