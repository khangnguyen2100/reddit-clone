import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Icon,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { TiHome } from 'react-icons/ti';

import Communities from './Communities';

const Directory = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box className='relative w-[17vw] mdd:w-auto' sx={{ flexGrow: 0 }}>
      <Tooltip title=''>
        <IconButton
          className={clsx(
            'flex w-full items-center justify-between rounded border border-solid border-transparent px-[15px] py-[6px] hover:border-divider active:border-divider',
            Boolean(anchorElUser) && '!border-divider',
          )}
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Icon className='flex flex-1 items-center gap-x-1' component={Box}>
            <TiHome className='mr-[10px] text-typo-primary' fontSize={20} />
            <Typography
              variant='h4'
              className='text-xs font-medium text-typo-primary'
            >
              Home
            </Typography>
          </Icon>
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        sx={{
          mt: '35px',
          '& .MuiMenu-paper': {
            width: '100%',
            maxWidth: '17vw',
          },
        }}
      >
        {/* <MenuItem className='w-full'>
          <CgProfile className='mr-[10px] text-typo-primary' fontSize={20} />
          <Typography
            className='font-medium text-typo-primary'
            textAlign='center'
          >
            Profile
          </Typography>
        </MenuItem> */}
        <Communities />
      </Menu>
    </Box>
  );
};

export default Directory;
