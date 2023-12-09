import React from 'react';
import JsonFormatter from './JsonFormatter';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import jsondiffpatch from 'jsondiffpatch';
import '../css/jsonDiff.css';

type JsonDataType = {
  [key: string]: any;
};

type JsonFormatterType = {
  oldJson?: JsonDataType | string, // optional in case you're on first state
  currentJson: JsonDataType | string, // or string since state gets initialized to an empty string
  queryKey: string,
  isHidden: boolean
};


const JsonDiff: React.FC<JsonFormatterType> = ({ oldJson, currentJson, queryKey, isHidden }) => {
  console.log('QueryKey: ', queryKey);
  console.log('old:', oldJson);
  console.log('currentJson:', currentJson);
  
  // handle scenario where we're on the first state - getting currentJson but not oldJson
  if (currentJson === '') return (
    <Typography
      variant='body1'
      style={{fontStyle: 'italic'}}
    >
      Initial state - no comparison available
    </Typography>
  )

  // get comparison obj
  const delta = jsondiffpatch.diff(oldJson, currentJson);
  // delta is undefined if the 2 objects are the exact same - not sure how I can render this
  console.log('delta: ', delta);

  if (delta) {
    // Use library's html formatter that generates vanilla CSS
    const htmlFormatter = jsondiffpatch.formatters.html;
    const htmlDiff = htmlFormatter.format(delta, oldJson);
    // React-specific functions to handle raw html
    const createMarkupHtml = () => ({ __html: htmlDiff });

    return (
      <div className={`json-diff-container ${isHidden ? 'jsondiffpatch-unchanged-hidden' : ''}`}>
        <Container>
          <div dangerouslySetInnerHTML={createMarkupHtml()}></div>
        </Container>
      </div>
    )
  }

  // handle errors - this is appearing when there is no change tho?
  return (
    <Typography
      variant='body1'
      style={{fontStyle: 'italic'}}
    >
      QueryKey data not modified on this state change
    </Typography>

  )
}

export default JsonDiff;
