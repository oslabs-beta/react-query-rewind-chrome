import Typography from '@mui/material/Typography';
import JsonDiff from '../components/JsonDiff';

import { DataTabProps } from '../types';

const DiffTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  return (
    <>
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div className="data">
          {queryDisplay[currentIndex].map((queryState, i) => (
            <>
              <Typography variant="h5">{queryState.queryKey}</Typography>
              <JsonDiff
                key={queryState.queryKey}
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
