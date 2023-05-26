/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import type { User } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { Post, PostVotes } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import usePosts from 'src/hooks/usePosts';

import Loading from './Loading';
import PostItem from './PostItem';

type Props = {
  user?: User | null;
  voteType: 'upVote' | 'downVote';
};

const VoteTab = (props: Props) => {
  const { user, voteType = 'upVote' } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { onSelectPost, onVote, postsStateValue, setPostStateValue } =
    usePosts();
  const getUserPostVote = async () => {
    setLoading(true);
    try {
      const postVotesQuery = query(
        collection(db, `users/${user?.uid}/postVotes`),
      );
      const postVotesDocs = await getDocs(postVotesQuery);
      const postVotes = postVotesDocs.docs.map(item => ({
        id: item.id,
        ...item.data(),
      })) as PostVotes[];
      const type = voteType === 'upVote' ? 1 : -1;
      const upVotes = postVotes.filter(item => item.voteValue === type);
      setPostStateValue(prev => ({
        ...prev,
        postVotes: upVotes as PostVotes[],
      }));
      getPosts(upVotes);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const getPosts = async (upVotes: PostVotes[]) => {
    if (upVotes.length === 0) return;
    try {
      const upVotesIds = upVotes.map(item => item.postId);
      // post id is name of document
      const postDocs = await getDocs(
        query(collection(db, 'posts'), where('__name__', 'in', upVotesIds)),
      );
      const posts = postDocs.docs.map(item => ({
        id: item.id,
        ...item.data(),
      })) as Post[];
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log('error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.uid) {
      getUserPostVote();
    }
  }, [user?.uid]);
  return (
    <div className='flex w-full flex-col'>
      {loading ? (
        <Loading />
      ) : (
        <Stack spacing={1}>
          {postsStateValue.posts.length > 0 ? (
            <>
              {postsStateValue.posts.map(post => {
                return (
                  <PostItem
                    onVote={onVote}
                    post={post}
                    key={post.id}
                    onSelectPost={onSelectPost}
                    voteValue={
                      postsStateValue.postVotes.find(
                        item => item.postId === post.id,
                      )?.voteValue
                    }
                  />
                );
              })}
            </>
          ) : (
            <div className='flex-center min-h-[40vh] text-center'>
              <p className='text-center text-xl font-medium text-typo-secondary opacity-90'>
                {"hmm... looks like you haven't post anything yet"}
              </p>
            </div>
          )}
        </Stack>
      )}
    </div>
  );
};

export default VoteTab;
