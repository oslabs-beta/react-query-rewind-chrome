import Typography from '@mui/material/Typography';
import JsonFormatter from '../components/JsonFormatter';

import { DataTabProps } from '../types';

const StateTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  return (
    <>
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div
          className="data"
          style={{ maxHeight: '80vh', overflow: 'auto', marginTop: '1rem' }}
        >
          {queryDisplay[currentIndex].map(queryState => (
            <>
              <Typography variant="h5">{queryState.queryKey}</Typography>
              <JsonFormatter
                key={queryState.queryKey}
                jsonData={queryState.queryData}
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default StateTab;
