import React from 'react';

import AuthActions from './AuthActions/AuthActions';
import ToggleMenu from './ToggleMenu';

const RightContent = () => {
  return (
    <div className='flex items-center gap-x-1'>
      <AuthActions />
      <ToggleMenu />
    </div>
  );
};

export default RightContent;
