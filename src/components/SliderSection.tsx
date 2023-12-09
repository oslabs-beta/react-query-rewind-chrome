import React from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContinuousSlider from './ContinuousSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { QueryDisplay, SliderSectionProps } from '../types';

const SliderSection = ({
  queryDisplay,
  currentIndex,
  setCurrentIndex,
  handleAutoPlay,
  selectedQueries,
  isPlaying,
}: SliderSectionProps) => {
  const playIcon = isPlaying ? (
    <PauseIcon fontSize='inherit' />
  ) : (
    <PlayArrowIcon fontSize='inherit' />
  );

  return (
    <div className='navigation'>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          bottom: 0,
          backgroundColor: 'rgba(40, 40, 40, 0.5)',
        }}
      >
        <IconButton
          aria-label='play-pause'
          size='large'
          onClick={handleAutoPlay}
          sx={{ '&:hover': { display: 'flex' } }}
        >
          {playIcon}
        </IconButton>

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <ContinuousSlider
            value={currentIndex}
            maxValue={queryDisplay.length - 1}
            onChange={(newIndex: number) => setCurrentIndex(newIndex)}
          />
        </Box>

        <IconButton
          aria-label='previous'
          size='large'
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(0)}
          sx={{ '&:hover': { display: 'flex' } }}
        >
          <KeyboardDoubleArrowLeftIcon fontSize='inherit' />
        </IconButton>

        <IconButton
          aria-label='previous'
          size='large'
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
          sx={{ '&:hover': { display: 'flex' } }}
        >
          <KeyboardArrowLeftIcon fontSize='inherit' />
        </IconButton>

        <span>
          {selectedQueries.length === 0
            ? '0 / 0'
            : `${currentIndex + 1} / ${queryDisplay.length}`}
        </span>

        <IconButton
          aria-label='next'
          size='large'
          disabled={currentIndex === queryDisplay.length - 1}
          onClick={() =>
            setCurrentIndex(Math.min(currentIndex + 1, queryDisplay.length - 1))
          }
          sx={{ '&:hover': { display: 'flex' } }}
        >
          <KeyboardArrowRightIcon fontSize='inherit' />
        </IconButton>

        <IconButton
          aria-label='next'
          size='large'
          disabled={currentIndex === queryDisplay.length - 1}
          onClick={() => setCurrentIndex(queryDisplay.length - 1)}
          sx={{ '&:hover': { display: 'flex' } }}
        >
          <KeyboardDoubleArrowRightIcon fontSize='inherit' />
        </IconButton>
      </Box>
    </div>
  );
};

export default SliderSection;
