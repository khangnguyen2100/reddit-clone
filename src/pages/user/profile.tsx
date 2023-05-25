import Head from 'next/head';
import React from 'react';

import PageContent from 'src/components/Layout/PageContent';
import useCheckUser from 'src/hooks/useCheckUser';
import getUserDisplayName from '@/utils/getUserDisplayName';
import ActivityTabs from 'src/components/User/ActivityTabs/ActivityTabs';
import Profile from 'src/components/User/Profile';
import ModeratorList from 'src/components/User/ModeratorList';
import { Stack } from '@mui/material';

const Index = () => {
  const { user } = useCheckUser();
  return (
    <div>
      <Head>
        <title>{getUserDisplayName(user)}</title>
      </Head>
      <PageContent>
        <>
          <ActivityTabs />
        </>
        <>
          <Stack spacing={2}>
            <Profile />
            <ModeratorList />
          </Stack>
        </>
      </PageContent>
    </div>
  );
};

export default Index;
