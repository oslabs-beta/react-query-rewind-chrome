import React, { useState, useEffect } from 'react';
import { QueryDisplayProps, QueryDisplay } from '../types';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import ContinuousSlider from './ContinuousSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import JsonFormatter from './JsonFormatter';
import Typography from '@mui/material/Typography';

const QueryDisplay = ({ selectedQueries, queryEvents }: QueryDisplayProps) => {
  // holds all query events based on selected queries and query events
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);
  // current index of above array
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState(false); /////
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null); // to store the interval ID

  useEffect(() => {
    const allDisplays: QueryDisplay[][] = [];

    // selected queries start with no data
    const startDisplay: QueryDisplay[] = selectedQueries.map(queryKey => {
      return {
        queryKey: queryKey,
        queryData: 'N/A',
      };
    });

    allDisplays.push(startDisplay);

    // filter for events of selected queries
    const selectedQueryEvents = queryEvents.filter(queryEvent =>
      selectedQueries.includes(queryEvent.queryHash)
    );

    // traverse queries and update the relevant query data for that event
    selectedQueryEvents.forEach(queryEvent => {
      const prevDisplay = [...allDisplays[allDisplays.length - 1]];
      const newDisplay = prevDisplay.map(display => {
        if (display.queryKey === queryEvent.queryHash) {
          return { ...display, queryData: queryEvent.queryData };
        }
        return display;
      });
      allDisplays.push(newDisplay);
    });

    setQueryDisplay(allDisplays);

    setCurrentIndex(0);
  }, [selectedQueries, queryEvents]);

  const handleAll = () => {
    setIsPlaying(true);

    // Clear any existing interval
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    // Start a new interval to move to the next update every 5 seconds
    const id = setInterval(() => {
      setCurrentIndex(prevIndex =>
        Math.min(prevIndex + 1, queryDisplay.length - 1)
      );
    }, 3000);

    // Store the interval ID for later cleanup
    setIntervalId(id);
  };

  // Cleanup the interval when component unmounts or when isPlaying changes to false
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, queryDisplay.length - 1)
    );
  };

  return (
    <>
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div className="data">
          {queryDisplay[currentIndex].map(queryState => (
            <>
              <Typography variant='h5'>{queryState.queryKey}</Typography>
              <JsonFormatter key={queryState.queryKey} jsonData={queryState.queryData} />
            </>
          ))}
        </div>
      )}

      <div className="navigation">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            disabled={isPlaying === true}
            onClick={handleAll}
            sx={{'& .MuiTouchRipple-root': { width: 20, height: 20 } }}
          >
            <PlayArrowIcon fontSize="inherit" />
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
            sx={{ '& .MuiTouchRipple-root': { width: 20, height: 20 } }}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="previous"
            size="large"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
            sx={{ '& .MuiTouchRipple-root': { width: 20, height: 20 } }}
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
