/* eslint-disable no-unused-vars */
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Icon, Skeleton } from '@mui/material';
import { FaReddit } from 'react-icons/fa';
import Link from 'next/link';

import { Community } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import bg from 'public/images/recCommsArt.png';
import useCommunityData from 'src/hooks/useCommunityData';

import { ButtonBg } from '../common';

type ItemProps = {
  number: number;
  communityImage: string;
  communityId: string;
  communityData: Community;
};
const LoaderItem = () => {
  return (
    <div className='w-full overflow-hidden bg-gray-200 p-3'>
      {[1, 2, 3, 4, 5].map(item => (
        <div key={item} className='flex-center gap-x-2 px-1 py-2'>
          <Skeleton variant='circular' width={25} height={25} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
        </div>
      ))}
    </div>
  );
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
        <Link href={`/r/${communityId}`} className=' grow'>
          <h3 className='ml-3 overflow-hidden text-ellipsis whitespace-normal font-medium text-typo-primary hover:text-blue hover:underline'>
            r/{communityId}
          </h3>
        </Link>
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
const TopCommunities = () => {
  const {
    isUserJoinedCommunity,
    toggleJoinOrLeaveCommunity,
    communityStateValue,
  } = useCommunityData();
  const [topCommunities, setTopCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getTopCommunities = async () => {
    setLoading(true);
    try {
      const communitiesQuery = query(
        collection(db, 'communities'),
        orderBy('numberOfMembers', 'desc'),
        limit(5),
      );
      const communitiesDocs = await getDocs(communitiesQuery);
      const communitiesData = communitiesDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      setTopCommunities(communitiesData);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };
  const handleJoinAllCommunities = () => {
    topCommunities.forEach(item => {
      if (!isUserJoinedCommunity(item.id)) {
        toggleJoinOrLeaveCommunity(item, false);
      }
    });
  };
  const isJoinedAll = useMemo(() => {
    return topCommunities.every(item => isUserJoinedCommunity(item.id));
  }, [topCommunities, communityStateValue.mySnippets]);

  useEffect(() => {
    getTopCommunities();
  }, []);

  return (
    <div className='flex w-full grow flex-col overflow-hidden rounded'>
      {/* header */}
      <div className='relative min-h-[15vh]'>
        <Image src={bg} fill className='h-full object-cover' alt='bg' />
        <div className='h-full w-full bg-black opacity-40'></div>
        <h3 className='absolute bottom-3 left-2 text-2xl font-bold text-white'>
          Top Communities
        </h3>
      </div>
      {/* list */}
      {loading ? (
        <LoaderItem />
      ) : (
        <>
          {topCommunities && (
            <div className='flex-center w-full flex-col bg-sections-paper p-2'>
              {topCommunities.map((item, index) => {
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
              <ButtonBg
                className='mt-5 w-full'
                color='blue'
                onClick={handleJoinAllCommunities}
                disabled={isJoinedAll}
              >
                Join All
              </ButtonBg>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TopCommunities;
