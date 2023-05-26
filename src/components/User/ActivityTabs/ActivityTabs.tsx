import { Box, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import useCheckUser from 'src/hooks/useCheckUser';

import PostTab from './PostTab';
import CommentsTab from './CommentTab';
import VoteTab from './VoteTab';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const ActivityTabs = () => {
  const [value, setValue] = React.useState(0);
  const { user } = useCheckUser();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();

  const handleChangeIndex = (index: number) => {
    setValue(index);
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
          {/* <Tab label='SAVED' /> */}
          <Tab label='UP VOTED' />
          <Tab label='DOWN VOTED' />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PostTab user={user} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CommentsTab user={user} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <VoteTab user={user} voteType='upVote' />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <VoteTab user={user} voteType='downVote' />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

export default ActivityTabs;
