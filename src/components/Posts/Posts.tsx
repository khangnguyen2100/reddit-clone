import { Stack } from '@mui/material';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Community, Post } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import useCheckUser from 'src/hooks/useCheckUser';
import usePosts from 'src/hooks/usePosts';

import PostItem from './PostItem';
import PostLoader from './PostLoader';

type Props = {
  communityData: Community;
};

const Posts = (props: Props) => {
  const { communityData } = props;
  const {
    postsStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { user } = useCheckUser();
  const [loading, setLoading] = useState<boolean>(false);
  const getPosts = async () => {
    setLoading(true);
    try {
      const queryPosts = query(
        collection(db, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc'),
        limit(35),
      );
      const getPosts = await getDocs(queryPosts);
      const postsData = getPosts.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue(prev => ({
        ...prev,
        posts: postsData as Post[],
      }));
    } catch (error: any) {
      console.log('Error:', error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, [communityData]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <>
          <Stack spacing={1.5} direction={'column'} className='mt-5'>
            {postsStateValue.posts.map(post => (
              <PostItem
                post={post}
                key={post.id}
                isCreator={post.creatorId === user?.uid}
                voteValue={
                  postsStateValue.postVotes.find(
                    item => item.postId === post.id,
                  )?.voteValue
                }
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
              />
            ))}
          </Stack>
          {postsStateValue.posts.length > 0 && (
            <div
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className='flex-center min-h-[20vh] w-full text-center'
            >
              <p className='text-2xl font-medium text-typo-secondary'>
                {"You've reached the end of the page. "}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
