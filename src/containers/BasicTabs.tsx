import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MultiSelect from '../components/MultiSelect';
import { QueryKey } from '@tanstack/react-query';
import QueryDisplay from '../components/QueryDisplay';
//import ContinuousSlider from '../components/ContinuousSlider';
// import IconButtonSizes from '../components/Buttons';
//import PlayButton from '../components/PlayButton';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

type BasicTabsProps = {
  queryData: QueryData;
  queryOptions: string[];
};

type QuerySnapshot = {
  [queryHash: string]: QueryEvent;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Container>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ queryData, queryOptions }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);
  const [combinedUpdates, setCombinedUpdates] = useState<QueryEvent[]>([]);

  useEffect(() => {
    // Combine updates from selected queries and sort them by timestamp
    const updates = Object.entries(queryData)
      .filter(([queryName]) => selectedQueries.includes(queryName))
      .flatMap(([, data]) => data.updates)
      .sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateA.getTime() - dateB.getTime();
      });

    setCombinedUpdates(updates);
  }, [queryData, selectedQueries]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSelectionChange = (queries: string[]) => {
    setSelectedQueries(queries);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Query" {...a11yProps(0)} />
          <Tab label="Metrics" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MultiSelect
          onSelectionChange={handleSelectionChange}
          queryOptions={queryOptions}
        />
        {/* insert time traveling code here but we need access to data from Multiselect */}
        <QueryDisplay
          combinedUpdates={combinedUpdates}
          selectedQueries={selectedQueries}
          queryData={queryData}
        />
        <Box sx={{ display: 'flex' }}>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Metrics
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
