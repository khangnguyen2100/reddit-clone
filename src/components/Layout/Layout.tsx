import { Icon } from '@mui/material';
import { BsArrowUp } from 'react-icons/bs';
import React from 'react';
import clsx from 'clsx';

import NavBar from 'src/components/NavBar/Navbar';
// import Footer from './footer';
type Props = {
  children: React.ReactNode;
};
const BackToTop = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 600) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 transition-all duration-300 md:bottom-8 md:right-8',
        show ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0',
      )}
    >
      <div
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className='cursor-pointer rounded-full bg-blue p-3 shadow-md'
      >
        <Icon component={BsArrowUp} className='text-2xl text-white' />
      </div>
    </div>
  );
};
export default function Layout({ children }: Props) {
  return (
    <div className={'relative flex min-h-screen flex-col bg-sections-default'}>
      <NavBar />
      <main>{children}</main>
      <BackToTop />
    </div>
  );
}
