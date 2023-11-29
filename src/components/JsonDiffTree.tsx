import React from 'react'
import JsonFormatter from './JsonFormatter'
import Typography from '@mui/material/Typography'
import jsondiffpatch from 'jsondiffpatch';

// examples for testing
const example1 = {
  val: 'test',
  valAgain: 'test',
  nested: {
    first: 1,
    second: 2
  }
}

const example2 = {
  val: 'test2',
  nested: {
    first: 1,
    second: 2,
    other: 5
  },
  third: 3,
}

type JsonDataType = {
  [key: string]: any;
}

type JsonFormatterType = {
  oldJson?: JsonDataType, // will need to stay as optional in case you're on first state
  currentJson?: JsonDataType // will need to be updated to be required
}

const JsonDiffTree: React.FC<JsonFormatterType> = ({ oldJson, currentJson}) => {
  
  // For testing purposes. Delete later
  if (!oldJson) oldJson = example1;
  if (!currentJson) currentJson = example2;

  // handle scenario where we're on the first state (not sure if it should be handled here)
  if (!oldJson) return (
    <Typography variant='h5'>Initial state - no comparison available</Typography>
  )

  // get comparison obj
  const delta = jsondiffpatch.diff(oldJson, currentJson);
  console.log('delta: ', delta);

  return (
    <>
      <div>JsonDiffTree Title (Delete Later)</div>
      <JsonFormatter jsonData={delta}/>
    </>
    
  )
}

export default JsonDiffTree