// LIBRARIES
import {
	Container,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Stack,
	Radio,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Paper,
	Typography,
	Snackbar,
	Alert,
	Slide,
	Backdrop,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/lab';
import { useContext, useState } from 'react';

// CONTEXTS
import { HomeFormContext } from '../../context/homeFormContext';
import { UserInformationContext } from '../../context/userInformationContext';

// SERVICES
import { addRecordsHours } from '../../services/recordsHoursService';

// FUNCTIONS
import { addDays } from '../../utils/addDays';
import { calculateOvertime, inputChange, isFormValidated, resetForm } from '../../context/actions/homeAction';
import { generateMessageAlert } from '../../utils/generateMessageAlert';

// MODELS
import { ISnackbarAlert } from '../../shared/models/ISnackbarAlert';
import { EOvertime } from '../../shared/models/EOvertime';
import { EShift } from '../../shared/models/EShift';

// OTHERS
import { LoadingIcon } from '../../components/LoadingIcon';

export const Home = () => {
	const snackbarAlertInit: ISnackbarAlert = {
		open: false,
		message: '',
		autoHideDuration: 3000,
		severity: 'success',
		anchorOrigin: { vertical: 'top', horizontal: 'center' },
		onClose: () => setSnackbarAlert({ ...snackbarAlert, open: false }),
		TransitionComponent: (props: any) => <Slide {...props} direction='down' />,
	};

	const { ctx: homeForm, dispatch: dispatchHomeForm } = useContext(HomeFormContext)!;
	const { ctx: userInformation } = useContext(UserInformationContext)!;
	const [snackbarAlert, setSnackbarAlert] = useState(snackbarAlertInit);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (evt: any) => {
		dispatchHomeForm(inputChange(evt));
		dispatchHomeForm(isFormValidated(null));
	};

	const showOvertimeDone = () => {
		const homeFormTemp = { ...homeForm, overtimeQuant: calculateOvertime(homeForm).payload ?? -1 };
		const alertContent = generateMessageAlert(homeFormTemp);

		dispatchHomeForm(calculateOvertime(homeFormTemp));
		dispatchHomeForm(isFormValidated(homeFormTemp));

		if (alertContent.severity === 'error') setSnackbarAlert({ ...snackbarAlert, ...alertContent });
	};

	const saveRecord = async () => {
		setIsLoading(true);
		const alertContent = generateMessageAlert(homeForm);

		if (alertContent.severity === 'success') {
			const isSavedRecord = await addRecordsHours(userInformation.uid, homeForm);

			if (isSavedRecord === true) dispatchHomeForm(resetForm());
		}

		setSnackbarAlert({ ...snackbarAlert, ...alertContent });
		setIsLoading(false);
	};

	return (
		<Container className='main-container'>
			<Stack component='article' spacing={3}>
				<Stack component='form' spacing={3}>
					<FormControl fullWidth component='fieldset'>
						<FormLabel component='legend'>Hora extra realizada:</FormLabel>
						<RadioGroup
							className='flex-container-evenly'
							value={Number(homeForm.overtimeType)}
							row
							onChange={handleChange}
							aria-label='Hora extra realizada:'
							name='Hora extra realizada:'
							defaultValue='top'>
							<FormControlLabel
								name='overtimeType'
								value={EOvertime.fifty}
								control={<Radio />}
								label='50%'
								labelPlacement='top'
							/>
							<FormControlLabel
								name='overtimeType'
								value={EOvertime.oneHundred}
								control={<Radio />}
								label='100%'
								labelPlacement='top'
							/>
						</RadioGroup>
					</FormControl>
					<FormControl fullWidth>
						<DateTimePicker
							label='Hora de Entrada'
							value={homeForm.checkIn}
							onChange={value => handleChange({ target: { value, name: 'checkIn' } })}
							renderInput={params => <TextField {...params} />}
							// maxDateTime={new Date()}
							minutesStep={15}
							ampm={false}
							inputFormat={'dd/MM/yyyy HH:mm:ss'}
						/>
					</FormControl>
					<FormControl fullWidth>
						<DateTimePicker
							label='Hora de Salida'
							value={homeForm.checkOut}
							onChange={value => handleChange({ target: { value, name: 'checkOut' } })}
							renderInput={params => <TextField {...params} />}
							minDateTime={homeForm.checkIn}
							maxDateTime={addDays(homeForm.checkIn as Date, 2)}
							minutesStep={15}
							ampm={false}
							inputFormat={'dd/MM/yyyy HH:mm:ss'}
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Seleccione Turno</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={Number(homeForm.shiftType)}
							label='Seleccione Turno'
							name={'shiftType'}
							onChange={handleChange}>
							<MenuItem value={EShift['Mañana']}>{EShift[0]}</MenuItem>
							<MenuItem value={EShift['Tarde']}>{EShift[1]}</MenuItem>
							<MenuItem value={EShift['Noche']}>{EShift[2]}</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<Button variant='outlined' onClick={showOvertimeDone}>
							Calcular Horas
						</Button>
					</FormControl>
				</Stack>
				<Paper className={`${homeForm.isFormValidated === false && 'hidden'}`} elevation={5}>
					<Stack component='form' spacing={2}>
						<Typography variant='h5' component='h5' align='center'>
							Has realizado
						</Typography>
						<Typography variant='h3' component='h3' align='center'>
							{homeForm.overtimeQuant}
						</Typography>
						<Typography variant='h5' component='h5' align='center'>
							Horas Extras
						</Typography>
						<FormControl fullWidth>
							<Button variant='contained' onClick={saveRecord}>
								Guardar Horas
							</Button>
						</FormControl>
					</Stack>
				</Paper>
			</Stack>
			<Snackbar {...snackbarAlert}>
				<Alert severity={snackbarAlert.severity} variant='filled' sx={{ width: '100%' }}>
					{snackbarAlert.message}
				</Alert>
			</Snackbar>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
				<LoadingIcon />
			</Backdrop>
		</Container>
	);
};
