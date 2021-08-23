import { db } from '../shared/config/firebase';
import { IUserInformation } from '../shared/models/IUserInformation';

const usersRef = db.collection('users');

export async function getAllUsers(): Promise<IUserInformation[]> {
	const snapshot = await usersRef.get();
	const docs = snapshot.docs;

	return docs.map(doc => {
		const uid = doc.id;
		const user = { ...(doc.data() as IUserInformation), uid };

		return user;
	});
}

export async function getUserById(uid: string) {
	const snapshot = await usersRef.doc(uid);
	const doc = await snapshot.get();

	return doc.data();
}
