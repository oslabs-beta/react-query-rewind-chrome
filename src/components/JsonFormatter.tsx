import React from 'react'
import { JSONTree } from 'react-json-tree';


// dummy data and themes
const testData = {
  queryKey1: {
    post1: {
      checked: false,
      value: 'Test'
    },
    post2: {
      checked: false,
      value: 'Test Again',
      nested: {
        arr: [1,4,5] 
      }
    }
  }
}


// https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
const theme = {
  base00: 'transparent'
};

const JsonFormatter = () => {
  // hideRoot: hides the root node
  // shouldExpandNodeInitially: function that determines what is initially expanded
  return (
    <div>
      <JSONTree data={testData} theme={theme} hideRoot={true}/>
    </div>
  )
}

export default JsonFormatter