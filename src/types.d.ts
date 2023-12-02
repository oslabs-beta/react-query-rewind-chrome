export type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

export type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type BasicTabsProps = {
  queryEvents: QueryEvent[];
  selectedQueries: string[];
};

export type QueryTabProps = {
  selectedQueries: string[];
  queryEvents: QueryEvent[];
};
