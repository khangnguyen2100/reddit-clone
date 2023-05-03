import React from 'react';
interface Props {
  children: React.ReactNode;
}
const PageContent = ({ children }: Props) => {
  const [left, right] = children as [React.ReactNode, React.ReactNode];
  return (
    <div className='mx-auto flex w-full max-w-medium justify-center py-4'>
      {/* left */}
      <div className='mr-3 flex w-full h-auto flex-col md:w-[65.57377049%] mdd:mr-0'>
        {left}
      </div>
      {/* right */}
      <div className='ml-3 flex w-[34.42622951%] flex-col mdd:hidden'>
        {right}
      </div>
    </div>
  );
};

export default PageContent;
