import React, { useState } from 'react';
import { QueryKey } from '@tanstack/react-query';

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryDisplayProps = {
  combinedUpdates: QueryEvent[];
  selectedQueries: string[];
};

type QuerySnapshot = {
  [queryHash: string]: QueryEvent;
};

const QueryDisplay = ({
  combinedUpdates,
  selectedQueries,
}: QueryDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [querySnapshot, setQuerySnapshot] = useState<QuerySnapshot>({});

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, combinedUpdates.length - 1)
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
        {Object.entries(selectedQueries).map(([queryName, isSelected]) => {
          if (!isSelected) return null;
          const update = querySnapshot[queryName];

          return (
            <div key={queryName}>
              <h3>Query: {queryName}</h3>
              {update && (
                <>
                  <p>Event Type: {update.eventType}</p>
                  <p>Timestamp: {update.timestamp.toLocaleString()}</p>
                  {update.queryData && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      <strong>State:</strong>
                      <pre>{JSON.stringify(update.queryData, null, 2)}</pre>
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
