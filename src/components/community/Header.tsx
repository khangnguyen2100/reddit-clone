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
    <div className='flex h-[146px] w-full flex-col'>
      <div className='h-1/2 bg-[#33a8ff]' />
      <div className='flex grow justify-center bg-white'>
        <div className='flex w-[95%] max-w-[860px]'>
          {data?.imageURL ? (
            <Image
              src={data?.imageURL}
              height={64}
              width={64}
              alt={`${data.id}-avatar`}
            />
          ) : (
            <Icon
              component={FaReddit}
              className='relative -top-3 rounded-full border-[4px] border-solid border-white text-[64px] text-blue'
            />
          )}
          <div className='flex px-4 py-[10px]'>
            <div className='mr-6 flex flex-col'>
              <h4 className='text-base font-bold'>{data.id}</h4>
              <p className='text-[10px] font-semibold text-typo-secondary'>
                r/{data.id}
              </p>
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
