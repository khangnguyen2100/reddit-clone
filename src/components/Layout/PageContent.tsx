import React from 'react';
interface Props {
  children: React.ReactNode;
}
const PageContent = ({ children }: Props) => {
  const [left, right] = children as [React.ReactNode, React.ReactNode];
  return (
    <div className='flex justify-center py-4'>
      <div className='flex w-full max-w-medium justify-center gap-x-6 mdd:gap-0'>
        {/* left */}
        <div className='flex w-full shrink-0 grow flex-col md:w-[65.57377049%]'>
          {left}
        </div>
        {/* right */}
        <div className='flex flex-col mdd:hidden'>{right}</div>
      </div>
    </div>
  );
};

export default PageContent;
