import React from "react";
import { Shape } from "react-konva";

const Parallelogram = ({ shapeProps }) => {
  return <Shape {...shapeProps} draggable />;
};

export default Parallelogram;
