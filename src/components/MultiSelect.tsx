import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { QueryEvent } from '../types';

type MultiSelectProps = {
  onSelectionChange: (selected: string[]) => void;
  queryEvents: QueryEvent[];
};

export default function MultiSelect({
  onSelectionChange,
  queryEvents,
}: MultiSelectProps) {
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const [queryOptions, setQueryOptions] = useState<string[]>([]);

  useEffect(() => {
    const newQueryOptions = queryEvents.map((event) => event.queryHash);
    const uniqueQueryOptions = Array.from(new Set(newQueryOptions));
    setQueryOptions(uniqueQueryOptions);
    // when there are new query options, we need to check with local storage and see if any of them are set
    chrome.storage.local.get(['selectedQueries'], (result) => {
      // check that data exists and it's an array
      if (result.selectedQueries && Array.isArray(result.selectedQueries)) {
        // get the queries out of local storage
        const arrayQueries = result.selectedQueries;
        const intersectionOfStorageAndAvailable: string[] = [];
        // iterate through query keys stored in local storage and check if the query key is currently available in the drop-down
        arrayQueries.forEach((queryKey: string) => {
          if (uniqueQueryOptions.includes(queryKey)) {
            intersectionOfStorageAndAvailable.push(queryKey);
          }
        });
        // invoke functions that 1) set checked values in the UI and 2) set the checked values in state so that the correct data is displayed
        setIsChecked(intersectionOfStorageAndAvailable);
        onSelectionChange(intersectionOfStorageAndAvailable);
      }
    });
  }, [queryEvents]);

  const handleChange = (event: SelectChangeEvent<typeof isChecked>) => {
    const {
      target: { value },
    } = event;
    const newSelection = typeof value === 'string' ? value.split(',') : value;
    setIsChecked(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-checkbox-label'>Queries</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={isChecked}
          onChange={handleChange}
          input={<OutlinedInput label='Queries' />}
          renderValue={(selected) => selected.join(', ')}
        >
          {queryOptions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={isChecked.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
