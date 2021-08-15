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
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/lab';
import { useContext } from 'react';
import { calculateOvertime, inputChange, isFormValidated } from '../../context/actions/homeAction';
import { HomeFormContext } from '../../context/homeFormContext';
import { EOvertime } from '../../shared/models/EOvertime';
import { EShift } from '../../shared/models/EShift';
import { addDays } from '../../utils/addDays';

export const Home = () => {
	const { homeForm, dispatch } = useContext(HomeFormContext)!;
	console.log(homeForm)
	const handleChange = (evt: any) => {
		console.log(evt);
		
		dispatch(isFormValidated(homeForm.checkOut));
		dispatch(inputChange(evt));
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
							onChange={value =>
								handleChange({ target: { value, name: 'checkIn' } })
							}
							renderInput={params => <TextField {...params} />}
							maxDateTime={new Date()}
							ampm={false}
							inputFormat={"dd/MM/yyyy HH:mm"}
						/>
					</FormControl>
					<FormControl fullWidth>
						<DateTimePicker
							label='Hora de Salida'
							value={homeForm.checkOut}
							onChange={value =>
								handleChange({ target: { value, name: 'checkOut' } })
							}
							renderInput={params => <TextField {...params} />}
							minDateTime={homeForm.checkIn}
							maxDateTime={addDays(homeForm.checkIn as Date, 2)}
							disabled={homeForm.checkIn === null ? true : false}
							ampm={false}
							inputFormat={"dd/MM/yyyy HH:mm"}
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>
							Seleccione Turno
						</InputLabel>
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
						<Button variant='outlined' disabled={homeForm.isFormValidated} onClick={() => dispatch(calculateOvertime(homeForm))}>
							Calcular Horas
						</Button>
					</FormControl>
				</Stack>
				<Paper
					className={homeForm.overtimeQuant === -1 ? 'hidden' : ''}
					elevation={5}>
					<Stack component='form' spacing={2}>
						<Typography variant='h5' component='h5' align='center'>
							Has realizado
						</Typography>
						<Typography variant='h3' component='h3' align='center'>
							{homeForm.overtimeQuant}
							{/* {homeForm.overtimeQuant.toFixed(2)} */}
						</Typography>
						<Typography variant='h5' component='h5' align='center'>
							Horas Extras
						</Typography>
						<FormControl fullWidth>
							<Button variant='contained'>Guardar Horas</Button>
						</FormControl>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	);
};
