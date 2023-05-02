import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

import NotFound from 'src/components/community/NotFound';
import { Communities } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
type CommunityPageProps = {
  communityData: Communities;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  if (!communityData) {
    return <NotFound />;
  }
  return <div>CommunityPage {communityData.id}</div>;
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
