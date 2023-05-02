import React from 'react';

import { ButtonBg } from '../common';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className='flex-center flex-col gap-y-4 text-center font-ibm font-medium text-typo-primary '>
      <h3 className='text-lg'>
        Sorry, there aren’t any communities on Reddit with that name.
      </h3>
      <p className=''>
        This community may have been banned or the community name is incorrect.
      </p>
      <div className='flex-center mt-6 gap-x-2'>
        <ButtonBg color='blue' outline>
          Create Community
        </ButtonBg>
        <ButtonBg color='blue'>Create Community</ButtonBg>
      </div>
    </div>
  );
};

export default NotFound;
