//  import renderTree from '../components/d3';
// import D3Viz from "../components/dendogram";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tree from "react-d3-tree";
import "../css/styles.css";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const TreeGraph = () => {
const orgChart = {
    name: 'RQRewind',
    children: [
      {
        name: 'Node',
        children: [{ name: 'Child Node' }],
      },
      {
        name: 'Sandwich',
        children: [{ name: 'Tuna' }],
      },
      {
        name: 'Bo Bear',
        children: [
          { name: 'Nub', children: [] },
          { name: 'Soft Ears', children: [] },
        ],
      },
      {
        name: 'Cereal',
        children: [{ name: 'Cheerios' }],
      },
    ],
  };

  interface RawNodeDatum {
    name: string;
    attributes?: any; // optional
    children?: RawNodeDatum[]; // optional
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
        <Tree
          data={orgChart} // Assuming orgChart is defined somewhere in your component or imported
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          separation={{ siblings: 0.5, nonSiblings: 0.5 }}
          translate={{ x: 50, y: 50 }}
          pathFunc="diagonal"
          enableLegacyTransitions
        />
      </div>
    </Box>
  );
  };

  export default TreeGraph;