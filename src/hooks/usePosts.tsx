import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Post, PostVotes, communityState, postsState } from 'src/atoms';
import { db, storage } from 'src/firebase/clientApp';

import useCheckUser from './useCheckUser';

const usePosts = () => {
  const router = useRouter();
  const [postsStateValue, setPostStateValue] = useRecoilState(postsState);
  const { user, userSigned } = useCheckUser();
  const communityStateValue = useRecoilValue(communityState);
  const currentCommunity = useRecoilValue(communityState).currentCommunity;
  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
  ) => {
    event.stopPropagation();
    // show log in if user not log in
    const isJoined = communityStateValue.mySnippets?.some(
      item => item.communityId === communityId,
    );
    if (!isJoined) {
      enqueueSnackbar('You need to join community to vote', {
        variant: 'info',
      });
      return;
    }
    if (userSigned()) {
      try {
        const { voteCount } = post;
        const isVoted = postsStateValue.postVotes.find(
          voteItem => voteItem.postId === post.id,
        );
        const batch = writeBatch(db);
        const updatedPost = { ...post };
        let updatedPosts = [...postsStateValue.posts];
        let updatedPostVotes = [...postsStateValue.postVotes];
        let voteChange = vote;

        // new vote
        if (!isVoted) {
          const postVotesRef = doc(
            collection(db, 'users', `${user?.uid}/postVotes`),
          );
          const newVote: PostVotes = {
            id: postVotesRef.id,
            postId: post.id!,
            communityId,
            voteValue: vote, //  1 or -1
          };
          batch.set(postVotesRef, newVote);

          updatedPost.voteCount = voteCount + vote;
          updatedPostVotes = [...updatedPostVotes, newVote];
        } else {
          // voted and update new vote
          const postDocRef = doc(
            db,
            'users',
            `${user?.uid}/postVotes/${isVoted.id}`,
          );
          // un choose up vote or down vote
          if (isVoted.voteValue === vote) {
            // remove vote
            updatedPost.voteCount = voteCount - vote;
            updatedPostVotes = updatedPostVotes.filter(
              vote => vote.id !== isVoted.id,
            );
            batch.delete(postDocRef);

            voteChange *= -1;
          } else {
            // up vote => down vote or opposite
            // update vote
            updatedPost.voteCount = voteCount + vote * 2;
            updatedPostVotes = updatedPostVotes.map(voteItem => {
              if (voteItem.id === isVoted.id) {
                return {
                  ...voteItem,
                  voteValue: vote,
                };
              }
              return voteItem;
            });

            batch.update(postDocRef, {
              voteValue: vote,
            });
            voteChange = 2 * vote;
          }
        }
        // update state, db
        // update post to list posts
        updatedPosts = updatedPosts.map(item => {
          if (item.id === post.id) {
            return updatedPost;
          }
          return item;
        });
        setPostStateValue(prev => ({
          ...prev,
          posts: updatedPosts,
          postVotes: updatedPostVotes,
        }));
        if (postsStateValue.selectedPost) {
          setPostStateValue(prev => ({
            ...prev,
            selectedPost: updatedPost,
          }));
        }
        const posDocRef = doc(db, 'posts', post.id!);
        batch.update(posDocRef, {
          voteCount: voteCount + voteChange,
        });

        await batch.commit();
      } catch (error: any) {
        console.log('error:', error);
        enqueueSnackbar(error?.message, { variant: 'error' });
      }
    }
  };
  const onSelectPost = (post: Post) => {
    // check only click on div element have class post-item
    setPostStateValue(prev => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };
  const onDeletePost = async (post: Post): Promise<boolean> => {
    // check post have image?
    if (post.imageURL) {
      // delete image
      const imageRef = ref(storage, `posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
    // delete post
    const postDocRef = doc(db, 'posts', post.id!);
    await deleteDoc(postDocRef);

    // update state
    setPostStateValue(prev => ({
      ...prev,
      posts: prev.posts.filter(item => item.id !== post.id),
    }));
    return true;
  };
  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(db, 'users', `${user?.uid}/postVotes`),
      where('communityId', '==', communityId),
    );
    const postVotesDocs = await getDocs(postVotesQuery);
    const postVotes = postVotesDocs.docs.map(item => ({
      id: item.id,
      ...item.data(),
    }));
    setPostStateValue(prev => ({
      ...prev,
      postVotes: postVotes as PostVotes[],
    }));
  };

  useEffect(() => {
    if (currentCommunity && user) {
      getCommunityPostVotes(currentCommunity.id);
    }
  }, [currentCommunity, user]);
  useEffect(() => {
    if (!user) {
      // user log out => clear pick vote
      setPostStateValue(prev => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);
  return {
    postsStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
