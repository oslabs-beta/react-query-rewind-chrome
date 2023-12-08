import { QueryDisplay, QueryEvent } from '../types';

const createDisplayArray = (
  queryEvents: QueryEvent[],
  selectedQueries: string[]
) => {
  // nested results array to be returned
  const allDisplays: QueryDisplay[][] = [];

  // selected queries start with no data
  const startDisplay: QueryDisplay[] = selectedQueries.map(
    (queryKey: string) => {
      return {
        queryKey: queryKey,
        queryData: 'N/A',
      };
    }
  );

  allDisplays.push(startDisplay);

  // filter for events of selected queries
  const selectedQueryEvents = queryEvents.filter(queryEvent =>
    selectedQueries.includes(queryEvent.queryKey[0])
  );

  // traverse queries and update the relevant query data for that event
  selectedQueryEvents.forEach(queryEvent => {
    const prevDisplay = [...allDisplays[allDisplays.length - 1]];
    const newDisplay = prevDisplay.map(display => {
      if (display.queryKey === queryEvent.queryKey[0]) {
        return { ...display, queryData: queryEvent.queryData };
      }
      return display;
    });
    allDisplays.push(newDisplay);
  });

  return allDisplays;
};

export default createDisplayArray;
