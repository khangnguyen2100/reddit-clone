import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { useSetRecoilState } from 'recoil';
import Head from 'next/head';

import { Community, communityState } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import { Header, NotFound, CreatePostLink } from 'src/components/community';
import PageContent from 'src/components/Layout/PageContent';
import Posts from 'src/components/Posts/Posts';
import About from 'src/components/community/About';
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  const setCommunityState = useSetRecoilState(communityState);
  useEffect(() => {
    setCommunityState(prev => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <title>{`${communityData.id} Community`}</title>
      </Head>
      <Header data={communityData} />
      <PageContent>
        <>
          <CreatePostLink data={communityData} />
          <Posts communityData={communityData} />
        </>
        <>
          <About />
        </>
      </PageContent>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to client
  try {
    const communityName = context.query.communityId as string;

    const communityDocRef = doc(db, 'communities', communityName);
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              }),
            )
          : '',
      },
    };
  } catch (error) {
    // add error page here later.
    console.log('Error: from getServerSideProps communityId Page', error);
  }
}

export default CommunityPage;
