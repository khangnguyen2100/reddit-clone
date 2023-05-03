import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { Community } from 'src/atoms';
import { db } from 'src/firebase/clientApp';

type Props = {
  communityData: Community;
};

const Posts = (props: Props) => {
  const { communityData } = props;
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

      console.log('postsData:', postsData);
    } catch (error: any) {
      console.log('Error:', error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
};

export default Posts;
