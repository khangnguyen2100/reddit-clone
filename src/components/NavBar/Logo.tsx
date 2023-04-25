import Image from 'next/image';
import { Box } from '@mui/material';

import redditFace from '/public/images/redditFace.svg';
import redditText from '/public/images/redditText.svg';

const Logo = () => {
  return (
    <Box className="flex items-center">
      <Image src={redditFace} alt="logo" width={32} height={32} />
      <Image src={redditText} alt="logo" width={72} height={32} />
    </Box>
  );
};

export default Logo;
