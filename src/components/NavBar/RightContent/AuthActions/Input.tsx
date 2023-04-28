import { TextField } from '@mui/material';
import React from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

const Input = (props: TextFieldProps) => {
  const inputClass = 'w-full shadow-sm';

  return (
    <TextField
      variant='outlined'
      fullWidth
      className={inputClass}
      size='small'
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: '30px',
        },
      }}
      {...props}
    />
  );
};

export default Input;
