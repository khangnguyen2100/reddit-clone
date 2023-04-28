import NavBar from 'src/components/NavBar/Navbar';
// import Footer from './footer';
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={'flex min-h-screen flex-col bg-sections-default'}>
      <NavBar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
