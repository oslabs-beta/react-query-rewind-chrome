import React from 'react';
import { JSONTree } from 'react-json-tree';

// https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
const theme = {
  base00: 'transparent'
};

// Types
type JsonDataType = {
  [key: string]: any;
};
type JsonFormatterType = {
  jsonData: JsonDataType;
  queryKey: string
};

const JsonFormatter: React.FC<JsonFormatterType> = ({ jsonData, queryKey }) => {
  // update data so that query key is the root
  const dataWithKey = {[queryKey]: jsonData}

  // function to expand nodes
  const expand = (
    keyPath: ReadonlyArray<string | number>,
    value: any,
    layer: number
  ) => {
    // Gets recurisved called and traverses the json in depth first search so we could use it to trac the nodes that are open at any given time
  
    console.log('keyPath: ', keyPath); // keyPath: the keyPaths (goes in a recursive, depth first approach)
    console.log('value: ', value); // value: value in that keypath
    console.log('layer: ', layer); // layer: the depth
    // expand first level
    if (layer < 2) return true;
    return false;
  };

  return (
    <div>
      <JSONTree
        data={dataWithKey}
        theme={theme}
        hideRoot={true}
        shouldExpandNodeInitially={expand}
      />
    </div>
  );
};

export default JsonFormatter;
