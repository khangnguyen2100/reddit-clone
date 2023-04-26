import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useRecoilState } from 'recoil';

import { AuthModalState, authModalState } from 'src/atoms';

import AuthInputs from './AuthInputs';
import Oauth from './Oauth';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AuthActions = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  const handleClickOpen = (payload: AuthModalState) => {
    setAuthModal(payload);
  };

  const handleClose = () => {
    setAuthModal({
      ...authModal,
      open: false,
    });
  };
  const renderTile = () => {
    if (authModal.view === 'login') return 'Log in';
    if (authModal.view === 'signup') return 'Sign Up';
    return 'Reset Password';
  };
  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <button
          className='btn btn-primary'
          onClick={() => handleClickOpen({ open: true, view: 'login' })}
        >
          Log in
        </button>
        <button
          className='btn btn-outline btn-primary'
          onClick={() => handleClickOpen({ open: true, view: 'signup' })}
        >
          Sign Up
        </button>
      </div>
      {/* modal */}
      <div>
        <Dialog
          open={authModal.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
          className='max-w-[700px]'
        >
          <DialogTitle>
            {renderTile()}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className='w-full'>
            <DialogContentText id='alert-dialog-slide-description'></DialogContentText>
            <Oauth />
            <AuthInputs />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthActions;
