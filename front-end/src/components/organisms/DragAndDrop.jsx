import React, { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Button, Row, Col, Container } from "react-bootstrap";
import Oval from "../molecules/figure/Oval";
import Square from "../molecules/figure/Square";
import EditableText from "../molecules/figure/EditableText";
import ArrowLine from "../molecules/figure/ArrowLine";
import Parallelogram from "../molecules/figure/Parallelogram";

const DragAndDrop = (props) => {
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const style = {
    oval: {
      x: 150,
      y: 75,
      radiusX: 100,
      radiusY: 25,
      stroke: "black",
      strokeWidth: 1,
      id: "ellipse" + images.length + 1,
    },
    circle: {
      x: 50,
      y: 50,
      radiusX: 10,
      radiusY: 10,
      stroke: "black",
      strokeWidth: 1,
      id: "circle" + images.length + 1,
    },
    square: {
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      stroke: "black",
      strokeWidth: 1,
      id: "rect" + images.length + 1,
    },
    textArea: {
      text: "여기에 입력해주세요!",
      x: 50,
      y: 50,
      fontSize: 15,
      draggable: true,
      width: 200,
      id: "textArea" + images.length + 1,
    },
    arrowLine: {
      x: 50,
      y: 50,
      points: [0, 0, 0, 50],
      pointerLength: 10,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 1,
      id: "arrowLine" + images.length + 1,
    },
    rhombus: {
      x: 50,
      y: 50,
      stroke: "black",
      strokeWidth: 1,
      id: "rhombus" + images.length + 1,
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
      x: 50,
      y: 50,
      stroke: "black",
      strokeWidth: 1,
      id: "parallelogram" + images.length + 1,
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
      x: 50,
      y: 50,
      stroke: "black",
      strokeWidth: 1,
      id: "hexagon" + images.length + 1,
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

  return (
    <div style={{ justifyContent: "center" }}>
      <div style={{ width: 468.8, height: 80, margin: "auto" }}>
        <Container>
          <Row style={{ paddingBottom: 5 }}>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.oval))} block>
                시작/종료
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.square))} block>
                처리
              </Button>
            </Col>
            <Col>
              <Button
                size="sm"
                onClick={(e) => setImages(images.concat(style.parallelogram))}
                block
              >
                입/출력
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.rhombus))} block>
                조건
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.circle))} block>
                연결자
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.hexagon))} block>
                준비
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.textArea))} block>
                글상자
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={(e) => setImages(images.concat(style.arrowLine))} block>
                화살표
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{
          overflow: "hidden",
          // overflow: "auto",
          height: 670,
          border: "1px solid grey",
        }}
      >
        <Stage
          width={450}
          height={1500}
          ref={stageRef}
          onMouseDown={(e) => {
            // deselect when clicked on empty area
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
              selectShape(null);
            }
          }}
        >
          <Layer>
            {images.map((image, i) => {
              if (image.id.indexOf("rect") !== -1) {
                return (
                  <Square
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                      const image = images.slice();
                      image[i] = newAttrs;
                      setImages(image);
                    }}
                  />
                );
              } else if (
                image.id.indexOf("parallelogram") !== -1 ||
                image.id.indexOf("rhombus") !== -1 ||
                image.id.indexOf("hexagon") !== -1
              ) {
                return (
                  <Parallelogram
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                      const image = images.slice();
                      image[i] = newAttrs;
                      setImages(image);
                    }}
                  />
                );
              } else if (image.id.indexOf("textArea") !== -1) {
                return (
                  <EditableText
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                      const image = images.slice();
                      image[i] = newAttrs;
                      setImages(image);
                    }}
                  />
                );
              } else if (image.id.indexOf("arrowLine") !== -1) {
                return (
                  <ArrowLine
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                      const image = images.slice();
                      image[i] = newAttrs;
                      setImages(image);
                    }}
                  />
                );
              } else if (image.id.indexOf("circle") !== -1 || image.id.indexOf("ellipse") !== -1) {
                return (
                  <Oval
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                      const image = images.slice();
                      image[i] = newAttrs;
                      setImages(image);
                    }}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DragAndDrop;
