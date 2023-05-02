import React from 'react';
interface Props {
  children: React.ReactNode;
}
const PageContent = ({ children }: Props) => {
  const [left, right] = children as [React.ReactNode, React.ReactNode];
  return (
    <div className='flex justify-center py-4'>
      <div className='flex w-full max-w-medium justify-center gap-y-6 mdd:gap-0'>
        {/* left */}
        <div className='flex w-full flex-col md:w-[65%]'>{left}</div>
        {/* right */}
        <div className='flex grow flex-col mdd:hidden'>{right}</div>
      </div>
    </div>
  );
};

export default PageContent;
