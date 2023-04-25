import { Box } from '@mui/material';

import Logo from './Logo';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const NavBar = () => {
  return (
    <Box className={'bg-sections-paper w-full'}>
      <Box
        className={
          'navbar flex items-center justify-between px-1 mx-auto max-w-large'
        }
      >
        <Logo />
        <SearchInput />
        <RightContent />
      </Box>
    </Box>
  );
};

export default NavBar;
