import { Skeleton } from '@mui/material';
const LoaderItem = () => {
  return (
    <div className='w-full overflow-hidden bg-gray-200 p-3'>
      <div className='flex-center gap-x-2'>
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
      </div>
      <Skeleton variant='text' sx={{ fontSize: '1.6rem' }} width='100%' />
      <Skeleton variant='rectangular' width={'100%'} height={'40vh'} />
    </div>
  );
};
const PostLoader = () => {
  return (
    <div className='mt-5 flex flex-col gap-y-3'>
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </div>
  );
};

export default PostLoader;
