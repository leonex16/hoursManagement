import { IHomeForm } from '../shared/models/IHomeForm';
import { ISnackbarAlert } from '../shared/models/ISnackbarAlert';

export function generateMessageAlert(homeForm: IHomeForm) {
	const { checkOut, overtimeQuant } = homeForm;
	const snackbarAlert: ISnackbarAlert = {
		open: true,
		message: '',
		severity: '' as any,
	};

	switch (true) {
		case checkOut === null:
			snackbarAlert.message = 'Debes ingresar hora de salida 🥺'; // U+1F97A - 0xF97A
			snackbarAlert.severity = 'error';
			break;
		case overtimeQuant < 0:
			snackbarAlert.message = 'Hora de entrada o salida no válidas 😟'; // U+1F61F - 0xF61F
			snackbarAlert.severity = 'error';
			break;
		default:
			snackbarAlert.message = 'Horas Guardadas 😎'; // U+1F60E - 0xF60E
			snackbarAlert.severity = 'success';
	}

	return snackbarAlert;
}
