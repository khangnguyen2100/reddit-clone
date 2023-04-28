import { Divider, IconButton } from '@mui/material';
import React from 'react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline
} from 'react-icons/io5';
import { VscAdd } from 'react-icons/vsc';
type IconBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
};
const IconBtn = ({ onClick, children }: IconBtnProps) => {
  return (
    <IconButton
      className='flex items-center justify-center rounded border border-solid border-transparent p-[6px] hover:border-divider active:border-divider'
      onClick={onClick}
      sx={{ p: 0 }}
    >
      {children}
    </IconButton>
  );
};
const Icons = () => {
  return (
    <div className='flex-center gap-2 '>
      <div className='flex-center gap-2 mdd:hidden'>
        <IconBtn>
          <BsArrowUpRightCircle color='text-secondary' fontSize={20} />
        </IconBtn>
        <IconBtn>
          <IoFilterCircleOutline color='text-secondary' fontSize={20} />
        </IconBtn>
        <IconBtn>
          <IoVideocamOutline color='text-secondary' fontSize={20} />
        </IconBtn>
        <Divider
          variant='middle'
          orientation='vertical'
          className='h-7 border border-text-secondary'
        />
      </div>
      <IconBtn>
        <BsChatDots color='text-secondary' fontSize={20} />
      </IconBtn>
      <IconBtn>
        <IoNotificationsOutline color='text-secondary' fontSize={20} />
      </IconBtn>
      <IconBtn>
        <VscAdd color='text-secondary' fontSize={20} />
      </IconBtn>
    </div>
  );
};

export default Icons;
