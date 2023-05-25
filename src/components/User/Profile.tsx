import { Divider, Icon, Tooltip } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState, useEffect } from 'react';
import { RiUpload2Line } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';

import getUserDisplayName from '@/utils/getUserDisplayName';
import defaultAvatar from 'public/images/avatar-full.png';
import { db, storage } from 'src/firebase/clientApp';
import useCheckUser from 'src/hooks/useCheckUser';
import useDirectory from 'src/hooks/useDirectory';
import useSelectFile from 'src/hooks/useSelectFile';

import { ButtonBg } from '../common';

const Profile = () => {
  const router = useRouter();
  const { userSigned, user } = useCheckUser();
  const photoURL = useRef<string>('');
  const getUserAvatar = async () => {
    const userDocRef = doc(db, `users/${user?.uid}`);
    const userDoc = await getDoc(userDocRef);
    photoURL.current = userDoc.data()?.photoURL || '';
  };
  const { toggleDirectoryOpenMenu, setDirectoryState } = useDirectory();

  const handleOpenCreatePost = () => {
    if (userSigned()) {
      toggleDirectoryOpenMenu();
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onSelectedFile, selectedFile, setSelectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleUploadImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `users/${user?.uid}/avatar`);
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, `users/${user?.uid}`), {
        photoURL: downloadURL,
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    setSelectedFile('');
    setUploadingImage(false);
  };
  useEffect(() => {
    setDirectoryState(prev => ({
      ...prev,
      selectedMenuItem: {
        displayText: 'Profile',
        icon: CgProfile,
        link: 'user/profile',
      },
    }));
  }, [router.pathname]);

  // useEffect(() => {
  //   if (user) {
  //     getUserAvatar();
  //   }
  // }, [user]);

  return (
    <div className='relative flex w-full grow flex-col overflow-hidden rounded bg-sections-paper'>
      {/* header */}
      <div className='absolute inset-x-0 top-0 z-0  min-h-[15vh] bg-blue opacity-90'></div>
      <div className='px-3'>
        <div className='flex items-center gap-x-7'>
          <div className='flex-center relative mb-3 mt-[5vh] w-full flex-col'>
            {photoURL.current || selectedFile ? (
              <div className='flex-center relative h-[55px] w-[55px] overflow-hidden rounded-full shadow'>
                <Image
                  src={selectedFile || photoURL.current!}
                  alt={`${user?.email}-avatar`}
                  fill
                  className='rounded-full'
                />
              </div>
            ) : (
              <div className='flex-center overflow-hidden'>
                <Image
                  src={defaultAvatar}
                  className='z-[2]'
                  width={120}
                  height={160}
                  alt='avatar'
                />
              </div>
            )}
            <Tooltip
              title='Change Image'
              onClick={() => fileInputRef.current?.click()}
              className='absolute right-0 top-0 hidden cursor-pointer'
            >
              <Icon component={RiUpload2Line} className=' text-lg text-blue' />
            </Tooltip>
            <h3 className='mt-1 text-lg font-medium text-typo-primary'>
              {getUserDisplayName(user)}
            </h3>
            <p className='text-typo-secondary'>
              u/{user?.email?.split('@')[0]}
            </p>
          </div>
        </div>
        {selectedFile && (
          <div className='flex flex-col gap-x-1'>
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
        )}
        <Divider className='my-4 w-full border-divider' />
        <div className='mb-4 flex w-full flex-col gap-y-3'>
          <ButtonBg color='orange' onClick={handleOpenCreatePost}>
            Create Post
          </ButtonBg>
        </div>
      </div>
    </div>
  );
};

export default Profile;
