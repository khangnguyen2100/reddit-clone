import { Box, Icon, IconButton, Menu, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

import useDirectory from 'src/hooks/useDirectory';

import Communities from './Communities';

const Directory = () => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const { directoryState, openDirectoryMenu, closeDirectoryMenu } =
    useDirectory();

  return (
    <div className='relative w-[260px] mobile:w-auto'>
      <IconButton
        className={clsx(
          'flex w-full items-center justify-between rounded border border-solid border-transparent px-[15px] py-[6px] hover:border-divider active:border-divider',
          directoryState.isOpen && '!border-divider',
        )}
        component={Box}
        onClick={openDirectoryMenu}
        ref={buttonRef}
      >
        <div className='flex flex-1 items-center gap-x-1'>
          {directoryState.selectedMenuItem.imageURL ? (
            <div className='relative mr-[10px] h-5 w-5 overflow-hidden rounded-full'>
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt={`${directoryState.selectedMenuItem.displayText}-avatar`}
                fill
              />
            </div>
          ) : (
            <Icon
              component={directoryState.selectedMenuItem.icon}
              className={clsx(
                'mr-[10px] text-[20px]',
                directoryState.selectedMenuItem.link === '/'
                  ? 'text-typo-primary'
                  : 'text-blue',
              )}
            />
          )}
          <Typography
            variant='h4'
            className='text-xs font-medium text-typo-primary mobile:hidden'
          >
            {directoryState.selectedMenuItem.displayText}
          </Typography>
        </div>
        <Icon component={MdExpandMore} className='text-2xl text-typo-primary' />
      </IconButton>
      <Menu
        anchorEl={directoryState.isOpen ? buttonRef.current : null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={directoryState.isOpen}
        onClose={closeDirectoryMenu}
        sx={{
          mt: '35px',
          '& .MuiMenu-paper': {
            width: '100%',
            maxWidth: '260px',
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
    </div>
  );
};

export default Directory;
