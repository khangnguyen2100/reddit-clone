import { Icon } from '@mui/material';
import Image from 'next/image';
import { FaReddit } from 'react-icons/fa';

import { Community } from 'src/atoms';
import useCommunityData from 'src/hooks/useCommunityData';

import { ButtonBg } from '../common';
type Props = {
  data: Community;
};

const Header = (props: Props) => {
  const { data } = props;
  const { communityStateValue, toggleJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = Boolean(
    communityStateValue.mySnippets?.find(item => item.communityId === data.id),
  );
  return (
    <div className='flex h-[181px] w-full flex-col'>
      <div className='h-[80px] bg-[#33a8ff]' />
      <div className='flex grow justify-center bg-white'>
        <div className='flex w-full max-w-medium'>
          {communityStateValue.currentCommunity?.imageURL ? (
            <div className='relative -top-3 h-20 w-20 overflow-hidden rounded-full border-[4px] border-solid border-white text-blue'>
              <Image
                src={communityStateValue.currentCommunity?.imageURL}
                fill
                alt={`${data.id}-avatar`}
                className='rounded-full object-cover'
              />
            </div>
          ) : (
            <Icon
              component={FaReddit}
              className='relative -top-3 rounded-full border-[4px] border-solid border-white text-[80px] text-blue'
            />
          )}
          <div className='flex px-4 py-[10px]'>
            <div className='mr-6 flex flex-col'>
              <h4 className='text-[28px] font-bold'>{data.id}</h4>
              <p className='font-medium text-typo-secondary'>r/{data.id}</p>
            </div>
            {/* buttons */}
            <ButtonBg
              color='blue'
              outline={!isJoined}
              onClick={() => toggleJoinOrLeaveCommunity(data, isJoined)}
              loading={loading}
            >
              {isJoined ? 'Joined' : 'Join'}
            </ButtonBg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
