import { Skeleton } from '@mui/material';
const LoadingItem = () => {
  return (
    <div className='w-full overflow-hidden bg-gray-200 p-3'>
      <Skeleton variant='rectangular' width={'20vh'} height={'20vh'} />
      <div>
        <div className='flex-center gap-x-2'>
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
        </div>
        <Skeleton variant='text' sx={{ fontSize: '1.6rem' }} width='100%' />
      </div>
    </div>
  );
};
const Loading = () => {
  return (
    <div className='mt-5 flex flex-col gap-y-3'>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </div>
  );
};

export default Loading;
