import { CircularProgress, Icon, Stack } from '@mui/material';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';

import { Post } from 'src/atoms';
import useConfirm from 'src/hooks/useConfirm';
type Props = {
  post: Post;
  isCreator: boolean;
  voteValue?: number;
  onVote: () => {};
  // eslint-disable-next-line no-unused-vars
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem = (props: Props) => {
  const { post, voteValue, isCreator, onSelectPost, onDeletePost, onVote } =
    props;
  const [error, setError] = useState<string>('');
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { ConfirmModal, confirmResult } = useConfirm({
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post?',
  });
  const handleDelete = async () => {
    const ans = await confirmResult();
    if (ans) {
      setLoadingDelete(true);
      try {
        const success = await onDeletePost(post);
        if (!success) {
          throw new Error('Something went wrong while deleting the post.');
        }
        console.log('Delete Successfully!');
      } catch (error: any) {
        setError(error.message);
      }
      setLoadingDelete(false);
    }
  };
  return (
    <>
      <div
        className='flex cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-sections-paper hover:border-gray-500'
        onClick={onSelectPost}
      >
        {/* vote block */}
        <div className='flex w-10 flex-col items-center bg-gray-50 p-2'>
          <Icon
            component={
              voteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
            }
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[28px] hover:bg-gray-200',
              voteValue === 1 ? 'text-oran' : 'text-gray-400',
            )}
            onClick={() => onVote()}
          />
          <p
            className={clsx(
              'text-xs font-semibold',
              voteValue === 1
                ? 'text-oran'
                : voteValue === -1
                ? 'text-blue'
                : 'text-gray-400',
            )}
          >
            {post.voteCount}
          </p>
          <Icon
            component={
              voteValue === -1
                ? IoArrowDownCircleSharp
                : IoArrowDownCircleOutline
            }
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[28px] hover:bg-gray-200',
              voteValue === -1 ? 'text-blue' : 'text-gray-400',
            )}
            onClick={() => onVote()}
          />
        </div>
        <div className='flex w-full flex-col'>
          <Stack direction='column' spacing={1} className='p-2'>
            <Stack
              direction='row'
              spacing={0.6}
              className='items-center text-center text-xs'
            >
              {/* Home Page Check */}
              {/* creator name and date posted */}
              <p className='text-xs text-typo-secondary'>
                Posted by u/{post.creatorDisplayName}{' '}
                {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
              </p>
            </Stack>
            <h3 className='mt-3 font-ibm text-lg font-medium'>{post.title}</h3>
            {/* post text */}
            <p className='mt-2 font-noto text-[#1c1c1c]'>{post.body}</p>
            {
              // post image
              post.imageURL && (
                <div className='flex-center relative mt-2 max-h-[460px] overflow-hidden'>
                  <Image
                    src={post.imageURL}
                    width={568}
                    height={350}
                    alt='post image'
                    placeholder='blur'
                    blurDataURL={
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcfWS3DwAHBAKIktITrQAAAABJRU5ErkJggg=='
                    }
                    className='h-full object-contain'
                  />
                </div>
              )
            }
          </Stack>
          <div className='mb-[2px] ml-1 flex gap-x-1 font-semibold text-typo-secondary'>
            {/* comment */}
            <div className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'>
              <Icon component={BsChat} className='mr-2 text-[20px]' />
              <p className='text-xs'>{post.numberOfComments}</p>
            </div>
            {/* share */}
            <div className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'>
              <Icon
                component={IoArrowRedoOutline}
                className='mr-2 text-[20px]'
              />
              <p className='text-xs'>Share</p>
            </div>
            {/* save */}
            <div className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'>
              <Icon
                component={IoBookmarkOutline}
                className='mr-2 text-[20px]'
              />
              <p className='text-xs'>Save</p>
            </div>
            {/* Delete */}
            {isCreator && (
              <div
                className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'
                onClick={handleDelete}
              >
                {loadingDelete ? (
                  <CircularProgress color='inherit' size={20} />
                ) : (
                  <>
                    <Icon
                      component={AiOutlineDelete}
                      className='mr-2 text-[20px]'
                    />
                    <p className='text-xs'>Delete</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal />
    </>
  );
};

export default PostItem;
