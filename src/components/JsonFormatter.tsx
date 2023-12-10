import React from 'react';
import { JSONTree } from 'react-json-tree';

// https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
const theme = {
  base00: 'transparent',
};

// Types - should be brought into global types file so code is more DRY?
type JsonDataType = {
  [key: string]: any;
};

type ExpandNodesFuncType = (
  keyPath: ReadonlyArray<string | number>,
  value: any,
  layer: number
) => boolean;

type JsonFormatterType = {
  jsonData: JsonDataType;
  queryKey: string;
  expandNodesFunc: ExpandNodesFuncType;
};

const JsonFormatter: React.FC<JsonFormatterType> = ({ jsonData, queryKey, expandNodesFunc }) => {
  // update data so that query key is the root
  const dataWithKey = { [queryKey]: jsonData };

  return (
    <div>
      <JSONTree
        data={dataWithKey}
        theme={theme}
        hideRoot={true}
        shouldExpandNodeInitially={expandNodesFunc}
      />
    </div>
  );
};

export default JsonFormatter;
