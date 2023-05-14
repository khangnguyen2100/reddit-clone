import React from 'react';
interface Props {
  children: React.ReactNode;
}
const PageContent = ({ children }: Props) => {
  const [left, right] = children as [React.ReactNode, React.ReactNode];
  return (
    <div className='mx-auto flex w-full max-w-medium justify-center py-4 lgd:px-4'>
      {/* left */}
      <div className='mr-3 flex h-auto w-full flex-col md:w-[65.57377049%] lgd:mr-0'>
        {left}
      </div>
      {/* right */}
      <div className='ml-3 flex w-[34.42622951%] flex-col lgd:hidden'>
        {right}
      </div>
    </div>
  );
};

export default PageContent;
