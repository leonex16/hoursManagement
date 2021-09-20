import { db } from '../shared/config/firebase';
import { IUserInformation } from '../shared/models/IUserInformation';

const usersRef = db.collection('users');

// export async function getAllUsers(): Promise<IUserInformation[]> {
// 	const snapshot = await usersRef.get();
// 	const docs = snapshot.docs;

// 	return docs.map(doc => {
// 		const uid = doc.id;
// 		const user = { ...(doc.data() as IUserInformation), uid };

// 		return user;
// 	});
// }

export async function getUserByEmail(email: string) {
	const query = usersRef.where('email', '==', email.toUpperCase());
	const querySnap = await query.get();
	const user = querySnap.docs.length === 1
		? {...querySnap.docs[0].data(), uid: querySnap.docs[0].id} as IUserInformation
		: null;
	
	return user;
};

export async function createUser(user: IUserInformation) {
	const userWithoutUid: any = {...user};
	delete userWithoutUid.uid;
	const doc = await usersRef.add(userWithoutUid);

	return doc.id;
}
