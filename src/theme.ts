import { Open_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#ff5414',
          },
          secondary: {
            main: '#0272c4',
          },
          divider: '#cccccc',
          text: {
            primary: '#222222', // headings
            secondary: '#7e8183', // text
            contrastText: '#222222',
          },
          background: {
            default: '#dae0e6',
            paper: '#ffffff',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#ff5414',
          },
          secondary: {
            main: '#c8cbcd',
          },
          divider: '#343536',
          text: {
            primary: '#d7dadc', // headings
            secondary: '#888a8c', // text
            contrastText: '#d7dadc',
          },
          background: {
            default: '#030303',
            paper: '#1a1a1b',
          },
        }),
  },
});
const palette = getDesignTokens('light').palette;

// Create a theme instance.
const theme = createTheme({
  palette,
  typography: {
    fontFamily: openSans.style.fontFamily,
    h1: {
      color: palette.text.contrastText,
    },
    h2: {
      color: palette.text.contrastText,
    },
    h3: {
      color: palette.text.contrastText,
    },
    h4: {
      color: palette.text.contrastText,
    },
  },
  spacing: 4,
});

export default theme;
