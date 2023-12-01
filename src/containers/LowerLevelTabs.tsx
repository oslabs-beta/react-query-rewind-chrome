import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { TabPanelProps, BasicTabsProps, QueryDisplayProps } from '../types';
import QueryDisplay from '../components/QueryDisplay'
import JsonDiff from '../components/JsonDiff'
import DiffDisplay from '../components/DiffDisplay'

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

const LowerLevelTabs = ({ selectedQueries, queryEvents }: QueryDisplayProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='State'/>
          <Tab label='Diff'/>
        </Tabs>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <QueryDisplay
          selectedQueries={selectedQueries}
          queryEvents={queryEvents}
        />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <DiffDisplay selectedQueries={selectedQueries} queryEvents={queryEvents}/>
      </CustomTabPanel>
    </div>
  )
}

export default LowerLevelTabs