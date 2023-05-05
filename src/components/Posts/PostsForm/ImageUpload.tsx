/* eslint-disable no-unused-vars */
import Input from '@mui/material/Input';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Divider } from '@mui/material';

import { ButtonBg } from 'src/components/common';
import useConfirm from 'src/hooks/useConfirm';

type Props = {
  selectedFile?: string;
  setSelectedFile: (file: string) => void;
  onSelectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (title: string) => void;
};
function ImageUpload(props: Props) {
  const { onSelectedImage, setSelectedFile, setSelectedTab, selectedFile } =
    props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { ConfirmModal, confirmResult } = useConfirm({
    title: 'Delete Image',
    message: 'Are you sure you want to delete this image?',
  });
  const handleClearImage = async () => {
    const ans = await confirmResult();
    if (ans) {
      setSelectedFile('');
    }
  };
  return (
    <>
      <div className='flex-center h-full'>
        {selectedFile ? (
          <div className='flex-center h-full flex-col justify-between'>
            <div className='flex-center relative mt-2 max-h-[300px] overflow-hidden'>
              <Image
                src={selectedFile}
                width={580}
                height={250}
                alt='preview image'
                className='h-full object-contain'
                placeholder='blur'
                blurDataURL={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcfWS3DwAHBAKIktITrQAAAABJRU5ErkJggg=='
                }
              />
            </div>
            <Divider className='w-full border-divider' />
            <div className='flex-center mb-2 gap-x-3'>
              <ButtonBg
                color='blue'
                outline
                onClick={() => setSelectedTab('Post')}
              >
                Back To Post
              </ButtonBg>
              <ButtonBg color='blue' onClick={handleClearImage}>
                Remove
              </ButtonBg>
            </div>
          </div>
        ) : (
          <>
            <input
              type='file'
              onChange={onSelectedImage}
              ref={fileInputRef}
              className='invisible w-0'
            />
            <ButtonBg
              color='blue'
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </ButtonBg>
          </>
        )}
      </div>
      <ConfirmModal />
    </>
  );
}
export default ImageUpload;
