/* eslint-disable no-unused-vars */
import { Icon, Stack } from '@mui/material';
import clsx from 'clsx';
import type { User } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoComment } from 'react-icons/go';

import { Post } from 'src/atoms';
import { Comment } from 'src/components/Posts/Comments/CommentItem';
import { db } from 'src/firebase/clientApp';

import Loading from './Loading';

type Props = {
  user?: User | null;
};

type PropsCommentItem = {
  comment: Comment;
};

const CommentItem = (props: PropsCommentItem) => {
  const router = useRouter();
  const { comment } = props;

  return (
    <>
      <div
        className={clsx(
          'flex cursor-pointer items-center overflow-hidden rounded-md border border-gray-300 bg-sections-paper p-2 hover:border-gray-500',
        )}
        onClick={() =>
          router.push(`/r/${comment.communityId}/comments/${comment.postId}`)
        }
      >
        {/* vote block */}
        <div className={'flex w-[50px] flex-col bg-gray-50 pr-2'}>
          <Icon
            component={GoComment}
            className={clsx(
              'cursor-pointer rounded-sm p-[2px] text-[30px] text-typo-secondary',
            )}
          />
        </div>
        <Stack direction='column' spacing={1} className='flex-1'>
          <Stack
            direction='row'
            spacing={0.6}
            className='items-center text-center text-xs'
          >
            <div className='flex items-center gap-x-2'>
              <Link
                href={`/r/${comment.communityId}`}
                onClick={e => e.stopPropagation()}
                className='text-xs font-medium hover:underline'
              >
                r/{comment.communityId}
              </Link>
            </div>
            <span> • </span>
            {/* creator name and date commented */}
            <p className='text-xs text-typo-secondary'>
              Posted by{' '}
              <span className='font-medium'>
                u/{comment.creatorDisplayName}
              </span>{' '}
              {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </p>
          </Stack>
          <p className='text-15 font-medium text-typo-secondary'>
            {comment.text}
          </p>
        </Stack>
      </div>
    </>
  );
};

const CommentsTab = (props: Props) => {
  const { user } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const getComments = async () => {
    setLoading(true);
    try {
      const commentDocs = await getDocs(
        query(
          collection(db, 'comments'),
          where('creatorId', '==', user?.uid),
          orderBy('createdAt', 'desc'),
        ),
      );
      const comments = commentDocs.docs.map(item => ({
        id: item.id,
        ...item.data(),
      })) as Comment[];
      setCommentsData(comments);
    } catch (error) {
      console.log('error:', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user?.uid) {
      getComments();
    }
  }, [user?.uid]);
  return (
    <div className='flex w-full flex-col'>
      {loading ? (
        <Loading />
      ) : (
        <Stack spacing={1}>
          {commentsData.map(comment => {
            return <CommentItem comment={comment} key={comment.id} />;
          })}
        </Stack>
      )}
    </div>
  );
};

export default CommentsTab;
