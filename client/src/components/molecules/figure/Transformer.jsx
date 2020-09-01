import React, { useEffect, useRef } from "react";
import { Transformer } from "react-konva";

const TransformerComponent = ({ selectedShapeName }) => {
  const TransformerRef = useRef();

  useEffect(() => {
    checkNode();
  });

  const checkNode = () => {
    const stage = TransformerRef.current.getStage();
    const selectedNode = stage.findOne("." + selectedShapeName);

    if (selectedNode === TransformerRef.current.node()) {
      return;
    }
    if (selectedNode) {
      TransformerRef.current.attachTo(selectedNode);
    } else {
      TransformerRef.current.detach();
    }
    TransformerRef.current.getLayer().batchDraw();
  };

  return <Transformer ref={TransformerRef} />;
};

export default TransformerComponent;
