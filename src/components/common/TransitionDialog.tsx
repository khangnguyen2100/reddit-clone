import { Dialog, Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';

type Props = {
  direction: 'up' | 'down' | 'left' | 'right';
  children: React.ReactElement;
  onClose: () => void;
  open: boolean;
};
const TransitionDialog = (propsDialog: Props) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide ref={ref} {...props} direction={propsDialog.direction} />;
  });
  return (
    <Dialog
      open={propsDialog.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={propsDialog.onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      {propsDialog.children}
    </Dialog>
  );
};

export default TransitionDialog;
