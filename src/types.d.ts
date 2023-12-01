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

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type BasicTabsProps = {
  queryOptions: string[];
  queryEvents: QueryEvent[];
};

export type QueryDisplayProps = {
  selectedQueries: string[];
  queryEvents: QueryEvent[];
};

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};
