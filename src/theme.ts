import { createTheme } from '@mui/material/styles';
import { Open_Sans } from 'next/font/google';

export const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
    fontSize: 14,
  },
});

export default theme;
