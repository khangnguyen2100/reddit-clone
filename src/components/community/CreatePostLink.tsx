import { Icon, IconButton, TextField, Tooltip } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsLink45Deg } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';

import { Community } from 'src/atoms';
import useCheckUser from 'src/hooks/useCheckUser';
import useDirectory from 'src/hooks/useDirectory';
type Props = {
  data: Community;
};
const CreatePostLink = ({ data }: Props) => {
  const router = useRouter();
  const { userSigned } = useCheckUser();
  const { toggleDirectoryOpenMenu } = useDirectory();

  const handleNavigateToSubmit = () => {
    if (userSigned()) {
      if (!router.query?.communityId) {
        toggleDirectoryOpenMenu();
      } else {
        router.push(`/r/${data.id}/submit`);
      }
    }
  };
  return (
    <div className='flex-center relative w-full gap-x-2 rounded-sm border border-divider bg-sections-paper p-[9px]'>
      {/* avatar */}
      <div className='absolute left-1 top-2'>
        {false ? (
          <Image
            src={data?.imageURL || ''}
            height={50}
            width={50}
            alt={`${data.id}-avatar`}
          />
        ) : (
          <Icon
            component={FaReddit}
            className='relative -top-3 rounded-full border-[4px] border-solid border-white text-[50px] text-blue'
          />
        )}
      </div>
      {/* input */}
      <div className='ml-[50px] grow' onClick={handleNavigateToSubmit}>
        <TextField
          placeholder='Create Post'
          variant='outlined'
          className='grow'
          fullWidth
          classes={{
            root: 'bg-[#f6f7f8] grow rounded-lg',
          }}
          sx={{
            width: '100%',
            fontSize: '1.4rem',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                fontSize: '1.4rem',
                border: '#ccc 1px solid',
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              },
              '&:hover fieldset': {
                borderColor: 'secondary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
          disabled
        />
      </div>
      {/* actions */}
      <div className='flex-center hidden'>
        <Tooltip title={'Create Media Post'}>
          <IconButton
            className='flex items-center justify-center rounded border border-solid border-transparent p-[6px] hover:border-divider active:border-divider'
            sx={{ p: 0 }}
          >
            <IoImageOutline color='typo-secondary' fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title={''}>
          <IconButton
            className='flex items-center justify-center rounded border border-solid border-transparent p-[6px] hover:border-divider active:border-divider'
            sx={{ p: 0 }}
          >
            <BsLink45Deg color='typo-secondary' fontSize={20} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default CreatePostLink;
