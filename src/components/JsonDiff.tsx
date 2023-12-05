import React, { useState } from 'react'
import JsonFormatter from './JsonFormatter'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import jsondiffpatch from 'jsondiffpatch';
import '../css/global.css'

type JsonDataType = {
  [key: string]: any;
}

type JsonFormatterType = {
  oldJson?: JsonDataType, // will need to stay as optional in case you're on first state
  currentJson: JsonDataType,
  queryKey: string
}

const JsonDiff: React.FC<JsonFormatterType> = ({ oldJson, currentJson, queryKey }) => {

  // handle scenario where we're on the first state (this shows up on the first and second time travels because first state is nothing?)
  if (!oldJson) return (
    <Typography
      variant='body1'
      style={{fontStyle: 'italic'}}
    >
      Initial state - no comparison available
    </Typography>
  )

  // get comparison obj
  const delta = jsondiffpatch.diff(oldJson, currentJson);
  // console.log('old:', oldJson);
  // console.log('currentJson:', currentJson);
  console.log('delta: ', delta);


  if (delta) {
    // Use library's html formatter that generates vanilla CSS
    const htmlFormatter = jsondiffpatch.formatters.html;
    const htmlDiff = htmlFormatter.format(delta, oldJson);
    // React-specific functions to handle raw html
    const createMarkupHtml = () => ({ __html: htmlDiff });

    return (
      <div className='json-diff-container'>
        <Container>
          <div dangerouslySetInnerHTML={createMarkupHtml()}></div>
        </Container>
      </div>
    )
  }

  // handle errors by always returning something
  return (
    <Typography
      variant='body1'
      style={{fontStyle: 'italic'}}
    >
      No Diff to Show
    </Typography>

  )
}

export default JsonDiff