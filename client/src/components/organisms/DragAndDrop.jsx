import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { Button, Row, Col, Container } from "react-bootstrap";
import Oval from "../molecules/figure/Oval";
import Square from "../molecules/figure/Square";
import EditableText from "../molecules/figure/EditableText";
import ArrowLine from "../molecules/figure/ArrowLine";
import Parallelogram from "../molecules/figure/Parallelogram";
import Transformer from "../molecules/figure/Transformer";

/*
  TODO
  3. 도형 삭제
*/

const DragAndDrop = (props) => {
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [selectedShapeName, setSelectedShapeName] = useState("");

  const style = {
    oval: {
      type: "종료",
      x: 150,
      y: 75,
      radiusX: 100,
      radiusY: 25,
      stroke: "black",
      strokeWidth: 1,
      name: "ellipse" + (images.length + 1),
    },
    circle: {
      type: "연결자",
      x: 50,
      y: 50,
      radiusX: 10,
      radiusY: 10,
      stroke: "black",
      strokeWidth: 1,
      name: "circle" + (images.length + 1),
    },
    square: {
      type: "처리",
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      stroke: "black",
      strokeWidth: 1,
      name: "rect" + (images.length + 1),
    },
    textArea: {
      type: "글상자",
      x: 50,
      y: 50,
      fontSize: 15,
      draggable: true,
      width: 200,
      name: "textArea" + (images.length + 1),
    },
    arrowLine: {
      type: "화살표",
      x: 50,
      y: 50,
      points: [0, 0, 0, 50],
      pointerLength: 10,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 1,
      name: "arrowLine" + (images.length + 1),
    },
    rhombus: {
      type: "조건",
      width: 200,
      height: 50,
      stroke: "black",
      strokeWidth: 1,
      name: "rhombus" + (images.length + 1),
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(100, 0);
        context.lineTo(200, 25);
        context.lineTo(100, 50);
        context.lineTo(0, 25);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    },
    parallelogram: {
      type: "입/출력",
      width: 200,
      height: 50,
      stroke: "black",
      strokeWidth: 1,
      name: "parallelogram" + (images.length + 1),
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(200, 0);
        context.lineTo(180, 50);
        context.lineTo(0, 50);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    },
    hexagon: {
      type: "준비",
      width: 200,
      height: 50,
      stroke: "black",
      strokeWidth: 1,
      name: "hexagon" + (images.length + 1),
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(180, 0);
        context.lineTo(200, 25);
        context.lineTo(180, 50);
        context.lineTo(20, 50);
        context.lineTo(0, 25);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    },
  };

  const buttonArray = [
    [style.oval, style.square, style.parallelogram, style.rhombus],
    [style.circle, style.hexagon, style.textArea, style.arrowLine],
  ];

  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedShapeName("");
      return;
    }
    const clickedOnTransformer = e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    const rect = images.find((r) => r.name === name);
    if (rect) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <div style={{ width: 468.8, height: 80, margin: "auto" }}>
        <Container>
          <Row style={{ paddingBottom: 5 }}>
            {buttonArray[0].map((img, i) => {
              return (
                <Col>
                  <Button size="sm" onClick={() => setImages(images.concat(img))} block>
                    {img.type}
                  </Button>
                </Col>
              );
            })}
          </Row>
          <Row>
            {buttonArray[1].map((img, i) => {
              return (
                <Col>
                  <Button size="sm" onClick={() => setImages(images.concat(img))} block>
                    {img.type}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div
        style={{
          overflow: "hidden",
          height: 670,
          border: "1px solid grey",
        }}
      >
        <Stage ref={stageRef} width={510} height={1500} onMouseDown={handleStageMouseDown}>
          <Layer>
            {images.map((image, i) => {
              if (image.name.indexOf("rect") !== -1) {
                return <Square key={i} shapeProps={image} />;
              } else if (
                image.name.indexOf("parallelogram") !== -1 ||
                image.name.indexOf("rhombus") !== -1 ||
                image.name.indexOf("hexagon") !== -1
              ) {
                return <Parallelogram key={i} shapeProps={image} />;
              } else if (image.name.indexOf("textArea") !== -1) {
                return <EditableText key={i} shapeProps={image} stageRef={stageRef} />;
              } else if (image.name.indexOf("arrowLine") !== -1) {
                return <ArrowLine key={i} shapeProps={image} />;
              } else if (
                image.name.indexOf("circle") !== -1 ||
                image.name.indexOf("ellipse") !== -1
              ) {
                return <Oval key={i} shapeProps={image} />;
              }
              return null;
            })}
            <Transformer selectedShapeName={selectedShapeName} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DragAndDrop;
