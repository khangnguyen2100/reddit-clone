import { Divider, Icon } from '@mui/material';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import millify from 'millify';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

import { Community, communityModalState } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import useCheckUser from 'src/hooks/useCheckUser';
import useCommunityData from 'src/hooks/useCommunityData';

import { ButtonBg } from '../common';

type ItemProps = {
  number: number;
  communityImage: string;
  communityId: string;
  communityData: Community;
};
const ListItem = (props: ItemProps) => {
  const { communityId, communityImage, communityData, number } = props;
  const { isUserJoinedCommunity, toggleJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined: boolean = isUserJoinedCommunity(communityId) || false;
  return (
    <>
      <div className='flex w-full items-center justify-evenly px-1 py-[10px]'>
        <p className='mr-3 text-base font-medium text-typo-primary'>{number}</p>
        {communityImage ? (
          <div className='relative  h-5 w-5 overflow-hidden rounded-full'>
            <Image src={communityImage} alt={`${communityId}-avatar`} fill />
          </div>
        ) : (
          <div className=''>
            <Icon component={FaReddit} className={'text-2xl text-blue'} />
          </div>
        )}
        <div className='ml-3 flex grow  flex-col'>
          <Link href={`/r/${communityId}`} className=''>
            <h3 className='overflow-hidden text-ellipsis whitespace-normal font-medium text-typo-primary hover:text-blue hover:underline'>
              r/{communityId}
            </h3>
          </Link>
          <span className='block font-ibm text-xs'>
            {millify(communityData.numberOfMembers)} members
          </span>
        </div>
        <ButtonBg
          color='blue'
          outline={!isJoined}
          onClick={() => toggleJoinOrLeaveCommunity(communityData, isJoined)}
          loading={loading}
        >
          {isJoined ? 'Joined' : 'Join'}
        </ButtonBg>
      </div>
      <Divider className='w-full border-divider' />
    </>
  );
};
const ModeratorList = () => {
  const { user } = useCheckUser();
  const { communityStateValue } = useCommunityData();
  const [communitiesData, setCommunitiesData] = useState<Community[]>([]);
  const setOpenModal = useSetRecoilState(communityModalState);

  const getCommunityInfo = async () => {
    if (communityStateValue.mySnippets) {
      try {
        const communitiesDocs = await getDocs(
          query(
            collection(db, 'communities'),
            where('creatorId', '==', user?.uid),
            orderBy('createAt', 'desc'),
          ),
        );

        const communitiesData = communitiesDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Community[];
        setCommunitiesData(communitiesData);
      } catch (error) {
        console.log('error:', error);
      }
    }
  };
  const handleOpenCreateCommunity = () => {
    setOpenModal({
      open: true,
    });
  };
  useEffect(() => {
    if (user && communityStateValue.snippetsFetch) {
      getCommunityInfo();
    }
  }, [user, communityStateValue.snippetsFetch]);

  return (
    <>
      {communitiesData.length > 0 ? (
        <div className='mt-5 flex w-full grow flex-col overflow-hidden rounded bg-sections-paper p-2 py-3'>
          {/* header */}
          <h4 className='text-lg font-bold text-typo-primary'>
            {"You're a moderator of these communities"}
          </h4>
          <div className='mb-3 flex w-full flex-col gap-y-4 '>
            {communitiesData.length > 0 && (
              <div className='flex-center w-full flex-col bg-sections-paper p-2'>
                {communitiesData.map((item, index) => {
                  return (
                    <ListItem
                      communityData={item}
                      communityId={item.id}
                      communityImage={item.imageURL || ''}
                      number={index + 1}
                      key={item.id}
                    />
                  );
                })}
              </div>
            )}
            <ButtonBg
              color='blue'
              animation
              onClick={handleOpenCreateCommunity}
            >
              Create Community
            </ButtonBg>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModeratorList;
