import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { QueryTabProps } from '../types';
import QueryDisplay from '../components/QueryDisplay';
import DiffDisplay from '../components/DiffDisplay';
import CustomTabPanel from '../components/CustomTabPanel';

const QueryTab = ({ selectedQueries, queryEvents }: QueryTabProps) => {
  // const [activeTab, setActiveTab] = useState(0);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setActiveTab(newValue);
  // };

  return (
    <QueryDisplay selectedQueries={selectedQueries} queryEvents={queryEvents} />

    // <div>
    //   <Box sx={{ width: '100%' }}>
    //     <Tabs value={activeTab} onChange={handleTabChange}>
    //       <Tab label="State" />
    //       <Tab label="Diff" />
    //     </Tabs>
    //   </Box>
    //   <CustomTabPanel value={activeTab} index={0}>
    //     <QueryDisplay
    //       selectedQueries={selectedQueries}
    //       queryEvents={queryEvents}
    //     />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={activeTab} index={1}>
    //     <DiffDisplay
    //       selectedQueries={selectedQueries}
    //       queryEvents={queryEvents}
    //     />
    //   </CustomTabPanel>
    // </div>
  );
};

export default QueryTab;
