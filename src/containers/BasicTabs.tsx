import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MultiSelect from '../components/MultiSelect';
import QueryDisplay from '../components/QueryDisplay';
import { TabPanelProps, BasicTabsProps } from '../types';
import LowerLevelTabs from './LowerLevelTabs';
import TreeGraph from '../components/Tree';

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

const BasicTabs = ({ queryOptions, queryEvents }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);

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
        <LowerLevelTabs
          selectedQueries={selectedQueries}
          queryEvents={queryEvents}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Metrics
        <TreeGraph />
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
