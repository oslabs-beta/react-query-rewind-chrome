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
const theme2 = {
  scheme: 'isotope',
  author: 'jan t. sott',
  base00: '#000000',
  base01: '#404040',
  base02: '#606060',
  base03: '#808080',
  base04: '#c0c0c0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#ff0000',
  base09: '#ff9900',
  base0A: '#ff0099',
  base0B: '#33ff00',
  base0C: '#00ffff',
  base0D: '#0066ff',
  base0E: '#cc00ff',
  base0F: '#3300ff'
};

const theme = {
  scheme: 'monokai', // not sure this is doing anything - I can just copy past themes from : https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
  base00: 'transparent',  // Background color
  // base01: '#1c1c1c',      // Light background (for nested nodes)
  // base02: '#262626',      // Selection background
  // base03: '#9e9e9e',      // Comments, Invisibles, Line Highlighting
  // base04: '#b4b7b4',      // Dark foreground (used for status bars)
  // base05: '#dcdcdc',      // Default Foreground, Caret, Delimiters, Operators
  // base06: '#e8e8e8',      // Light foreground (not often used)
  // base07: '#f5f5f5',      // Light background (not often used)
  // base08: '#ab4642',      // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  // base09: '#dc9656',      // Integers, Boolean, Constants, XML Attributes, Markup Link Url
  // base0A: '#f7ca88',      // Classes, Markup Bold, Search Text Background
  // base0B: '#a1b56c',      // Strings, Inherited Class, Markup Code, Diff Inserted
  // base0C: '#86c1b9',      // Support, Regular Expressions, Escape Characters, Markup Quotes
  // base0D: '#7cafc2',      // Functions, Methods, Attribute IDs, Headings
  // base0E: '#ba8baf',      // Keywords, Storage, Selector, Markup Italic, Diff Changed
  // base0F: '#a16946'       // Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>

};

const JsonFormatter = () => {
  return (
    <div>
      <JSONTree data={testData} theme={theme}/>
    </div>
  )
}

export default JsonFormatter