import React, { useState, useRef, Fragment } from "react";
import { Line } from "react-konva";
import Portal from "./Portal";
import ContextMenu from "./ContextMenu";
import useMousePosition from "hooks/useMousePosition";

const Linea = ({ shapeProps, stageRef }) => {
  const [selectedContextMenu, setSelectedContextMenu] = useState(null);
  const { x, y } = useMousePosition();
  const shapeRef = useRef();

  const handleOptionSelected = () => {
    shapeRef.current.remove();
    stageRef.current.draw();
    setSelectedContextMenu(null);
  };

  const handleContextMenu = (e) => {
    e.evt.preventDefault(true);
    setSelectedContextMenu({ x, y });
  };

  return (
    <Fragment>
      <Line ref={shapeRef} {...shapeProps} draggable onContextMenu={handleContextMenu} />
      {selectedContextMenu && (
        <Portal>
          <ContextMenu position={selectedContextMenu} onOptionSelected={handleOptionSelected} />
        </Portal>
      )}
    </Fragment>
  );
};

export default Linea;
