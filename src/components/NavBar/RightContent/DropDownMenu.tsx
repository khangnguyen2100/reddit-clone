import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineEye } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { IoSparkles } from 'react-icons/io5';
import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import clsx from 'clsx';

import { authModalState, communityState, uiSettingState } from 'src/atoms';
import { auth } from 'src/firebase/clientApp';
import avatarSrc from 'public/images/avatar.png';
const DropDownMenu = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [themeMode, setThemeMode] = useRecoilState(uiSettingState);
  const [user] = useAuthState(auth);
  const resetCommunityState = useResetRecoilState(communityState);

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
    resetCommunityState();
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton
          className={clsx(
            'std:[10px] flex items-center rounded border border-solid border-transparent px-[15px] py-[6px] hover:border-divider active:border-divider std:py-[4px]',
            Boolean(anchorElUser) && '!border-divider',
          )}
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          {user && (
            <div className='flex-center mr-[4vw] gap-x-1 std:mr-[2vw]'>
              {/* avatar */}
              <Image src={avatarSrc} width={31} height={31} alt='name' />
              {/* name */}
              <div className='flex flex-col items-start gap-y-[2px]'>
                <Typography
                  variant='h4'
                  className='text-xs font-medium text-typo-primary'
                >
                  {user?.displayName || user.email?.split('@')[0]}
                </Typography>
                <div className='flex items-center gap-x-[2px]'>
                  <IoSparkles fontSize={'12px'} color='#ff4500' />
                  <Typography
                    variant='h5'
                    className='text-xs font-medium text-typo-secondary'
                  >
                    1 Karma
                  </Typography>
                </div>
              </div>
            </div>
          )}
          {!user && <PersonOutlineIcon />}
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '35px' }}
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
        {user && (
          <>
            <MenuItem>
              <CgProfile
                className='mr-[10px] text-typo-primary'
                fontSize={20}
              />
              <Typography
                className='font-medium text-typo-primary'
                textAlign='center'
              >
                Profile
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <AiOutlineEye
                className='mr-[10px] text-typo-primary'
                fontSize={20}
              />
              <Typography
                className='mr-[10px] font-medium text-typo-primary'
                textAlign='center'
              >
                Dark Mode
              </Typography>
              <Switch
                checked={themeMode.themeMode === 'dark'}
                onChange={() =>
                  setThemeMode(prev => ({
                    ...prev,
                    themeMode: prev.themeMode === 'light' ? 'dark' : 'light',
                  }))
                }
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <FiLogOut className='mr-[10px] text-typo-primary' fontSize={20} />
              <Typography
                className='font-medium text-typo-primary'
                textAlign='center'
              >
                Log Out
              </Typography>
            </MenuItem>
          </>
        )}
        {!user && (
          <MenuItem onClick={() => setAuthModal({ open: true, view: 'login' })}>
            <FiLogIn className='mr-[10px] text-typo-primary' fontSize={20} />
            <Typography
              className='font-medium text-typo-primary'
              textAlign='center'
            >
              Log In / Sign Up
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default DropDownMenu;
