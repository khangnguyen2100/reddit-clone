import { Divider } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

import PageContent from 'src/components/Layout/PageContent';
import NewPostForm from 'src/components/Posts/NewPostForm';
import { auth } from 'src/firebase/clientApp';

const SubmitPage = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <h1 className='mb-2 mt-6 text-lg font-medium text-typo-primary'>
          Create a post
        </h1>
        <Divider className='my-2 border-[#edeff1]' />
        {user && <NewPostForm user={user} />}
      </>
      <>{/* info */}</>
    </PageContent>
  );
};

export default SubmitPage;
