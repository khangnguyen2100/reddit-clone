import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from 'src/firebase/clientApp';

import AuthActions from './AuthActions/AuthActions';
import DropDownMenu from './DropDownMenu';
import Icons from './Icons';

const RightContent = () => {
  const [user] = useAuthState(auth);

  return (
    <div className='flex items-center gap-x-1'>
      {!user && <AuthActions />}
      {user && <Icons />}
      <DropDownMenu />
    </div>
  );
};

export default RightContent;
