import React, { useState } from 'react'
import JsonFormatter from './JsonFormatter'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Container from '@mui/material/Container'
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
  currentJson: JsonDataType,
  queryKey: string
}

const JsonDiff: React.FC<JsonFormatterType> = ({ oldJson, currentJson, queryKey }) => {
  // state to determine if unchanged are hidden or closed (if this needs to persist across time travels, it should live in a parent component)
  const [isHidden, setIsHidden] = useState(false)

  // handle scenario where we're on the first state (not sure if it should be handled here)
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
  console.log('delta: ', delta);


  if (delta) {
    // Use library's html formatter that generates vanilla CSS
    const htmlFormatter = jsondiffpatch.formatters.html;
    const htmlDiff = htmlFormatter.format(delta, example1);
    // React-specific functions to handle raw html
    const createMarkupHtml = () => ({ __html: htmlDiff });

    // function to hide/show unchanged data
    const toggleChange = () => {
      const jsonDiffContainerElem = document.querySelector('.json-diff-container') as HTMLElement
      if (jsonDiffContainerElem) {
        // if currently hidden, remove class so unchanged are shown
        if (isHidden) {
          jsonDiffContainerElem.classList.remove('jsondiffpatch-unchanged-hidden');
          setIsHidden(false);
          return;
        }
        // if currently shown, add class so unchanged are hidden
        jsonDiffContainerElem.classList.add('jsondiffpatch-unchanged-hidden');
        setIsHidden(true);
        return;
      }
    }

    return (
      <div className='json-diff-container'>
        <Container>
          <FormControlLabel
            control={<Switch
              checked={isHidden}
              onChange={toggleChange}/>
            }
            label={`${isHidden ? "Show" : "Hide"} Unchanged Properties `}
          />
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