import React, { useState, useRef, useEffect, Fragment } from "react";
import { Transformer, Text } from "react-konva";
import Portal from './Portal';

const EditableText = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [textEditVisible, setTextEditVisible] = useState(false);
  const [textXY, setTextXY] = useState({x: 0, y: 0})

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Fragment>
      <Text
        onClick={onSelect}
        onDblClick={(e) => {
          const absPos = e.target.getAbsolutePosition();
          setTextEditVisible(true);
          setTextXY({x: absPos.x, y: absPos.y})
        }}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      <Portal>
        <textarea
          value={shapeProps.text}
          style={{
            display: textEditVisible ? 'block' : 'none',
            position: 'absolute',
            top: window.innerHeight/2 + 'px',
            left: window.innerWidth/4 + 'px'
          }}
          onChange={(e) => {
            onChange({
              ...shapeProps,
              text: e.target.value
            })
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              setTextEditVisible(false);
            }
          }}
        />
      </Portal>
    </Fragment>
  );
};

export default EditableText;