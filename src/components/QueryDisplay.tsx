import React, { useState, useEffect } from 'react';
import { QueryKey } from '@tanstack/react-query';

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

type QueryDisplayProps = {
  combinedUpdates: QueryEvent[];
  selectedQueries: string[];
  queryData: QueryData;
};

type QuerySnapshot = {
  [queryHash: string]: QueryEvent;
};

const QueryDisplay = ({
  combinedUpdates,
  selectedQueries,
  queryData,
}: QueryDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [querySnapshot, setQuerySnapshot] = useState<QuerySnapshot>({});

  const currentUpdate = combinedUpdates[currentIndex];

  useEffect(() => {
    const initialSnapshot: QuerySnapshot = {};

    selectedQueries.forEach(queryName => {
      const data = queryData[queryName];
      if (data && data.updates.length > 0) {
        initialSnapshot[queryName] = data.updates[data.updates.length - 1];
      }
    });

    setQuerySnapshot(initialSnapshot);
  }, [queryData, selectedQueries]);

  useEffect(() => {
    // Update currentIndex to the last update when combinedUpdates changes
    setCurrentIndex(
      combinedUpdates.length > 0 ? combinedUpdates.length - 1 : 0
    );
  }, [combinedUpdates]);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, combinedUpdates.length - 1)
    );
  };

  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;

    return `${month}/${day}/${year} - ${hours}:${minutesFormatted}:${secondsFormatted}${ampm}`;
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
          {currentIndex + 1} / {combinedUpdates.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === combinedUpdates.length - 1}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentIndex(combinedUpdates.length - 1)}
          disabled={currentIndex === combinedUpdates.length - 1}
        >
          Latest
        </button>
      </div>

      <div className="data">
        {selectedQueries.map(queryName => {
          const update = querySnapshot[queryName];

          return (
            <div key={queryName}>
              <h3>Query: {queryName}</h3>
              {currentUpdate && (
                <>
                  <strong>
                    Timestamp: {formatTimestamp(currentUpdate.timestamp)}
                  </strong>
                  {currentUpdate.queryData && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      <strong>State:</strong>
                      <pre>
                        {JSON.stringify(currentUpdate.queryData, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QueryDisplay;
