import React, { useState, useEffect } from 'react';
import { QueryTabProps, QueryDisplay } from '../types';
import a11yProps from '../functions/a11yProps';

import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import createDisplayArray from '../functions/createDisplayArray';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '../components/CustomTabPanel';
import SliderSection from '../components/SliderSection';

import StateTab from './StateTab';
import DiffTab from './DiffTab';

const QuereisTab = ({ queryEvents, selectedQueries }: QueryTabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // holds all query events based on selected queries and query events
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);
  // current index of above array
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const [playIcon, setPlayIcon] = useState(
    <PlayArrowIcon fontSize="inherit" />
  );

  // creates array of all states based on selected queries
  useEffect(() => {
    const newQueryDisplay = createDisplayArray(queryEvents, selectedQueries);
    setQueryDisplay(newQueryDisplay);
    setCurrentIndex(0);
  }, [selectedQueries, queryEvents]);

  const handleAutoPlay = () => {
    setIsPlaying(prevIsPlaying => {
      if (!prevIsPlaying) {
        if (currentIndex >= queryDisplay.length - 1) {
          setCurrentIndex(0);
        }

        const newIntervalId = window.setInterval(() => {
          setCurrentIndex(prevIndex => {
            if (prevIndex >= queryDisplay.length - 1) {
              clearInterval(newIntervalId);
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, 1000);

        setIntervalId(newIntervalId);
        return true;
      } else {
        if (intervalId !== undefined) {
          clearInterval(intervalId);
          setIntervalId(undefined);
        }
        return false;
      }
    });
  };

  useEffect(() => {
    if (currentIndex >= queryDisplay.length - 1 && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentIndex, queryDisplay.length, isPlaying]);

  useEffect(() => {
    setPlayIcon(
      isPlaying ? (
        <PauseIcon fontSize="inherit" />
      ) : (
        <PlayArrowIcon fontSize="inherit" />
      )
    );
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="STATE" {...a11yProps(0)} />
            <Tab label="DIFF" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <StateTab queryDisplay={queryDisplay} currentIndex={currentIndex} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DiffTab queryDisplay={queryDisplay} currentIndex={currentIndex} />
        </CustomTabPanel>
      </Box>

      <SliderSection
        queryDisplay={queryDisplay}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        handleAutoPlay={handleAutoPlay}
        selectedQueries={selectedQueries}
        isPlaying={isPlaying}
      />
    </>
  );
};

export default QuereisTab;