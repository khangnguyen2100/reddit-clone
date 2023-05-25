import { Stack } from '@mui/material';
import Head from 'next/head';

import getUserDisplayName from '@/utils/getUserDisplayName';
import PageContent from 'src/components/Layout/PageContent';
import ActivityTabs from 'src/components/User/ActivityTabs/ActivityTabs';
import ModeratorList from 'src/components/User/ModeratorList';
import Profile from 'src/components/User/Profile';
import useCheckUser from 'src/hooks/useCheckUser';

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
