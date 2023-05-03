/* eslint-disable no-unused-vars */
import Input from '@mui/material/Input';
import React, { useRef } from 'react';
import Image from 'next/image';

import { ButtonBg } from 'src/components/common';

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
  return (
    <div className='flex-center h-full'>
      {selectedFile ? (
        <div className='flex-center h-full flex-col'>
          <Image
            src={selectedFile}
            alt='preview'
            width={400}
            height={250}
            className='mb-4 object-cover'
          />
          <div className='flex-center gap-x-3'>
            <ButtonBg
              color='blue'
              outline
              onClick={() => setSelectedTab('Post')}
            >
              Back To Post
            </ButtonBg>
            <ButtonBg color='blue' onClick={() => setSelectedFile('')}>
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
          <ButtonBg color='blue' onClick={() => fileInputRef.current?.click()}>
            Upload
          </ButtonBg>
        </>
      )}
    </div>
  );
}
export default ImageUpload;
