import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

import { Post } from 'src/atoms';
import PageContent from 'src/components/Layout/PageContent';
import Comments from 'src/components/Posts/Comments/Comments';
import PostItem from 'src/components/Posts/PostItem';
import About from 'src/components/community/About';
import { db } from 'src/firebase/clientApp';
import useCheckUser from 'src/hooks/useCheckUser';
import usePosts from 'src/hooks/usePosts';

const CommunityPage = () => {
  const router = useRouter();
  const { onDeletePost, onVote, postsStateValue, setPostStateValue } =
    usePosts();

  const { user } = useCheckUser();
  const fetchPostById = async (postId: string) => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postDocRef);
      const postData = {
        id: postDoc.id,
        ...postDoc.data(),
      };
      setPostStateValue(prev => ({
        ...prev,
        selectedPost: postData as Post,
      }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  useEffect(() => {
    const { postId } = router.query;

    if (postId && !postsStateValue.selectedPost) {
      fetchPostById(postId as string);
    }
  }, [router.query, postsStateValue.selectedPost]);

  return (
    <>
      <Head>
        <title>{postsStateValue.selectedPost?.title}</title>
      </Head>
      {postsStateValue.selectedPost && (
        <PageContent>
          <>
            <PostItem
              post={postsStateValue.selectedPost}
              onVote={onVote}
              onDeletePost={onDeletePost}
              isCreator={user?.uid === postsStateValue.selectedPost?.creatorId}
              voteValue={
                postsStateValue.postVotes.find(
                  item => item.postId === postsStateValue.selectedPost?.id,
                )?.voteValue
              }
              key={postsStateValue.selectedPost?.id}
            />
            <Comments
              user={user}
              selectedPost={postsStateValue.selectedPost}
              communityId={router.query.communityId as string}
            />
          </>
          <>
            <About />
          </>
        </PageContent>
      )}
    </>
  );
};

export default CommunityPage;
