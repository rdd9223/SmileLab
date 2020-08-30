import React from "react";
import { Ellipse } from "react-konva";

const Oval = ({ shapeProps }) => {
  return <Ellipse {...shapeProps} draggable />;
};

export default Oval;
