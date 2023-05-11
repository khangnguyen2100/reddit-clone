import { Icon, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';

import { DirectoryMenuItem } from 'src/atoms/directoryAtom';
import useDirectory from 'src/hooks/useDirectory';

const MenuListItem = (props: DirectoryMenuItem) => {
  const { imageURL, displayText, icon } = props;

  const { onSelectMenuItem, toggleDirectoryOpenMenu } = useDirectory();
  const handleClick = () => {
    onSelectMenuItem(props);
    toggleDirectoryOpenMenu();
  };
  return (
    <MenuItem
      className='flex w-full items-center gap-x-2 px-6 py-[10px]'
      onClick={handleClick}
    >
      {imageURL ? (
        <div className='relative m-1 h-4 w-4 overflow-hidden rounded-full'>
          <Image src={imageURL} alt={`${displayText}-avatar`} fill />
        </div>
      ) : (
        <div className='m-1'>
          <Icon component={icon} className={'text-xl text-blue'} />
        </div>
      )}
      <Typography className='text-sm text-typo-primary'>
        {displayText}
      </Typography>
    </MenuItem>
  );
};

export default MenuListItem;
