import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { TabContext } from '@mui/lab';

import useCheckUser from 'src/hooks/useCheckUser';

import PostTab from './PostTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const ActivityTabs = () => {
  const [value, setValue] = React.useState(0);
  console.log('value:', value);
  const { user } = useCheckUser();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='POSTS' />
          <Tab label='COMMENTS' />
          <Tab label='SAVED' />
          <Tab label='UP VOTED' />
          <Tab label='DOWN VOTED' />
        </Tabs>
      </Box>
      <Box className='mt-3'>
        {value === 0 ? (
          <PostTab user={user} />
        ) : value === 1 ? (
          <div>Item Two</div>
        ) : value === 2 ? (
          <div>Item Three</div>
        ) : value === 3 ? (
          <div>Item Four</div>
        ) : value === 4 ? (
          <div>Item Five</div>
        ) : null}
      </Box>
    </Box>
  );
};

export default ActivityTabs;
