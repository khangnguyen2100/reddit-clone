import { useSetRecoilState } from 'recoil';

import { communityModalState } from 'src/atoms';

import { ButtonBg } from '../common';

const NotFound = () => {
  const setState = useSetRecoilState(communityModalState);
  return (
    <div className='flex-center mt-[15vw] flex-col gap-y-4 text-center font-ibm font-medium text-typo-primary '>
      <h3 className='font-ibm text-lg'>
        Sorry, there aren’t any communities on Reddit with that name.
      </h3>
      <p className=''>
        This community may have been banned or the community name is incorrect.
      </p>
      <div className='flex-center mt-6 gap-x-2'>
        <ButtonBg
          color='blue'
          outline
          onClick={() => {
            setState({
              open: true,
            });
          }}
        >
          Create Community
        </ButtonBg>
        <ButtonBg href='/' color='blue'>
          Create Community
        </ButtonBg>
      </div>
    </div>
  );
};

export default NotFound;
