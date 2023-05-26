/* eslint-disable no-unused-vars */
import { Icon, Stack } from '@mui/material';
import clsx from 'clsx';
import type { User } from 'firebase/auth';
import millify from 'millify';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
} from 'react-icons/io5';

import { Post } from 'src/atoms';

type Props = {
  user?: User | null;
};

type PropsPostItem = {
  post: Post;
  voteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
  ) => {};
  onSelectPost?: (post: Post) => void;
};

const PostItem = (props: PropsPostItem) => {
  const router = useRouter();
  const { post, voteValue, onSelectPost, onVote } = props;
  const inSinglePostPage = !onSelectPost;

  return (
    <>
      <div
        className={clsx(
          'flex cursor-pointer items-center overflow-hidden rounded-md border border-gray-300 bg-sections-paper p-2 hover:border-gray-500',
          inSinglePostPage &&
            'cursor-[unset] rounded border-white hover:border-white',
        )}
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        {/* vote block */}
        <div
          className={clsx(
            'flex w-[50px] flex-col items-center bg-gray-50 pr-2',
            inSinglePostPage && 'bg-transparent',
          )}
        >
          <Icon
            component={
              voteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
            }
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[30px] hover:bg-gray-200',
              voteValue === 1 ? 'text-oran' : 'text-gray-400',
            )}
            onClick={event => onVote(event, post, 1, post.communityId)}
          />
          <p
            className={clsx(
              ' font-semibold',
              voteValue === 1
                ? 'text-oran'
                : voteValue === -1
                ? 'text-blue'
                : 'text-gray-400',
            )}
          >
            {millify(post.voteCount)}
          </p>
          <Icon
            component={
              voteValue === -1
                ? IoArrowDownCircleSharp
                : IoArrowDownCircleOutline
            }
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[30px] hover:bg-gray-200',
              voteValue === -1 ? 'text-blue' : 'text-gray-400',
            )}
            onClick={event => onVote(event, post, -1, post.communityId)}
          />
        </div>
        <div className='flex gap-x-4'>
          {
            // post image
            post.imageURL && (
              <div className='flex-center relative h-[72px] w-24 overflow-hidden bg-gray-200'>
                <Image
                  src={post.imageURL}
                  fill
                  alt={post.title}
                  className='object-cover'
                />
              </div>
            )
          }

          <Stack direction='column' spacing={1} className='flex-1'>
            <h3 className='w-full max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap font-ibm text-base font-medium mobile:!max-w-[200px] mobile:text-sm lgd:max-w-[300px] '>
              {post.title}
            </h3>
            <Stack
              direction='row'
              spacing={0.6}
              className='items-center text-center text-xs'
            >
              <div className='flex items-center gap-x-2'>
                {post.communityImageURL ? (
                  <div className='relative block h-4 w-4 overflow-hidden rounded-full'>
                    <Image
                      src={post.communityImageURL}
                      alt={post.communityId}
                      fill
                    />
                  </div>
                ) : (
                  <Icon component={FaReddit} className='text-xl text-blue' />
                )}
                <Link
                  href={`/r/${post.communityId}`}
                  onClick={e => e.stopPropagation()}
                  className='text-xs font-medium hover:underline'
                >
                  r/{post.communityId}
                </Link>
              </div>
              <span> • </span>
              {/* creator name and date posted */}
              <p className='text-xs text-typo-secondary'>
                Posted by{' '}
                <span className='font-medium'>u/{post.creatorDisplayName}</span>{' '}
                {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
              </p>
            </Stack>
            {/* buttons */}
            <div className='mb-[2px] ml-1 flex gap-x-1 font-semibold text-typo-secondary'></div>
          </Stack>
        </div>
      </div>
    </>
  );
};
export default PostItem;
