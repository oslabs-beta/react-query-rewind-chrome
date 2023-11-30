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
  queryEvents: QueryEvent[];
};

type QuerySnapshot = {
  [queryHash: string]: QueryEvent;
};

type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

const QueryDisplay = ({
  combinedUpdates,
  selectedQueries,
  queryEvents,
}: QueryDisplayProps) => {
  // state to track query data that is displayed
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentUpdate = combinedUpdates[currentIndex];

  // define the starting query
  // useEffect(() => {
  //   setQueryDisplay(() => {
  //     return selectedQueries.map(queryKey => {
  //       return {
  //         queryKey: queryKey,
  //         queryData: 'N/A',
  //       };
  //     });
  //   });
  // }, [selectedQueries, queryEvents]);

  // array of all possible changes
  useEffect(() => {
    const allDisplays: QueryDisplay[][] = [];

    const startDisplay: QueryDisplay[] = selectedQueries.map(queryKey => {
      return {
        queryKey: queryKey,
        queryData: 'N/A',
      };
    });

    allDisplays.push(startDisplay);

    const selectedQueryEvents = queryEvents.filter(queryEvent =>
      selectedQueries.includes(queryEvent.queryHash)
    );

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

  useEffect(() => {
    console.log(queryDisplay);
  }, queryDisplay);

  // provides display of most recent query data on initial load
  // useEffect(() => {
  //   setQueryDisplay(() => {
  //     return selectedQueries.map(queryKey => {
  //       const reversedQueryEvents = [...queryEvents].reverse();
  //       const newestEvent = reversedQueryEvents.find(
  //         event => event.queryHash === queryKey
  //       );

  //       return {
  //         queryKey: queryKey,
  //         queryData: newestEvent?.queryData,
  //       };
  //     });
  //   });
  // }, [selectedQueries, queryEvents]);

  useEffect(() => {
    console.log(queryDisplay);
  }, [queryDisplay]);

  useEffect(() => {
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
