import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BasicTabsProps } from '../types';
import CustomTabPanel from '../components/CustomTabPanel';
import a11yProps from '../functions/a11yProps';
import MetricsTab from './MetricsTab';
import QueriesTab from './QueriesTab';

const ParentTab = ({ queryEvents, selectedQueries }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="QUERIES" {...a11yProps(0)} />
          <Tab label="METRICS" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <QueriesTab
          selectedQueries={selectedQueries}
          queryEvents={queryEvents}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <MetricsTab />
      </CustomTabPanel>
    </Box>
  );
};

export default ParentTab;
