import Typography from '@mui/material/Typography';
import JsonDiff from '../components/JsonDiff';
import FormControlLabel from '@mui/material/FormControlLabel'
import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import { DataTabProps } from '../types';

const DiffTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  // state to determine if unchanged are hidden or closed
  const [isHidden, setIsHidden] = useState(false)

  // function to hide/show unchanged data
  const toggleChangedProperties = () => {
    // select all json diff objects and modify their classlist to hide/show unchanged props
    const jsonDiffContainerElems = Array.from(document.querySelectorAll('.json-diff-container')) as HTMLElement[]
    for (const elem of jsonDiffContainerElems) {
      // if currently hidden, remove class so unchanged are shown
      if (isHidden) {
        elem.classList.remove('jsondiffpatch-unchanged-hidden');
        setIsHidden(false);
        return;
      }
      // if currently shown, add class so unchanged are hidden
      elem.classList.add('jsondiffpatch-unchanged-hidden');
      setIsHidden(true);
      return;
    }
  }

  return (
    <>
      <FormControlLabel
        control={<Switch
          checked={isHidden}
          onChange={toggleChangedProperties} />
        }
        label={`${isHidden ? "Show" : "Hide"} Unchanged Properties `}
      />
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div className="data">
          {queryDisplay[currentIndex].map((queryState, i) => (
            <>
              <Typography variant="h5" sx={{ color: 'secondary.main' }}>{queryState.queryKey}</Typography>
              <JsonDiff
                key={queryState.queryKey}
                queryKey={queryState.queryKey}
                currentJson={queryState.queryData}
                oldJson={
                  currentIndex > 1 && queryState.queryKey
                    ? queryDisplay[currentIndex - 1].find(
                      obj => obj.queryKey === queryState.queryKey
                    )?.queryData
                    : null
                }
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default DiffTab; 