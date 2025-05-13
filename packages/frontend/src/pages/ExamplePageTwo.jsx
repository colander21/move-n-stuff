import React from "react";
import CardboardBox from "./CardboardBox";
import Table from "../Table";

const boxData = [
  { color: "#ff6347" },
  { color: "#4682b4" },
  { color: "#32cd32" },
  // More data here
];

function ExamplePageTwo() {
  return (
    <div>
      <h1>3D Box Scene</h1>
      <Table boxData={boxData} />
    </div>
  );
}

export default ExamplePageTwo;
