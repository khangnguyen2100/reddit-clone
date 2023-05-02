import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

import NotFound from 'src/components/community/NotFound';
import { Community } from 'src/atoms';
import { db } from 'src/firebase/clientApp';
import Header from 'src/components/community/Header';
import PageContent from 'src/components/Layout/PageContent';
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  if (!communityData) {
    return <NotFound />;
  }
  return (
    <>
      <Header data={communityData} />
      <PageContent>
        <>
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
            non.
          </h1>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            tenetur commodi inventore quaerat vero maxime atque excepturi
            molestias quibusdam nostrum, blanditiis neque, aut praesentium
            tempore. Neque impedit cumque quaerat ad?
          </div>
        </>
        <>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nihil
            consectetur commodi fuga totam officia?
          </h2>
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
