import { Divider, IconButton } from '@mui/material';
import React from 'react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
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
          <BsArrowUpRightCircle fontSize={20} />
        </IconBtn>
        <IconBtn>
          <IoFilterCircleOutline fontSize={20} />
        </IconBtn>
        <IconBtn>
          <IoVideocamOutline fontSize={20} />
        </IconBtn>
      </div>
      <Divider
        variant='middle'
        orientation='vertical'
        className='h-7 border border-divider'
      />
      <IconBtn>
        <BsChatDots fontSize={20} />
      </IconBtn>
      <IconBtn>
        <IoNotificationsOutline fontSize={20} />
      </IconBtn>
      <IconBtn>
        <GrAdd fontSize={20} />
      </IconBtn>
    </div>
  );
};

export default Icons;
