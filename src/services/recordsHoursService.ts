import { db } from '../shared/config/firebase';
import { IDialHistory } from '../shared/models/IDialHistory';
import { IHomeForm } from '../shared/models/IHomeForm';
import { parseToFirestoreDateTime } from '../utils/parseToFirestoreDateTime';

const usersRef = db.collection('users');

export async function getDialHistory(uid: string): Promise<IDialHistory[]> {
	const dialHistoryRef = usersRef.doc(uid).collection('dialHistory');
	const snapshot = await dialHistoryRef.get();
	const docs = snapshot.docs;

	return docs.map(doc => doc.data() as IDialHistory);
}

export async function addRecordsHours(uid: string, homeForm: IHomeForm | any) {
	try {
		delete homeForm.isFormValidated;
		const dialHistory: IDialHistory = homeForm as IDialHistory;
		const dialHistoryRef = usersRef.doc(uid).collection('dialHistory');
		const response = await dialHistoryRef.add(dialHistory);
		console.log((await response.get()).data());

		response.delete();

		return true;
	} catch (error) {
		console.log(`Error`);
		return false;
	}
}
