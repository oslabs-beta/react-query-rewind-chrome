import React from 'react'
import { JSONTree } from 'react-json-tree';


// dummy data and themes
const testData = {
  queryKey1: {
    post1: {
      checked: false,
      value: 'Test',
      nested1: {
        first: 1,
        second: 2
      }
    },
    post2: {
      checked: false,
      value: 'Test Again',
      nested2: {
        arr: [1,4,5] 
      }
    }
  }
}


// https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
const theme = {
  base00: 'transparent'
};

const expand = (keyPath: ReadonlyArray<string | number >, value: any, layer: number) => {
  // Gets recurisved called and traverses the json in depth first search so we could use it to trac the nodes that are open at any given time

  // console.log('keyPath: ', keyPath); // keyPath: the keyPaths (goes in a recursive, depth first approach)
  // console.log('value: ', value); // value: value in that keypath
  // console.log('layer: ', layer); // layer: the depth
  // expand first level
  if (layer < 2) return true;
  return false;
}

type JsonDataType = {
  [key: string]: any;
}

type JsonFormatterType = {
  jsonData?: JsonDataType
}

const JsonFormatter: React.FC<JsonFormatterType> = ({ jsonData }) => {
  // hideRoot: hides the root node
  // shouldExpandNodeInitially: function that determines what is initially expanded. Might be a challenge to track this from node to node
  
  // delete later - simply for testing
  if (!jsonData) jsonData = testData;

  return (
    <div>
      <JSONTree
        data={jsonData}
        theme={theme}
        hideRoot={true}
        shouldExpandNodeInitially={expand}
      />
    </div>
  )
}

export default JsonFormatter