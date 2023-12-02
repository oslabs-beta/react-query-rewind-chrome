// component prop types

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

export type DataTabProps = {
  queryDisplay: QueryDisplay[][];
  currentIndex: number;
};

export type SliderSectionProps = {
  queryDisplay: QueryDisplay[][];
  currentIndex: number;
  setCurrentIndex: (selected: number) => void;
  handleAutoPlay: () => void;
  selectedQueries: string[];
  isPlaying: boolean;
};

// variable types

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
