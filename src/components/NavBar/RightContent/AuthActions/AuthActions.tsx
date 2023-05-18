import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Typography,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

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
  const renderTitle = () => {
    if (authModal.view === 'login') return 'Log in';
    if (authModal.view === 'signup') return 'Sign Up';
    return 'Reset your Password';
  };
  const renderDesc = () => {
    if (authModal.view === 'resetPassword')
      return 'Tell us the email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.';
    return 'By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.';
  };

  useEffect(() => {
    if (user) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <ButtonBg
          onClick={() => handleClickOpen({ open: true, view: 'login' })}
          color='orange'
          animation
          className='!px-10'
        >
          Log in
        </ButtonBg>
        <ButtonBg
          outline
          color='blue'
          animation
          className='!px-10'
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
              padding: '10px 45px',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            },
            // make the dialog full screen and center the content inside vertically
          }}
        >
          <div className='flex-center h-fit flex-col'>
            <div className='mb-2'>
              <Typography variant='h4' className='text-xl font-medium'>
                {renderTitle()}
              </Typography>
              <Typography className='mt-2 font-noto text-xs'>
                {renderDesc()}
              </Typography>
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
            </div>
            <DialogContent className='w-full'>
              <AuthInputs key={authModal.open + ''} />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthActions;
