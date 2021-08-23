import firebase from 'firebase';

export function parseToFirestoreDateTime(date: string | number | Date) {
	return firebase.firestore.Timestamp.fromDate(new Date(date));
}
