import { db } from '../shared/config/firebase';
import { IDialHistory } from '../shared/models/IDialHistory';
import { IHomeForm } from '../shared/models/IHomeForm';

const usersRef = db.collection('users');

export async function getDialHistory(uid: string): Promise<IDialHistory[]> {
	const dialHistoryRef = usersRef.doc(uid).collection('dialHistory');
	const snapshot = await dialHistoryRef.get();
	const docs = snapshot.docs;

	return docs.map(doc => doc.data() as IDialHistory);
}

export async function addRecordsHours(uid: string, homeForm: IHomeForm) {
	try {
		const dialHistory: IDialHistory = {
			overtimeQuant: Number(homeForm.overtimeQuant),
			shiftType: Number(homeForm.shiftType),
			overtimeType: Number(homeForm.overtimeType),
			checkOut: homeForm.checkOut as Date,
			checkIn: homeForm.checkIn as Date,
		};
		const dialHistoryRef = usersRef.doc(uid).collection('dialHistory');
		await dialHistoryRef.add(dialHistory);

		return true;
	} catch (error) {
		console.log(`Error`);
		return false;
	}
}
