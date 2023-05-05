import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';

import { Community, Post } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import usePosts from 'src/hooks/usePosts';
import useCheckSigned from 'src/hooks/useCheckSigned';

import PostItem from './PostItem';
import PostLoader from './PostLoader';

type Props = {
  communityData: Community;
};

const Posts = (props: Props) => {
  const { communityData } = props;
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { user } = useCheckSigned();
  const [loading, setLoading] = useState<boolean>(false);
  const getPosts = async () => {
    setLoading(true);
    try {
      const queryPosts = query(
        collection(db, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc'),
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
      console.log('postsData:', postsData);
    } catch (error: any) {
      console.log('Error:', error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack spacing={1.5} direction={'column'} className='mt-5'>
          {postStateValue.posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              isCreator={post.creatorId === user?.uid}
              voteValue={undefined}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
