import React from 'react';

import JsonFormatter from '../components/JsonFormatter';

import { DataTabProps } from '../types';

const StateTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  return (
    <>
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div
          className='data'
          style={{ height: '100%', overflow: 'auto' }}
        >
          {queryDisplay[currentIndex].map((queryState) => (
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
