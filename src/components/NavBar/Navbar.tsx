import { Box } from '@mui/material';

import Logo from './Logo';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const NavBar = () => {
  return (
    <Box className={'w-full bg-sections-paper'}>
      <Box
        className={'mx-auto flex w-full items-center justify-between px-4 py-1'}
      >
        <Logo />
        <SearchInput />
        <RightContent />
      </Box>
    </Box>
  );
};

export default NavBar;
