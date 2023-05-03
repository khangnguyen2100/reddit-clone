import { Divider, TextField } from '@mui/material';
import React from 'react';

import { ButtonBg } from 'src/components/common';

type Props = {
  textInputs: {
    title: string;
    body: string;
  };
  // eslint-disable-next-line no-unused-vars
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  loading: boolean;
  disabled?: boolean;
};

const TextInputs = (props: Props) => {
  const { textInputs, onTextChange, loading, onSave, disabled } = props;
  return (
    <div>
      {/* inputs */}
      <div className='mt-4 flex w-full flex-col gap-y-2 px-4'>
        <TextField
          className='w-full'
          placeholder='Title'
          name='title'
          variant='outlined'
          value={textInputs.title}
          onChange={onTextChange}
          classes={{
            root: 'bg-sections-paper',
          }}
          sx={{
            width: '100%',
            fontSize: '1.4rem',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                fontSize: '1.4rem',
                border: '#ccc 1px solid',
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              },
              '&:hover fieldset': {
                borderColor: 'secondary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
        />
        <TextField
          className='w-full'
          name='body'
          placeholder='Text (optional)'
          multiline
          variant='outlined'
          value={textInputs.body}
          onChange={onTextChange}
          classes={{
            root: 'bg-sections-paper h-[140px]',
          }}
          sx={{
            width: '100%',
            fontSize: '1.4rem',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                fontSize: '1.4rem',
                border: '#ccc 1px solid',
                height: '140px',
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
              },
              '&:hover fieldset': {
                borderColor: 'secondary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
        />
        <Divider />
      </div>
      {/* actions */}
      <div className='mt-4 flex w-full justify-end px-4'>
        <ButtonBg
          onClick={onSave}
          loading={loading}
          color='blue'
          disabled={disabled}
        >
          Post
        </ButtonBg>
      </div>
    </div>
  );
};

export default TextInputs;
