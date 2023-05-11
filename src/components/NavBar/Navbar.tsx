import { Box } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from 'src/firebase/clientApp';

import Directory from './Directory/Directory';
import Logo from './Logo';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const NavBar = () => {
  const [user] = useAuthState(auth);
  return (
    <Box className={'w-full bg-sections-paper'}>
      <Box
        className={'mx-auto flex w-full items-center justify-between px-4 py-1'}
      >
        <Logo />
        {user && <Directory />}
        <SearchInput user={user} />
        <RightContent />
      </Box>
    </Box>
  );
};

export default NavBar;
