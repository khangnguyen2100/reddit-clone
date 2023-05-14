import { Divider, Icon, Stack } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import millify from 'millify';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { FaBirthdayCake, FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';

import getUserDisplayName from '@/utils/getUserDisplayName';
import { Community, communityState } from 'src/atoms';
import { db, storage } from 'src/firebase/clientApp';
import useCheckUser from 'src/hooks/useCheckUser';
import useCommunityData from 'src/hooks/useCommunityData';
import useSelectFile from 'src/hooks/useSelectFile';

import { ButtonBg } from '../common';

const About = () => {
  const { user } = useCheckUser();
  const router = useRouter();
  const { communityStateValue } = useCommunityData();
  const communityData = communityStateValue.currentCommunity as Community;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onSelectedFile, selectedFile, setSelectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const setCommunityValue = useSetRecoilState(communityState);
  const handleUploadImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData?.id}/image`);
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'communities', communityData?.id), {
        imageURL: downloadURL,
      });
      setCommunityValue(prev => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    setSelectedFile('');
    setUploadingImage(false);
  };
  const checkUserSigned = async () => {
    const userDocRef = doc(
      db,
      `users/${user?.uid!}/communitySnippets`,
      communityData?.id,
    );
    const userDoc = await getDoc(userDocRef);
    const userDocData = userDoc.data();

    if (!user) {
      enqueueSnackbar('Please sign in to create a post', {
        variant: 'info',
      });
      return;
    }
    if (!userDocData) {
      enqueueSnackbar('Join this community to create a post', {
        variant: 'info',
      });
      return;
    }
    router.push(`/r/${communityData?.id}/submit`);
  };
  return (
    <div className='sticky top-3 '>
      <div className='flex-center justify-between rounded-r rounded-t bg-blue p-3 text-white'>
        <h3 className='text-xs font-bold'>About Community</h3>
        <Icon component={HiOutlineDotsHorizontal} />
      </div>
      <div className='flex flex-col rounded-b rounded-l bg-sections-paper p-3'>
        <Stack className='p-2' spacing={1.5}>
          {/*members */}
          <div className='flex w-full text-xs font-bold'>
            <h4 className=' font-medium'>
              <span className='text-base font-bold'>
                {millify(communityData?.numberOfMembers || 0)}
              </span>{' '}
              Members
            </h4>
          </div>
          <Divider />
          {/* created community */}
          <div className='flex w-full items-center text-center font-medium'>
            <Icon
              component={FaBirthdayCake}
              className='mr-4 text-[20px] text-blue mdd:mr-2'
            />
            {communityData?.createAt && (
              <p className='text-typo-secondary'>
                Created{' '}
                {moment(
                  new Date(communityData?.createAt.seconds * 1000),
                ).format('MMM DD, YYYY')}
              </p>
            )}
          </div>
          <Divider />
          {/* creator */}
          <div className='flex w-full text-xs'>
            <h4 className=''>
              This community is created by{' '}
              <span className='font-medium'>
                u/{user?.displayName || getUserDisplayName(user)}
              </span>
            </h4>
          </div>
          {/* create post button */}
          <Divider />
          <div
            // href={`/r/${communityData?.id}/submit`}
            className='w-full'
            onClick={checkUserSigned}
          >
            <ButtonBg color='blue' className='w-full px-0'>
              Create Post
            </ButtonBg>
          </div>
          {user?.uid === communityData?.creatorId && (
            <>
              <Divider />
              <div className='flex flex-col gap-x-1'>
                <p className='font-semibold'>Admin</p>
                <div className='flex-center justify-between'>
                  <p
                    className='cursor-pointer text-blue hover:underline'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Image
                  </p>
                  {communityData?.imageURL || selectedFile ? (
                    <div className='flex-center relative h-10  w-10 overflow-hidden rounded-full'>
                      <Image
                        src={selectedFile || communityData?.imageURL!}
                        alt={`${communityData?.id}-avatar`}
                        fill
                        className='rounded-full'
                      />
                    </div>
                  ) : (
                    <div>
                      <Icon
                        component={FaReddit}
                        className='rounded-full text-[40px] text-blue'
                      />
                    </div>
                  )}
                </div>
                {selectedFile && (
                  <div className='flex-center mt-5 justify-start gap-x-3'>
                    <ButtonBg
                      color='blue'
                      outline
                      onClick={() => setSelectedFile('')}
                    >
                      Cancel
                    </ButtonBg>
                    <ButtonBg
                      color='blue'
                      onClick={handleUploadImage}
                      loading={uploadingImage}
                    >
                      Save Change
                    </ButtonBg>
                  </div>
                )}
                <input
                  type='file'
                  onChange={onSelectedFile}
                  ref={fileInputRef}
                  className='invisible w-0'
                />
              </div>
            </>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default About;
