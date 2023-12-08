import React from "react";
import Tree from "react-d3-tree";
import "../css/styles.css";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import {
  customStringify,
  sendData,
  saveJSON,
} from "../helperFuncs/helperFuncs.js";
import { useCallback, useState } from "react";

//set up a centered tree visualization
function ComponentTree({ fiberTree }) {
  const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState();
    const containerRef = useCallback((containerElem) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 12 });
      }
    }, []);
    return [dimensions, translate, containerRef];
  };
  const [dimensions, translate, containerRef] = useCenteredTree();

  const stringifiedResult = customStringify(fiberTree);

  return (
    <>
      {fiberTree ? (
        <div style={{ width: "100vw", height: "100vh" }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            className="download-btn"
            onClick={() => saveJSON(fiberTree, "parseTreeData")}
          >
            Download Data
          </Button>
          <div
            id="treeWrapper"
            style={{
              width: "100%",
              height: "100%",
            }}
            ref={containerRef}
          >
            <Tree
              data={fiberTree}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              enableLegacyTransitions
              translate={translate}
            />
          </div>
        </div>
      ) : (
        <h2 className="title">COMPONENT TREE</h2>
      )}
    </>
  );
}

export default ComponentTree;
