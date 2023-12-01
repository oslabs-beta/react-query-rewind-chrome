import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

type ContinuousSliderProps = {
  value: number;
  maxValue: number;
  onChange: (newValue: number) => void;
};

export default function ContinuousSlider({
  value,
  maxValue,
  onChange,
}: ContinuousSliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Slider
          value={value}
          onChange={handleChange}
          max={maxValue}
          aria-labelledby="continuous-slider"
        />
      </Stack>
    </Box>
  );
}
