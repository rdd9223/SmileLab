import React from "react";
import { Rect } from "react-konva";

const Square = ({ shapeProps }) => {
  return <Rect {...shapeProps} draggable />;
};

export default Square;
