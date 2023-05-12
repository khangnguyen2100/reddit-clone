import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

import {
  Community,
  CommunitySnippet,
  Post,
  PostVotes,
  authModalState,
  communityState,
} from 'src/atoms';
import { auth, db } from 'src/firebase/clientApp';

import usePosts from './usePosts';

const useCommunityData = () => {
  const router = useRouter();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { setPostStateValue } = usePosts();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean,
  ) => {
    // if user not signed in? => open login modal
    if (!user?.uid) {
      setAuthModalState({
        open: true,
        view: 'login',
      });
      return;
    }
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const getMySippets = async () => {
    setLoading(true);
    try {
      // get all commonitySnippets in user and store to state
      const snippetDocs = await getDocs(
        collection(db, `users/${user?.uid}/communitySnippets`),
      );
      const snippets = snippetDocs.docs.map(doc => ({
        ...doc.data(),
      })) as CommunitySnippet[];
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: snippets,
        snippetsFetch: true,
      }));
    } catch (error: any) {
      setError(`Error from getMySippets at useCommunityData: ${error.message}`);
    }
    setLoading(false);
  };
  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    try {
      // batch write method
      const batch = writeBatch(db);

      // create user communitySnippets
      const newSnippets: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || '',
        isModerator: user?.uid === communityData.creatorId,
      };
      const newCommunity: Community = {
        ...communityData,
        numberOfMembers: communityData.numberOfMembers + 1,
      };
      batch.set(
        doc(db, `users/${user?.uid}/communitySnippets`, communityData.id),
        newSnippets,
      );

      // update amount member
      batch.update(doc(db, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();
      // update state
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [...(prev.mySnippets || []), newSnippets],
        currentCommunity: newCommunity,
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(db);
      // remove communitySnippets from user
      batch.delete(
        doc(db, `users/${user?.uid}/communitySnippets`, communityId),
      );
      // update amount member
      batch.update(doc(db, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });

      // get all postVotes
      const postVotesDocs = await getDocs(
        collection(db, `users/${user?.uid}/postVotes`),
      );
      const postVotesData = postVotesDocs.docs.map(doc => ({
        ...doc.data(),
      })) as PostVotes[];

      // get all posts
      const postsDocs = await getDocs(
        query(
          collection(db, 'posts'),
          where('communityId', '==', communityId),
          orderBy('createdAt', 'desc'),
        ),
      );
      const postsData = postsDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      // update voteCount in post
      const postsUpdated = postsData.map(post => {
        const postVoted = postVotesData.find(vote => vote.postId === post.id);
        if (postVoted) {
          // delete vote in post
          post.voteCount -= postVoted.voteValue;
          const postDocRef = doc(db, `posts/${post.id}`);
          batch.update(postDocRef, {
            voteCount: increment(-postVoted.voteValue),
          });
        }
        return post;
      });
      // update state
      setPostStateValue(prev => ({
        ...prev,
        posts: postsUpdated,
        postVotes: [],
      }));

      // delete postVotes from user on firebase
      postVotesData.forEach(vote => {
        const postVoteDocRef = doc(
          db,
          `users/${user?.uid}/postVotes/${vote.id}`,
        );
        batch.delete(postVoteDocRef);
      });
      // // update amount member
      // batch.update(doc(db, 'communities', communityId), {
      //   numberOfMembers: increment(-1),
      // });
      await batch.commit();
      // update state
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: prev.mySnippets?.filter(
          item => item.communityId !== communityId,
        ),
        currentCommunity: {
          ...prev.currentCommunity,
          numberOfMembers: prev.currentCommunity?.numberOfMembers! - 1,
        } as Community,
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const isUserJoinedCommunity = (communityId: string) => {
    if (!user) return false;
    return communityStateValue.mySnippets?.some(
      item => item.communityId === communityId,
    );
  };
  const getCurrentCommunity = async (communityId: string) => {
    try {
      const communityDocRef = doc(db, 'communities', communityId);
      const communityDoc = await getDoc(communityDocRef);
      const communityData = {
        id: communityDoc.id,
        ...communityDoc.data(),
      };
      setCommunityStateValue(prev => ({
        ...prev,
        currentCommunity: communityData as Community,
      }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    // run after user change log-in/log-out
    if (!user) {
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [],
        snippetsFetch: false,
      }));
      return;
    }
    getMySippets();
  }, [user]);
  useEffect(() => {
    const { communityId } = router.query;
    if (communityId && !communityStateValue.currentCommunity) {
      getCurrentCommunity(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);
  return {
    communityStateValue,
    setCommunityStateValue,
    toggleJoinOrLeaveCommunity,
    loading,
    error,
    isUserJoinedCommunity,
  };
};

export default useCommunityData;
