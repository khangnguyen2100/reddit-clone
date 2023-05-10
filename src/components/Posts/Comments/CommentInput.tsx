import { Icon, TextField } from '@mui/material';
import type { User } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { MdAdd } from 'react-icons/md';

import { authModalState } from 'src/atoms';
import { ButtonBg } from 'src/components/common';
type Props = {
  commentText: string;
  // eslint-disable-next-line no-unused-vars
  setCommentText: (value: string) => void;
  loading: boolean;
  user?: User | null;
  // eslint-disable-next-line no-unused-vars
  onCreateComment: (commentText: string) => void;
};

const CommentInput = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { commentText, user, loading, onCreateComment, setCommentText } = props;
  return (
    <div className='relative mt-5 flex flex-col'>
      {user ? (
        <>
          <div className='mb-1'>
            Comment as{' '}
            <span className='cursor-pointer font-medium text-blue hover:underline'>
              {user.displayName}
            </span>
          </div>
          <TextField
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder='What are your thoughts?'
            multiline
            classes={{
              root: 'bg-sections-paper',
            }}
            sx={{
              width: '100%',
              fontSize: '1.4rem',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '4px',
                  fontSize: '1.4rem',
                  border: '#ccc 1px solid',
                },
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  minHeight: '120px',
                  paddingBottom: '40px',
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'secondary.main',
                },
              },
            }}
          />
          <div className='absolute bottom-[1px] right-[1px] flex justify-end rounded-b px-2 py-[6px]'>
            <ButtonBg
              onClick={() => onCreateComment(commentText)}
              disabled={!commentText.length}
              loading={loading}
              color='blue'
              className='text-xs'
            >
              Comment
            </ButtonBg>
          </div>
        </>
      ) : (
        <div className=''>
          <ButtonBg
            color='orange'
            className='text-xs'
            onClick={() => {
              setAuthModalState({
                open: true,
                view: 'login',
              });
            }}
          >
            <Icon component={MdAdd} className='mr-1 !text-white' />
            Add a Comment
          </ButtonBg>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
{
  /* <div className='flex'>
      <div className='mr-2'>
        <Icon
          component={FaReddit}
          className='text-[30px] text-typo-secondary'
        />
      </div>
      <Stack spacing={1}>
        <Stack direction='row' className='text-center text-xs' spacing={2}>
          <h4 className='cursor-pointer font-bold hover:underline'>
            {user.creatorDisplayText}
          </h4>
          {comment.createdAt?.seconds && (
            <p className='text-gray-600'>
              {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </p>
          )}
          {loading && <CircularProgress />}
        </Stack>
        <p className='font-xs'>{comment.text}</p>
        <Stack
          direction='row'
          className='cursor-pointer text-center font-semibold text-gray-500'
        >
          <Icon component={IoArrowUpCircleOutline} />
          <Icon component={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <p className='text-xs hover:text-blue'>Edit</p>
              <p
                className='text-xs hover:text-blue'
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </p>
            </>
          )}
        </Stack>
      </Stack>
</div> */
}
