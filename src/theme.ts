import { createTheme } from '@mui/material/styles';
import { Noto_Sans, IBM_Plex_Sans } from 'next/font/google';

export const notoSans = Noto_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
export const imbPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: imbPlexSans.style.fontFamily,
    fontSize: 14,
    h1: {
      fontFamily: notoSans.style.fontFamily,
    },
    h2: {
      fontFamily: notoSans.style.fontFamily,
    },
    h3: {
      fontFamily: notoSans.style.fontFamily,
    },
  },
});

export default theme;
