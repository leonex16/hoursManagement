import firebase from 'firebase';

import { IAction } from '../../shared/models/IAction';
import { IFirebaseAuthProfile } from '../../shared/models/IFirebaseAuthProfile';
import { IUserInformation } from '../../shared/models/IUserInformation';
import { TUserInformation } from '../../shared/models/TUserInformation';

export function fillUserInformation(user: firebase.auth.UserCredential | IUserInformation) {
	if ( Object.keys(user).includes('uid') ) return { type: 'FILL_INFORMATION', payload: user } as IAction<TUserInformation>;

	const action: IAction<TUserInformation> = { type: 'NOT_ACTION', payload: null };
	const additionalUserInfo = (user as firebase.auth.UserCredential).additionalUserInfo;
	
	if ( additionalUserInfo?.profile === undefined || additionalUserInfo?.profile === null ) {
		console.error('NOT FOUND USER INFORMATION');
		return action;
	};

	const profile = additionalUserInfo.profile  as IFirebaseAuthProfile;

	for ( const key in profile ) {
		if ( (profile as any)[key] === undefined ) {
			console.error(`PROPERTY ${key.toUpperCase()} IS UNDEFINED`);
			return action;
		};
	};

	const payload: IUserInformation = {
		uid: profile.id,
		email: profile.email.toUpperCase(),
		firtname: profile.given_name.toUpperCase(),
		lastname: profile.family_name.toUpperCase()
	}
	
	action.type = 'FILL_INFORMATION';
	action.payload = payload;
	
	return action;
}
