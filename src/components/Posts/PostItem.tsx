/* eslint-disable no-unused-vars */
import {
  Button,
  CircularProgress,
  Divider,
  Icon,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';

import { Post, communityState } from 'src/atoms';
import useConfirm from 'src/hooks/useConfirm';
type Props = {
  post: Post;
  isCreator: boolean;
  voteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
  ) => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
};

const PostItem = (props: Props) => {
  const router = useRouter();
  const { post, voteValue, isCreator, onSelectPost, onDeletePost, onVote } =
    props;
  // because we only have onSelectPost function in community page
  const inSinglePostPage = !onSelectPost;
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { ConfirmModal, confirmResult } = useConfirm({
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post?',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    const ans = await confirmResult();
    if (ans) {
      setLoadingDelete(true);
      try {
        const success = await onDeletePost(post);
        if (!success) {
          throw new Error('Something went wrong while deleting the post.');
        }
        enqueueSnackbar('Delete Post Successfully!', { variant: 'success' });
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
      setLoadingDelete(false);
    }
    if (inSinglePostPage) {
      router.push(`/r/${post.communityId}`);
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const domain = useRef<string>(window.location.origin);
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <>
      <div
        className={clsx(
          'flex cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-sections-paper hover:border-gray-500',
          inSinglePostPage &&
            'cursor-[unset] rounded border-white hover:border-white',
        )}
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        {/* vote block */}
        <div
          className={clsx(
            'flex w-10 flex-col items-center bg-gray-50 p-2',
            inSinglePostPage && 'bg-transparent',
          )}
        >
          <Icon
            component={
              voteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
            }
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[28px] hover:bg-gray-200',
              voteValue === 1 ? 'text-oran' : 'text-gray-400',
            )}
            onClick={event => onVote(event, post, 1, post.communityId)}
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
            onClick={event => onVote(event, post, -1, post.communityId)}
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
              {!router.query.communityId && (
                <>
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
                      <Icon
                        component={FaReddit}
                        className='text-xl text-blue'
                      />
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
                </>
              )}
              {/* creator name and date posted */}
              <p className='text-xs text-typo-secondary'>
                Posted by{' '}
                <span className='font-medium'>u/{post.creatorDisplayName}</span>{' '}
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
          {/* buttons */}
          <div className='mb-[2px] ml-1 flex gap-x-1 font-semibold text-typo-secondary'>
            {/* comment */}
            <div className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'>
              <Icon component={BsChat} className='mr-2 text-[20px]' />
              <p className='text-xs'>{post.numberOfComments}</p>
            </div>
            {/* share */}
            <Button
              className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'
              onClick={handleShare}
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Icon
                component={IoArrowRedoOutline}
                className='mr-2 text-[20px] text-typo-secondary'
              />
              <p className='text-xs text-typo-secondary'>Share</p>
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <FacebookShareButton
                  url={`${domain.current}/r/${post.communityId}/comments/${post.id}`}
                  className='flex-center gap-x-2 py-1 hover:bg-gray-200'
                  quote={post.title}
                  hashtag={`#${post.communityId}`}
                >
                  <FacebookIcon size={20} round />
                  <p className='text-xs font-medium'>Facebook</p>
                </FacebookShareButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <TwitterShareButton
                  url={`${domain.current}/r/${post.communityId}/comments/${post.id}`}
                  className='flex-center gap-x-2 py-1 hover:bg-gray-200'
                  title={post.title}
                  hashtags={[post.communityId]}
                >
                  <TwitterIcon size={20} round />
                  <p className='text-xs font-medium'>Twitter</p>
                </TwitterShareButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <TelegramShareButton
                  url={`${domain.current}/r/${post.communityId}/comments/${post.id}`}
                  className='flex-center gap-x-2 py-1 hover:bg-gray-200'
                  title={post.title}
                >
                  <TelegramIcon size={20} round />
                  <p className='text-xs font-medium'>Telegram</p>
                </TelegramShareButton>
              </MenuItem>
            </Menu>
            {/* save */}
            {/* <div className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'>
              <Icon
                component={IoBookmarkOutline}
                className='mr-2 text-[20px]'
              />
              <p className='text-xs'>Save</p>
            </div> */}
            {/* Delete */}
            {isCreator && (
              <div
                className='flex cursor-pointer rounded-sm px-3 py-2 text-center hover:bg-gray-200'
                onClick={event => handleDelete(event)}
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
