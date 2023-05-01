import { MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { VscAdd } from 'react-icons/vsc';

import CreateCommunities from 'src/components/Modal/CreateCommunities/CreateCommunities';

const Communities = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='flex w-full flex-col'>
      {/* popup modal */}
      <CreateCommunities open={openModal} setOpen={setOpenModal} />

      <Typography className='my-4 px-6 text-[10px] font-medium uppercase text-typo-secondary'>
        Your Communities
      </Typography>
      <MenuItem
        className='flex w-full items-center gap-x-2 px-6 py-[10px]'
        onClick={() => setOpenModal(true)}
      >
        <VscAdd className='text-typo-primary' fontSize={20} />
        <Typography className='text-sm capitalize text-typo-primary'>
          Create Community
        </Typography>
      </MenuItem>
    </div>
  );
};

export default Communities;
