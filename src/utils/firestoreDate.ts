import firebase from 'firebase';

export function parseToFirestoreDateTime(date: string | number | Date) {
	return firebase.firestore.Timestamp.fromDate(new Date(date));
}

export function firestoreDateToDate(seconds: number) {
	return new Date(seconds * 1000);
}