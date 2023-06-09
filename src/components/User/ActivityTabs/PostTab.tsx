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

const PostTab = (props: Props) => {
  const { user } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { onSelectPost, onVote, postsStateValue, setPostStateValue } =
    usePosts();
  const getPosts = async () => {
    setLoading(true);
    try {
      const postDocs = await getDocs(
        query(
          collection(db, 'posts'),
          where('creatorId', '==', user?.uid),
          orderBy('createdAt', 'desc'),
        ),
      );
      const posts = postDocs.docs.map(item => ({
        id: item.id,
        ...item.data(),
      })) as Post[];
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }));
      getUserPostVote(posts);
    } catch (error) {
      console.log('error:', error);
    }
    setLoading(false);
  };
  const getUserPostVote = async (posts: Post[]) => {
    try {
      const postsIds = posts.map(post => post.id);
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
    if (user?.uid) {
      getPosts();
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

export default PostTab;
