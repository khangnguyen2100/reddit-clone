import { SearchSharp } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const SearchInput = () => {
  return (
    <Box sx={{ maxWidth: '46.7%', width: '100%' }}>
      <TextField
        id='search-input'
        placeholder='Search Reddit'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchSharp sx={{ color: 'action.active', my: 0.5 }} />
            </InputAdornment>
          ),
        }}
        size='small'
        autoComplete='off'
        sx={{
          width: '100%',
          fontSize: '1.4rem',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '30px',
              fontSize: '1.4rem',
              border: '#ccc 1px solid',
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
    </Box>
  );
};

export default SearchInput;
