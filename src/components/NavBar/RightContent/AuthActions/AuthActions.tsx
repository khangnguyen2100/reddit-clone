import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AuthModalState, authModalState } from 'src/atoms';
import { ButtonBg } from 'src/components/common';
import { auth } from 'src/firebase/clientApp';

import AuthInputs from './AuthInputs';

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
  const [user] = useAuthState(auth);

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
  useEffect(() => {
    if (user) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  console.log('authModal:', authModal);

  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <ButtonBg
          onClick={() => handleClickOpen({ open: true, view: 'login' })}
          background='orange'
        >
          Log in
        </ButtonBg>
        <ButtonBg
          outline
          background='blue'
          onClick={() => handleClickOpen({ open: true, view: 'signup' })}
        >
          Sign Up
        </ButtonBg>
      </div>
      {/* modal */}
      <div>
        <Dialog
          open={authModal.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
          fullWidth
          maxWidth='xs'
          sx={{
            '& .MuiDialog-paper': {
              padding: '20px 45px',
            },
          }}
        >
          <DialogTitle className='text-center text-2xl font-semibold mb-5'>
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
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'></DialogContentText>
            <AuthInputs />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthActions;
