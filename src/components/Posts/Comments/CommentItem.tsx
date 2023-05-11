import { CircularProgress, Icon, Stack } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from 'react-icons/io5';

import useConfirm from 'src/hooks/useConfirm';
export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type Props = {
  comment: Comment;
  // eslint-disable-next-line no-unused-vars
  onDeleteComment: (comment: Comment) => void;
  userId: string;
  loadingDelete: boolean;
};

const CommentItem = (props: Props) => {
  const { comment, loadingDelete, onDeleteComment, userId } = props;

  const { ConfirmModal, confirmResult } = useConfirm({
    title: 'Delete Comment',
    message: 'Are you sure you want to delete this comment?',
  });
  const handleDeleteComment = async (comment: Comment) => {
    const ans = await confirmResult();
    if (ans) {
      onDeleteComment(comment);
    }
  };
  return (
    <>
      <Stack spacing={1}>
        <div className='flex items-center'>
          {/* avatar */}
          <div className='mr-2'>
            <Icon
              component={FaReddit}
              className='text-[30px] text-typo-secondary'
            />
          </div>

          {/* name and time created */}
          <Stack
            spacing={0.5}
            direction={'row'}
            className='text-center text-xs'
          >
            <p className='text-typo-primary'> {comment.creatorDisplayName}</p>
            <p>·</p>
            <p className='text-typo-secondary'>
              {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
            </p>
          </Stack>
        </div>
        <p className='block max-w-[70%] pl-2 mdd:pl-1'>{comment.text}</p>
        <div className='flex cursor-pointer items-center gap-x-2 text-center text-typo-secondary'>
          <Icon component={IoArrowUpCircleOutline} className='text-xl' />
          <Icon component={IoArrowDownCircleOutline} className='text-xl' />
          {userId === comment.creatorId && (
            <>
              <div className='hover:text-blue'>Edit</div>
              {loadingDelete ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                <div
                  className='hover:text-blue'
                  onClick={() => handleDeleteComment(comment)}
                >
                  Delete
                </div>
              )}
            </>
          )}
        </div>
      </Stack>
      <ConfirmModal />
    </>
  );
};

export default CommentItem;
