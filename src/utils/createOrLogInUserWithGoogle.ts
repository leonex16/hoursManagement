import { errorMessages } from "../constants/errorMessages";
import { fillUserInformation } from "../context/actions/userAction";
import { createUser, getUserByEmail } from "../services/userService";
import { googleAuth } from "../shared/config/firebase";

import { IAction } from "../shared/models/IAction";
import { TUserInformation } from "../shared/models/TUserInformation";

export async function createOrLogInUserWithGoogle() {
  try {
    const userCredential = await googleAuth();
    const userEmail = userCredential?.user?.email ?? '';
    const user = await getUserByEmail(userEmail);

    if( user === null ) {
      const action = fillUserInformation(userCredential);
      const userUid = await createUser(action.payload);
      
      action.payload.uid = userUid;
      
      return action;
    };

    return { type: 'FILL_INFORMATION', payload: user } as IAction<TUserInformation>;
  } catch (error) {
    if( errorMessages[(error as any)?.code] !== undefined ) {
      console.error(errorMessages[(error as any)?.code])
    }
    console.error(error)
  }
};