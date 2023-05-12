import React from 'react';
import Image from 'next/image';
import { Divider } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import bg from 'public/images/redditPersonalHome.png';
import avatar from 'public/images/snoo-home@2x.png';
import { communityModalState } from 'src/atoms';
import useCheckUser from 'src/hooks/useCheckUser';
import useDirectory from 'src/hooks/useDirectory';

import { ButtonBg } from '../common';

const PersonalHome = () => {
  const router = useRouter();
  const setOpenModal = useSetRecoilState(communityModalState);
  const { userSigned } = useCheckUser();
  const { toggleDirectoryOpenMenu } = useDirectory();

  const handleOpenCreatePost = () => {
    if (userSigned()) {
      if (!router.query?.communityId) {
        toggleDirectoryOpenMenu();
      } else {
        router.push(`/r/${router.query?.communityId}/submit`);
      }
    }
  };
  const handleOpenCreateCommunity = () => {
    setOpenModal({
      open: true,
    });
  };
  return (
    <div className='relative flex w-full grow flex-col overflow-hidden rounded bg-sections-paper'>
      {/* header */}
      <div className='absolute inset-x-0 top-0 min-h-[7vh]'>
        <Image src={bg} fill className='h-full object-cover' alt='bg' />
        <div className='h-full w-full bg-black opacity-40'></div>
      </div>
      <div className='px-3 py-2'>
        <div className='mb-3 mt-[3vh] flex items-center gap-x-3'>
          <Image
            src={avatar}
            className='z-[2]'
            width={40}
            height={68}
            alt='avatar'
          />
          <h3 className='mt-4 text-lg font-medium text-typo-primary'>Home</h3>
        </div>
        <p className=' text-typo-primary'>
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
        <Divider className='my-4 w-full border-divider' />
        <div className='flex w-full flex-col gap-y-3'>
          <ButtonBg color='orange' onClick={handleOpenCreatePost}>
            Create Post
          </ButtonBg>
          <ButtonBg
            color='blue'
            animation
            outline
            onClick={handleOpenCreateCommunity}
          >
            Create Community
          </ButtonBg>
        </div>
      </div>
    </div>
  );
};

export default PersonalHome;
