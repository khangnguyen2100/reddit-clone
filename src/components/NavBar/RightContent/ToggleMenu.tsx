import React from 'react';
import {
  Avatar as Ava,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { auth } from 'src/firebase/clientApp';
import { authModalState } from 'src/atoms';
const settings = ['Profile', 'Account', 'Dashboard'];

const ToggleMenu = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [signOut] = useSignOut(auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    signOut();
    handleCloseUserMenu();
    setAuthModal(prev => ({ ...prev, open: false }));
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Ava alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign='center'>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ToggleMenu;
