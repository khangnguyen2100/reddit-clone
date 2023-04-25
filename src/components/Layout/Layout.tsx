import NavBar from 'src/components/NavBar/Navbar';
// import Footer from './footer';
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={'flex flex-col min-h-screen bg-sections-default'}>
      <NavBar />
      <div className="h-[100px] w-[100px] bg-black"></div>
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
