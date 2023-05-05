import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';

import { Post, postState } from 'src/atoms';
import { db, storage } from 'src/firebase/clientApp';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
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
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
