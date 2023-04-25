import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useRecoilState } from 'recoil';

import { authModalState, AuthModalState } from 'src/atoms';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
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
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <button
          className="btn btn-primary"
          onClick={() => handleClickOpen({ open: true, view: 'login' })}
        >
          Log in
        </button>
        <button
          className="btn btn-outline btn-primary"
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
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
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
