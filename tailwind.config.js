/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ibm: ['IBM Plex Sans', 'sans-serif'],
      noto: ['Noto Sans', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem', // 12px
      13: '0.813rem', // ~13px
      sm: '0.875rem', // 14px
      15: '0.938rem', // ~15px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      screens: {
        mobile: { max: '480px' },
        mdu: { min: '750px' },
        mdd: { max: '750px' },
        lgu: { min: '1024px' }, // large up
        lgd: { max: '1020px' }, // large down
        stu: { min: '1366px' },
        std: { max: '1366px' },
        xlu: { min: '1536px' }, // extra large up
        xld: { max: '1536px' }, // extra large down
        slgu: { min: '1700px' }, // super large up
      },
      spacing: {
        small: '640px',
        medium: '977px',
        large: '1364px',
      },
      maxWidth: {
        small: '640px',
        medium: '976px',
        large: '1364px',
      },
      colors: {
        oran: 'hsl(16, 100%, 54%)',
        oran_hover: 'hsl(16, 100%, 64%)',
        blue: 'hsl(205, 98%, 39%)',
        blue_hover: 'hsl(205, 98%, 19%)',
        divider: '#cccccc',
        typo: {
          primary: '#222222',
          secondary: '#7e8183',
        },
        sections: {
          default: '#dae0e6',
          paper: '#ffffff',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
