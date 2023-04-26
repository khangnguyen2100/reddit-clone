import { TextField } from '@mui/material';
import React, { useState } from 'react';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <TextField
        margin='dense'
        id='email'
        name='email'
        label='Email'
        variant='outlined'
        value={loginForm.email}
        onChange={onChange}
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        type='password'
        variant='outlined'
        value={loginForm.password}
        onChange={onChange}
      />
    </div>
  );
};

export default Login;
