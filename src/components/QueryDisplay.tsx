import React, { useState, useEffect } from 'react';
import { QueryTabProps, QueryDisplay } from '../types';
import a11yProps from '../functions/a11yProps';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import ContinuousSlider from './ContinuousSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import JsonFormatter from './JsonFormatter';
import Typography from '@mui/material/Typography';
import createDisplayArray from '../functions/createDisplayArray';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '../components/CustomTabPanel';

import JsonDiff from './JsonDiff';

const QueryDisplay = ({ queryEvents, selectedQueries }: QueryTabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // holds all query events based on selected queries and query events
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);
  // current index of above array
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playIcon, setPlayIcon] = useState(
    <PlayArrowIcon fontSize="inherit" />
  );

  // creates array of all states based on selected queries
  useEffect(() => {
    const newQueryDisplay = createDisplayArray(queryEvents, selectedQueries);

    setQueryDisplay(newQueryDisplay);

    setCurrentIndex(0);
  }, [selectedQueries, queryEvents]);

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex >= queryDisplay.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 1000);
    } else if (interval !== undefined) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, queryDisplay]);

  useEffect(() => {
    setPlayIcon(
      isPlaying ? (
        <PauseIcon fontSize="inherit" />
      ) : (
        <PlayArrowIcon fontSize="inherit" />
      )
    );
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, queryDisplay.length - 1)
    );
  };

  const handleAll = () => {
    setIsPlaying(prevIsPlaying => {
      if (!prevIsPlaying) {
        if (currentIndex >= queryDisplay.length - 1) {
          setCurrentIndex(0);
        }
        return true;
      }
      return false;
    });
  };

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
          {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
            <div
              className="data"
              style={{ maxHeight: '80vh', overflow: 'auto', marginTop: '1rem' }}
            >
              {queryDisplay[currentIndex].map(queryState => (
                <>
                  <Typography variant="h5">{queryState.queryKey}</Typography>
                  <JsonFormatter
                    key={queryState.queryKey}
                    jsonData={queryState.queryData}
                  />
                </>
              ))}
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
            <div className="data">
              {queryDisplay[currentIndex].map((queryState, i) => (
                <>
                  <Typography variant="h5">{queryState.queryKey}</Typography>
                  <JsonDiff
                    key={queryState.queryKey}
                    currentJson={queryState.queryData}
                    oldJson={
                      currentIndex > 1 && queryState.queryKey
                        ? queryDisplay[currentIndex - 1].find(
                            obj => obj.queryKey === queryState.queryKey
                          )?.queryData
                        : null
                    }
                  />
                </>
              ))}
            </div>
          )}
        </CustomTabPanel>
      </Box>

      <div className="navigation">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'rgba(40, 40, 40, 1)',
          }}
        >
          <IconButton
            aria-label="play-pause"
            size="large"
            onClick={handleAll}
            sx={{ '&:hover': { display: 'flex' } }}
          >
            {playIcon}
          </IconButton>

          <ContinuousSlider
            value={currentIndex}
            maxValue={queryDisplay.length - 1}
            onChange={(newIndex: number) => setCurrentIndex(newIndex)}
          />

          <IconButton
            aria-label="previous"
            size="large"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(0)}
            sx={{ '&:hover': { display: 'flex' } }}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="previous"
            size="large"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
            sx={{ '&:hover': { display: 'flex' } }}
          >
            <KeyboardArrowLeftIcon fontSize="inherit" />
          </IconButton>

          <span>
            {selectedQueries.length === 0
              ? '0 / 0'
              : `${currentIndex + 1} / ${queryDisplay.length}`}
          </span>

          <IconButton
            aria-label="next"
            size="large"
            disabled={currentIndex === queryDisplay.length - 1}
            onClick={handleNext}
            sx={{ '&:hover': { display: 'flex' } }}
          >
            <KeyboardArrowRightIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="next"
            size="large"
            disabled={currentIndex === queryDisplay.length - 1}
            onClick={() => setCurrentIndex(queryDisplay.length - 1)}
            sx={{ '&:hover': { display: 'flex' } }}
          >
            <KeyboardDoubleArrowRightIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </div>
    </>
  );
};

export default QueryDisplay;
