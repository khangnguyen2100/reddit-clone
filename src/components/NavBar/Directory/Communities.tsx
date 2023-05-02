import { MenuItem, Typography } from '@mui/material';
import { VscAdd } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';

import { communityModalState } from 'src/atoms';
import CreateCommunities from 'src/components/Modal/CreateCommunities/CreateCommunities';

const Communities = () => {
  const [openModal, setOpenModal] = useRecoilState(communityModalState);
  const handleCloseModal = () => {
    setOpenModal({
      open: false,
    });
  };
  return (
    <div className='flex w-full flex-col'>
      {/* popup modal */}
      <CreateCommunities
        open={openModal.open}
        handleCloseModal={handleCloseModal}
      />

      <Typography className='my-4 px-6 text-[10px] font-medium uppercase text-typo-secondary'>
        Your Communities
      </Typography>
      <MenuItem
        className='flex w-full items-center gap-x-2 px-6 py-[10px]'
        onClick={() =>
          setOpenModal({
            open: true,
          })
        }
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
