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
              <JsonFormatter
                key={queryState.queryKey}
                queryKey={queryState.queryKey}
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
