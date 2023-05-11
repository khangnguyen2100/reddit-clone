import { MenuItem, Typography } from '@mui/material';
import { VscAdd } from 'react-icons/vsc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FaReddit } from 'react-icons/fa';

import { communityModalState, communityState } from 'src/atoms';
import CreateCommunities from 'src/components/Modal/CreateCommunities/CreateCommunities';

import MenuListItem from './MenuListItem';

const Communities = () => {
  const [openModal, setOpenModal] = useRecoilState(communityModalState);
  const mySnippetsCommunities = useRecoilValue(communityState).mySnippets;

  // Close the modal.
  const handleCloseModal = () => {
    setOpenModal({
      open: false,
    });
  };
  return (
    <div className='flex w-full flex-col'>
      <Typography className='mb-2 mt-4 px-6 text-xs font-medium uppercase text-typo-secondary'>
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
      {mySnippetsCommunities &&
        mySnippetsCommunities.map(item => (
          <MenuListItem
            key={item.communityId}
            displayText={`r/${item.communityId}`}
            icon={FaReddit}
            link={`r/${item.communityId}`}
            imageURL={item?.imageURL || ''}
          />
        ))}
      {/* popup modal */}
      <CreateCommunities
        open={openModal.open}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Communities;
