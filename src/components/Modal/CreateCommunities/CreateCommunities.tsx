import CloseIcon from '@mui/icons-material/Close';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Icon,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

import { ButtonBg } from 'src/components/common';
import { db } from 'src/firebase/clientApp';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type CommunityType = {
  name: string;
  label: string;
  description: string;
  icon: React.ElementType;
};
const communityType: CommunityType[] = [
  {
    name: 'public',
    label: 'Public',
    description: 'Anyone can view, post, and comment to this community',
    icon: BsFillPersonFill,
  },
  {
    name: 'restricted',
    label: 'Restricted',
    description:
      'Anyone can view this community, but only approved users can post',
    icon: BsFillEyeFill,
  },
  {
    name: 'private',
    label: 'Private',
    description: 'Only approved users can view and submit to this community',
    icon: HiLockClosed,
  },
];
const CreateCommunities = (props: Props) => {
  const { open, setOpen } = props;
  const totalCharactersRemaining = 21;
  const [communityName, setCommunityName] = useState<string>('');
  const [charactersRemaining, setCharactersRemaining] = useState(
    totalCharactersRemaining,
  );
  const [communityTypeValue, setCommunityTypeValue] = useState('public');
  const [error, setError] = useState<string>('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > totalCharactersRemaining) return;
    setCommunityName(e.target.value);
    setCharactersRemaining(totalCharactersRemaining - e.target.value.length);
  };
  const handleCreateCommunity = async () => {
    // check if community name is have special characters
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!regex.test(communityName)) {
      setError(
        'Community names can only contain letters, numbers, or underscores',
      );
      return;
    }
    // check if community name is empty
    if (communityName.length === 0) {
      setError('Community name cannot be empty');
      return;
    }
    // check if community name is less than 3 characters
    if (communityName.length < 3 || communityName.length > 21) {
      setError('Community name must be between 3–21 characters');
      return;
    }
    // check if community name is already taken
    const communityDocRef = doc(db, 'communities', communityName);
    const communityDoc = await getDoc(communityDocRef);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      classes={{
        paper: 'pt-4',
      }}
    >
      <div className='flex items-center justify-between px-4'>
        <DialogTitle className='p-0 text-xl font-medium'>
          Create a community
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            color: theme => theme.palette.grey[500],
            width: 'fit-content',
            height: 'fit-content',
            margin: 0,
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Divider className='my-4  px-4' />

      <DialogContent className='w-full  px-4'>
        {/* Name and info */}
        <div className='mb-5'>
          <Typography className='block font-ibm font-medium text-typo-primary'>
            Name
          </Typography>
          <div className='flex items-center'>
            <Typography className='mr-2 text-xs text-typo-secondary'>
              Community names including capitalization cannot be changed.
            </Typography>
            {/* info icon */}
            <Tooltip
              title='Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme").'
              arrow
              classes={{
                tooltip: 'bg-black w-[216px] mdd:w-auto text-white text-xs',
              }}
            >
              <IconButton>
                <AiOutlineInfoCircle
                  color='text-primary-secondary'
                  fontSize={15}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {/* input */}
        <div className='w-full'>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>r/</InputAdornment>
              ),
            }}
            onChange={handleChange}
            value={communityName}
          />
          <Typography
            className={clsx(
              'mt-2 block text-xs',
              charactersRemaining === 0
                ? 'text-red-500'
                : 'text-typo-secondary',
            )}
          >
            {/* Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores. */}
            {charactersRemaining} Characters remaining
          </Typography>
        </div>
        {/* community type */}
        <FormControl className='mb-12 mt-8'>
          <FormLabel className='block font-ibm font-medium !text-typo-primary'>
            Community type
          </FormLabel>
          <RadioGroup
            value={communityTypeValue}
            defaultValue={communityTypeValue}
            onChange={e => setCommunityTypeValue(e.target.value)}
          >
            {communityType.map(item => {
              return (
                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={<Radio />}
                  label={
                    <div className='flex items-center gap-x-2'>
                      <Icon
                        as={item.icon}
                        className='text-xl text-typo-secondary'
                        component={item.icon}
                      />
                      <div className='flex items-baseline gap-x-2'>
                        <Typography className='font-medium text-typo-primary'>
                          {item.label}
                        </Typography>
                        <Typography className='text-xs text-typo-secondary'>
                          {item.description}
                        </Typography>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        {/* adult content */}
        <FormControl>
          <FormLabel className='block font-ibm font-medium !text-typo-primary'>
            Adult content
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <div className='flex items-center gap-x-2'>
                  <Typography className='bg-red-400 px-1  py-[2px] text-xs font-medium text-white'>
                    NSFW
                  </Typography>
                  <Typography className='font-medium  text-typo-primary'>
                    18+ year old community
                  </Typography>
                </div>
              }
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions className='bg-gray-200 py-4'>
        <ButtonBg
          className='!bg-transparent px-3 !text-blue'
          outline
          background='blue'
        >
          Cancel
        </ButtonBg>
        <ButtonBg
          className='px-3'
          background='blue'
          onClick={handleCreateCommunity}
        >
          Create Community
        </ButtonBg>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCommunities;
