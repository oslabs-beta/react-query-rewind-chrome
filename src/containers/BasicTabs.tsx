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
import ComponentTree from '../components/Tree';
import ProfilingToggle from '../components/ProfilingToggle';

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

  const [idk, setIdk] = useState<any[]>([]);
  //state for navigating between tree and charts
  const [view, setView] = useState<string>("treeView");
  //state for recording status, default to false;
  const [recStat, setRecStat] = useState<boolean>(false);
  const [recButton, setRecButton] = useState<string>("START PROFILING");
  const [chartData, setChartData] = useState<any[]>([]);

  const setStatus = () => {
    setRecStat((prevRecStat) => !prevRecStat);
  };

  function sendMessageToContentScript(message: any) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  //update recButton according to recStat
  useEffect(() => {
    if (!recStat) {
      setRecButton("Start profiling");
      sendMessageToContentScript({
        message: `Hello from popup! ${idk.length}`,
      });
      setChartData([...idk]);
    } else {
      setRecButton("Stop profiling");
      sendMessageToContentScript({
        message: `Hello from popup! ${idk.length}`,
      });
    }
  }, [recStat]);

  useEffect(() => {
    const msgListener = (request: any, sender: any, sendResponse: any) => {
      if (recStat) {
        console.log("inside use effect", JSON.parse(request.data));
        switch (request.action) {
          case "EVENT_LIST":
            setIdk([...JSON.parse(request.data)]);
            break;
        }
      }
    };

    chrome.runtime.onMessage.addListener(msgListener);

    return () => {
      chrome.runtime.onMessage.removeListener(msgListener);
    };
  }, [recStat]);

return (
  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Query" {...a11yProps(0)} />
        <Tab label="Metrics" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <MultiSelect onSelectionChange={handleSelectionChange} queryOptions={queryOptions} />
        <LowerLevelTabs selectedQueries={selectedQueries} queryEvents={queryEvents} />
      </div>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <ProfilingToggle onClick={() => setStatus()}>{recButton}</ProfilingToggle>
        <div className="ct"></div>
        {view === "treeView" && <ComponentTree fiberTree={idk[idk.length - 1]} />}
      </div>
    </CustomTabPanel>
  </Box>
);
};

export default BasicTabs;
