import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Container, Stack } from "@material-ui/core"

import { logInContext } from "../../context/logInContext";

import { verifyAuthentication } from "../../utils/verifyAuthentication";

import { GoogleLogInIcon } from "../../components/GoogleLogInIcon";
import { createOrLogInUserWithGoogle } from "../../utils/createOrLogInUserWithGoogle";

export const LogIn = () => {
  const { userInformation, dispatch } = useContext(logInContext)!;
  const history = useHistory();

  const handleClick = async () => {
      const userAction = await createOrLogInUserWithGoogle();

      if( userAction === undefined) return;

      dispatch(userAction);
      verifyAuthentication(userAction.payload, history, '/');
  };

  useEffect(() => {
    verifyAuthentication(userInformation, history, '/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userInformation?.uid ])

  return (
    <Container style={{ height: 'calc(100% - 56px)' }}>
      <Stack style={{ transform: 'translate(0px, 56px)' }} minHeight={'100%'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
        <Button className='button-logIn' variant={'contained'} startIcon={<GoogleLogInIcon/>} onClick={handleClick}>
          Iniciar Sesión Con Google
        </Button>
      </Stack>
    </Container>
  )
}
