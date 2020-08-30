import React from "react";
import { Arrow } from "react-konva";

const ArrowLine = ({ shapeProps }) => {
  return <Arrow {...shapeProps} draggable />;
};

export default ArrowLine;
