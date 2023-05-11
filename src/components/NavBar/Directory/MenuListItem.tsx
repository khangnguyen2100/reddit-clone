import { Icon, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaReddit } from 'react-icons/fa';

type Props = {
  communityId: string;
  imageURL?: string;
};

const MenuListItem = (props: Props) => {
  const router = useRouter();
  const { communityId, imageURL } = props;
  const handleGoToCommunity = () => {
    router.push(`/r/${communityId}`);
  };
  return (
    <MenuItem
      className='flex w-full items-center gap-x-2 px-6 py-[10px]'
      onClick={handleGoToCommunity}
    >
      {imageURL ? (
        <div className='relative m-1 h-4 w-4 overflow-hidden rounded-full'>
          <Image src={imageURL} alt={`${communityId}-avatar`} fill />
        </div>
      ) : (
        <div className='m-1'>
          <Icon component={FaReddit} className='text-xl text-blue' />
        </div>
      )}
      <Typography className='text-sm text-typo-primary'>
        r/{communityId}
      </Typography>
    </MenuItem>
  );
};

export default MenuListItem;
