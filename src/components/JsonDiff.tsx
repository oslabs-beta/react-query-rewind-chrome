import React from 'react'
import JsonFormatter from './JsonFormatter'
import Typography from '@mui/material/Typography'
import jsondiffpatch from 'jsondiffpatch';
import '../css/global.css'


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

const JsonDiff: React.FC<JsonFormatterType> = ({ oldJson, currentJson}) => {
  
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


  if (delta) {

    const htmlFormatter = jsondiffpatch.formatters.html; 
    const htmlDiff = htmlFormatter.format(delta, example1);

    // hide and show on changed modify the entire body. Therefore I need to specify an element

    // React-specific functions to handle raw html
    const createMarkupHtml = () => ({ __html: htmlDiff });

    // function to hide/show unchanged data
    const showChanged = (e: React.MouseEvent<HTMLButtonElement>) => {
      const buttonElem = e.target as HTMLElement
      console.log(buttonElem.parentElement);
      htmlFormatter.showUnchanged(true);
    }

    return (
      <div className='json-container'>
        <button onClick={() => htmlFormatter.hideUnchanged()}>Hide Unchanged</button>
        <button onClick={(e) => showChanged(e)}>Show Unchanged</button>
        <div dangerouslySetInnerHTML={createMarkupHtml()}></div>
      </div>
    )
  }

  return (
    <>
      <div>JsonDiffTree Title (Delete Later)</div>
      <div>{JSON.stringify(delta)}</div>
      <JsonFormatter jsonData={delta}/>
    </>
    
  )
}

export default JsonDiff