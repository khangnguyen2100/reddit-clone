import { Divider, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { VscAdd } from 'react-icons/vsc';
type IconBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
};
const IconBtn = ({ onClick, children, title }: IconBtnProps) => {
  return (
    <Tooltip title={title}>
      <IconButton
        className='flex items-center justify-center rounded border border-solid border-transparent p-[4px] hover:border-divider active:border-divider'
        onClick={onClick}
        sx={{ p: 0 }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
const Icons = () => {
  return (
    <div className='flex-center gap-x-2 std:gap-x-1'>
      <div className='flex-center gap-x-2 mdd:hidden std:gap-x-1'>
        <IconBtn title='Popular'>
          <BsArrowUpRightCircle color='typo-secondary' fontSize={20} />
        </IconBtn>
        <IconBtn title='Filter'>
          <IoFilterCircleOutline color='typo-secondary' fontSize={20} />
        </IconBtn>
        <IconBtn title='Call'>
          <IoVideocamOutline color='typo-secondary' fontSize={20} />
        </IconBtn>
        <Divider
          variant='middle'
          orientation='vertical'
          className='h-6 border border-gray-200'
        />
      </div>
      <IconBtn title='Chats'>
        <BsChatDots color='typo-secondary' fontSize={20} />
      </IconBtn>
      <IconBtn title='Notifications'>
        <IoNotificationsOutline color='typo-secondary' fontSize={20} />
      </IconBtn>
      <IconBtn title='Create Post'>
        <VscAdd color='typo-secondary' fontSize={20} />
      </IconBtn>
    </div>
  );
};

export default Icons;
