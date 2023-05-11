import { Stack } from '@mui/material';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { CommunitySnippet, Post } from 'src/atoms';
import PageContent from 'src/components/Layout/PageContent';
import PostItem from 'src/components/Posts/PostItem';
import PostLoader from 'src/components/Posts/PostLoader';
import { auth, db } from 'src/firebase/clientApp';
import useCommunityData from 'src/hooks/useCommunityData';
import usePosts from 'src/hooks/usePosts';

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    setPostStateValue,
    postsStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();
  const userHomeFeed = async () => {
    setLoading(true);
    try {
      // user not join any community ? load posts for no user feed
      if (communityStateValue.mySnippets?.length) {
        const communityIds = communityStateValue.mySnippets.map(
          (item: CommunitySnippet) => item.communityId,
        );
        const postsQuery = query(
          collection(db, 'posts'),
          where('communityId', 'in', communityIds),
          limit(10),
          orderBy('createdAt', 'desc'),
        );
        const postsDocs = await getDocs(postsQuery);
        const posts = postsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue(prev => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        noUserHomeFeed();
      }
    } catch (error: any) {
      console.error(error.message);
    }
    setLoading(false);
  };
  const noUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        limit(10),
        orderBy('voteCount', 'desc'),
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.error(error.message);
    }
    setLoading(false);
  };
  const getUserPostVote = () => {};

  useEffect(() => {
    // after fetched snippets from useCommunityData
    if (communityStateValue.snippetsFetch) userHomeFeed();
  }, [communityStateValue.snippetsFetch]);
  useEffect(() => {
    // only check user after loaded
    if (!user && !loadingUser) noUserHomeFeed();
  }, [user, loadingUser]);
  return (
    <PageContent>
      <>
        {loading ? (
          <PostLoader />
        ) : (
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
        )}
      </>
      <></>
    </PageContent>
  );
}
