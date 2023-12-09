import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BasicTabsProps } from '../types';
import CustomTabPanel from '../components/CustomTabPanel';
import a11yProps from '../functions/a11yProps';
import MetricsTab from './MetricsTab';
import QueriesTab from './QueriesTab';
import SettingsTab from './SettingsTab';

const ParentTab = ({ queryEvents, selectedQueries }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='QUERIES' {...a11yProps(0)} />
          <Tab label='METRICS' {...a11yProps(1)} />
          <Tab label='SETTINGS' {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <CustomTabPanel value={value} index={0}>
          <QueriesTab
            selectedQueries={selectedQueries}
            queryEvents={queryEvents}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <MetricsTab 
          queryEvents={queryEvents} selectedQueries={selectedQueries}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <SettingsTab />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ParentTab;
