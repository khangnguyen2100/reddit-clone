import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  Community,
  CommunitySnippet,
  authModalState,
  communityState,
} from 'src/atoms';
import { auth, db } from 'src/firebase/clientApp';

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

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
      await batch.commit();
      // update state
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: prev.mySnippets?.filter(
          item => item.communityId !== communityId,
        ),
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    // run after user change log-in/log-out
    if (user?.uid) getMySippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { communityStateValue, toggleJoinOrLeaveCommunity, loading, error };
};

export default useCommunityData;
