import Box from '@mui/material/Box';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';

import Link from 'src/Link';
import ProTip from 'src/ProTip';
import Copyright from 'src/Copyright';
import { authModalState } from 'src/atoms';
export default function Home() {
  const authModal = useRecoilValue(authModalState);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color={'blue'} component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Link href="/about" color="secondary">
          {authModal.open ? 'open' : 'close'}
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
