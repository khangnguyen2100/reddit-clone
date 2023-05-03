import React from 'react';
import { Icon } from '@mui/material';
import clsx from 'clsx';

import { TabItemProps } from './NewPostForm';
type Props = {
  item: TabItemProps;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: string) => void;
};
const TabItem = (props: Props) => {
  const { selected, item, setSelected } = props;
  const { title, icon } = item;
  return (
    <div
      className={clsx(
        'flex-center w-1/4 grow cursor-pointer border-b border-r border-solid border-r-gray-200 py-3 last:border-r-transparent hover:bg-gray-100',
        selected
          ? 'border-b-[2px] border-b-blue bg-gray-100'
          : 'border-b-gray-200',
      )}
      onClick={() => setSelected(title)}
    >
      <Icon
        as={icon}
        className={clsx(
          'mr-2 text-xl',
          selected ? 'text-blue' : 'text-typo-secondary',
        )}
        component={icon}
      />
      <p
        className={clsx(
          'font-bold',
          selected ? 'text-blue' : 'text-typo-secondary',
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default TabItem;
