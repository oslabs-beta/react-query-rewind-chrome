import React, { useState, useEffect } from 'react';
import { QueryTabProps } from '../types';

type LogEntry = {
  type: string;
  timestamp: Date;
  change: string;
};

type QueryLog = {
  queryKey: string;
  log: LogEntry[];
};

const LogTab = ({ queryEvents, selectedQueries }: QueryTabProps) => {
  const [logDisplay, setLogDisplay] = useState<QueryLog[]>([]);

  useEffect(() => {
    const newLogDisplay: QueryLog[] = [];

    selectedQueries.forEach(queryKey => {
      const queryLog: QueryLog = {
        queryKey: queryKey,
        log: [],
      };

      queryEvents.forEach(event => {
        if (event.queryHash === queryKey) {
          const change = {
            type: event.eventType === 'updated' ? 'Updated' : 'Removed',
            timestamp: event.timestamp,
            change: 'Input Change',
          };

          queryLog.log.push(change);
        }
      });

      newLogDisplay.push(queryLog);
    });

    setLogDisplay(newLogDisplay);
  }, [queryEvents, selectedQueries]);

  useEffect(() => {
    console.log(logDisplay);
  }, [logDisplay]);

  return (
    <>
      <h1>Log</h1>
    </>
  );
};

export default LogTab;
