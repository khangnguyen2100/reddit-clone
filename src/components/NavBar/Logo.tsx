import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import redditFace from '/public/images/redditFace.svg';
import redditText from '/public/images/redditText.svg';

const Logo = () => {
  return (
    <Box component={Link} href='/' className='flex items-center gap-x-2'>
      <Image src={redditFace} alt='logo' width={32} />
      <Image src={redditText} alt='logo' width={57} className='mdd:hidden' />
    </Box>
  );
};

export default Logo;
