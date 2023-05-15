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
import { useAuthState } from 'react-firebase-hooks/auth';

import { CommunitySnippet, Post, PostVotes } from 'src/atoms';
import { defaultState } from 'src/atoms/directoryAtom';
import PageContent from 'src/components/Layout/PageContent';
import PostItem from 'src/components/Posts/PostItem';
import PostLoader from 'src/components/Posts/PostLoader';
import { ButtonBg } from 'src/components/common';
import PersonalHome from 'src/components/community/PersonalHome';
import TopCommunities from 'src/components/community/TopCommunities';
import { auth, db } from 'src/firebase/clientApp';
import useCommunityData from 'src/hooks/useCommunityData';
import useDirectory from 'src/hooks/useDirectory';
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
  const { setDirectoryState, directoryState } = useDirectory();
  const userHomeFeed = async () => {
    // load posts in community user joined
    setLoading(true);
    try {
      // user not join any community? load posts for no user feed
      if (communityStateValue.mySnippets?.length) {
        const communityIds = communityStateValue.mySnippets.map(
          (item: CommunitySnippet) => item.communityId,
        );
        const postsQuery = query(
          collection(db, 'posts'),
          where('communityId', 'in', communityIds),
          limit(35),
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
    // get all public posts
    setLoading(true);
    try {
      const publicCommunityQuery = query(
        collection(db, 'communities'),
        where('privacyType', '==', 'public'),
      );
      const publicCommunityDocs = await getDocs(publicCommunityQuery);
      const publicCommunityDataIds = publicCommunityDocs.docs.map(
        item => item.id,
      );
      const postsQuery = query(
        collection(db, 'posts'),
        where('communityId', 'in', publicCommunityDataIds),
        limit(35),
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
  const getUserPostVote = async () => {
    try {
      const postsIds = postsStateValue.posts.map(post => post.id);
      const postVotesQuery = query(
        collection(db, `users`, `${user?.uid}/postVotes`),
        where('postId', 'in', postsIds),
      );
      const postVotesDocs = await getDocs(postVotesQuery);
      const postVotes = postVotesDocs.docs.map(item => ({
        id: item.id,
        ...item.data(),
      })) as PostVotes[];

      const orderPostVotes: PostVotes[] = [];
      postsStateValue.posts.forEach(post => {
        const result = postVotes.find(vote => vote.postId === post.id);
        if (result) orderPostVotes.push(result);
      });
      setPostStateValue(prev => ({
        ...prev,
        postVotes: postVotes as PostVotes[],
      }));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // after fetched snippets from useCommunityData
    if (communityStateValue.snippetsFetch) userHomeFeed();
  }, [
    communityStateValue.snippetsFetch,
    communityStateValue?.mySnippets?.length,
  ]);
  useEffect(() => {
    // only check user after loaded
    if (!user && !loadingUser) noUserHomeFeed();
  }, [user, loadingUser]);
  useEffect(() => {
    if (user && postsStateValue.posts.length) getUserPostVote();
  }, [user, postsStateValue.posts.length]);

  useEffect(() => {
    if (directoryState.selectedMenuItem.link !== '/') {
      setDirectoryState(defaultState);
    }
  }, [directoryState]);
  return (
    <PageContent>
      <>
        {loading ? (
          <PostLoader />
        ) : (
          <>
            <Stack spacing={1.5} direction={'column'} className='mt-3'>
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
            <div
              className='flex-center w-full'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <ButtonBg color='orange' outline className='mx-auto mb-5 mt-10'>
                Back to Top
              </ButtonBg>
            </div>
          </>
        )}
      </>
      <>
        <Stack spacing={2} className='mt-3'>
          <PersonalHome />
          <TopCommunities />
        </Stack>
      </>
    </PageContent>
  );
}
