import React from 'react';
import { useRecoilValue } from 'recoil';

import { authModalState } from 'src/atoms';

import Login from './Login';
import SignUp from './SignUp';

const AuthInputs = () => {
  const authState = useRecoilValue(authModalState);
  return (
    <div>
      {authState.view === 'login' && <Login />}
      {authState.view === 'signup' && <SignUp />}
    </div>
  );
};

export default AuthInputs;
