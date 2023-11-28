import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Query 1',
  'Query 2',
  'Query 3',
  'Query 4',
  'Query 5',
  'Query 6',
  'Query 7',
];

export default function MultiSelect() {
  const [personName, setPersonName] = React.useState<string[]>([]);
  // const [queryInfo, setQueryInfo] = React.useState<Record<string, any>>({});

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    // // Add a state to store the query information
    // const [queryInfo, setQueryInfo] = React.useState<Record<string, any>>({});

    // // Subscribe to window messages
    // React.useEffect(() => {
    //   const handleMessage = (event: MessageEvent) => {
    //     if (event.data.type === 'react-query-rewind') {
    //       const payload = event.data.payload;
    //       // Update queryInfo state based on the received payload
    //       setQueryInfo((prevQueryInfo) => ({
    //         ...prevQueryInfo,
    //         [payload.queryKey]: payload,
    //       }));
    //     }
    //   };
  
    //   window.addEventListener('message', handleMessage);
  
    //   return () => {
    //     window.removeEventListener('message', handleMessage);
    //   };
    // }, []);

  // // Subscribe to window messages
  // React.useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     if (event.data.type === 'react-query-rewind') {
  //       const payload = event.data.payload;
  //       // Update queryInfo state based on the received payload
  //       setQueryInfo((prevQueryInfo) => ({
  //         ...prevQueryInfo,
  //         [payload.queryKey]: payload,
  //       }));
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);

  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  // }, []);

  // // Get dynamically updated names based on queryInfo
  // const updatedNames = Object.keys(queryInfo);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Queries</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Queries" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* {personName.map((selectedQuery) => (
        <div key={selectedQuery}>
          <h3>{selectedQuery}</h3>
          <pre>{JSON.stringify(queryInfo[selectedQuery], null, 2)}</pre>
        </div>
      ))} */}
    </div>
  );
}