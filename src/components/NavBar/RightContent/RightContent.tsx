import React from 'react';

import AuthActions from './AuthActions/AuthActions';
import Avatar from './Avatar';

const RightContent = () => {
  return (
    <div className='flex items-center gap-x-1'>
      <AuthActions />
      <Avatar />
    </div>
  );
};

export default RightContent;
