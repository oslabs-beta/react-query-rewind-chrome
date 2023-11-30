import React, { useState, useEffect } from 'react';
import { QueryDisplayProps, QueryDisplay } from '../types';

const QueryDisplay = ({ selectedQueries, queryEvents }: QueryDisplayProps) => {
  // holds all query events based on selected queries and query events
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);
  // current index of above array
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // creates queryDisplay array with all query events
  useEffect(() => {
    const allDisplays: QueryDisplay[][] = [];

    // selected queries start with no data
    const startDisplay: QueryDisplay[] = selectedQueries.map(queryKey => {
      return {
        queryKey: queryKey,
        queryData: 'N/A',
      };
    });

    allDisplays.push(startDisplay);

    // filter for events of selected queries
    const selectedQueryEvents = queryEvents.filter(queryEvent =>
      selectedQueries.includes(queryEvent.queryHash)
    );

    // traverse queries and update relevant query data for event and push to allDisplays
    selectedQueryEvents.forEach(queryEvent => {
      const prevDisplay = [...allDisplays[allDisplays.length - 1]];
      const newDisplay = prevDisplay.map(display => {
        if (display.queryKey === queryEvent.queryHash) {
          return { ...display, queryData: queryEvent.queryData };
        }
        return display;
      });
      allDisplays.push(newDisplay);
    });

    setQueryDisplay(allDisplays);
  }, [selectedQueries, queryEvents]);

  // functions to traverse through query states
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, queryDisplay.length - 1)
    );
  };

  return (
    <>
      <div className="navigation">
        <button
          onClick={() => setCurrentIndex(0)}
          disabled={currentIndex === 0}
        >
          Start
        </button>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <span>
          {selectedQueries.length === 0
            ? '0 / 0'
            : `${currentIndex + 1} / ${queryDisplay.length}`}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === queryDisplay.length - 1}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentIndex(queryDisplay.length - 1)}
          disabled={currentIndex === queryDisplay.length - 1}
        >
          Latest
        </button>
      </div>

      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div className="data">
          {queryDisplay[currentIndex].map(queryState => (
            <div key={queryState.queryKey}>
              <h3>{queryState.queryKey}</h3>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                <pre>{JSON.stringify(queryState.queryData, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default QueryDisplay;
