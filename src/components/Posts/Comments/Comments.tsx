import { Skeleton, Stack } from '@mui/material';
import type { User } from 'firebase/auth';
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import getUserDisplayName from '@/utils/getUserDisplayName';
import { Post, postsState } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import useCommunityData from 'src/hooks/useCommunityData';

import CommentInput from './CommentInput';
import CommentItem, { Comment } from './CommentItem';

type Props = {
  user?: User | null;
  communityId: string;
  selectedPost: Post;
};

const CommentLoader = () => {
  return (
    <>
      {[1, 2, 3].map(item => (
        <div
          key={item}
          className='w-full overflow-hidden rounded-lg bg-gray-100 p-1 px-2'
        >
          <div className='mb-2 flex items-center gap-x-2'>
            <Skeleton variant='circular' width={40} height={40} />
            <Skeleton variant='text' sx={{ fontSize: '1.4rem' }} width='70%' />
          </div>
          <Skeleton
            variant='rectangular'
            className='rounded'
            width={'100%'}
            height={'20vh'}
          />
        </div>
      ))}
    </>
  );
};
const Comments = (props: Props) => {
  const { user, communityId, selectedPost } = props;
  const setPostState = useSetRecoilState(postsState);
  const { isUserJoinedCommunity } = useCommunityData();
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<string>('');
  const onCreateComment = async () => {
    if (!isUserJoinedCommunity(communityId)) {
      enqueueSnackbar('You need to join community to comment', {
        variant: 'info',
      });
      return;
    }
    setCreateLoading(true);
    try {
      const batch = writeBatch(db);
      // create comment doc
      const commentDocRef = doc(collection(db, 'comments'));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user?.uid || '',
        creatorDisplayName: getUserDisplayName(user!) as string,
        communityId,
        postId: selectedPost.id!,
        postTitle: selectedPost.title,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);

      // update createdAt on client. because serverTimestamp only run on server. it will invalid on client when you set state
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      // update post numberOfComments
      const postDocRef = doc(db, 'posts', selectedPost.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();

      // update state
      setCommentText('');
      setComments(prev => [newComment, ...prev]);

      // update ui number of comments
      setPostState(prev => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    setCreateLoading(false);
  };
  const onDeleteComment = async (comment: Comment) => {
    setLoadingDelete(comment.id);
    try {
      const batch = writeBatch(db);
      // delete comment
      const commentDocRef = doc(db, 'comments', comment.id);
      batch.delete(commentDocRef);
      // update numberOfComment in post
      const postDocRef = doc(db, 'posts', selectedPost?.id!);

      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      //  udate amount number of comments
      const updatedPost = {
        ...selectedPost,
        numberOfComments: selectedPost.numberOfComments - 1,
      };
      setPostState(prev => ({
        ...prev,
        selectedPost: updatedPost,
      }));
      // remove comment in state
      setComments(prev => prev.filter(item => item.id !== comment.id));
    } catch (error: any) {
      console.log(error.message);
    }
    setLoadingDelete(comment.id);
  };
  const getComments = async () => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', selectedPost.id),
        orderBy('createdAt', 'desc'),
      );
      const commentsDoc = await getDocs(commentsQuery);
      const commentsData = commentsDoc.docs.map(comment => ({
        id: comment.id,
        ...comment.data(),
      }));
      setComments(commentsData as Comment[]);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('error.message:', error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (selectedPost) getComments();
  }, [selectedPost]);
  return (
    <div className='rounded-b bg-sections-paper p-2'>
      <div className='mb-6 flex w-full flex-col pl-10 pr-4 text-xs'>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          loading={createLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
      </div>
      <Stack spacing={3} className='px-2'>
        {loading ? (
          <CommentLoader />
        ) : (
          <>
            {comments.length === 0 ? (
              <div className='flex-center min-h-[40vh] text-center'>
                <p className='text-2xl font-medium text-typo-secondary  opacity-50'>
                  No comments yet!
                </p>
              </div>
            ) : (
              <>
                {comments.map((comment, i) => {
                  return (
                    <CommentItem
                      key={`comment-${comment.creatorDisplayName}-${i}`}
                      comment={comment}
                      loadingDelete={loadingDelete === comment.id}
                      userId={user?.uid!}
                      onDeleteComment={onDeleteComment}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </Stack>
    </div>
  );
};

export default Comments;
