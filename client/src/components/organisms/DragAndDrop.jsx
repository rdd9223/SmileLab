import React, { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Button, Row, Col, Container } from "react-bootstrap";
import Oval from "../molecules/figure/Oval";
import Square from "../molecules/figure/Square";
import EditableText from "../molecules/figure/EditableText";
import ArrowLine from "../molecules/figure/ArrowLine";
import Parallelogram from "../molecules/figure/Parallelogram";
import Transformer from "../molecules/figure/Transformer";
import { Modal } from "react-bootstrap";
import Line from "components/molecules/figure/Line";
const img_example = require("../../images/img_example_dragdrop.png");

/*
  TODO:
  3. 도형 삭제 -> Transform처럼 코드 리펙토링 필요
*/

const DragAndDrop = (props) => {
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [selectedShapeName, setSelectedShapeName] = useState("");
  const [modalShow, setModalShow] = useState(false);

  React.useEffect(() => {
    if (images.length === 0 && JSON.parse(window.localStorage.getItem("text_drag")) != null) {
      const tempImages = [];
      const savedImages = JSON.parse(window.localStorage.getItem("text_drag")).children[0].children;
      for (const savedImage of savedImages) {
        if (savedImage.attrs.name !== undefined) {
          tempImages.push(savedImage.attrs);
        }
      }
      setImages(tempImages);
    }
  }, [images.length]);

  const handleDelete = () => {
    setImages([]);
    window.localStorage.removeItem("text_drag");
    alert("전체 삭제가 완료되었습니다.");
  };

  const handleSave = () => {
    window.localStorage.setItem("text_drag", stageRef.current.toJSON());
    alert("중간 저장이 완료되었습니다.");
  };

  const handleSubmit = () => {
    window.localStorage.setItem("text_drag", stageRef.current.toJSON());
    alert("제출이 완료되었습니다.");
  };

  const style = {
    line: {
      type: "직선",
      x: 50,
      y: 50,
      points: [0, 0, 0, 100],
      pointerLength: 20,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 3,
      dragDistance: 100,
      name: "line" + (images.length + 1),
    },
    oval: {
      type: "시작/종료",
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
      strokeWidth: 2,
      name: "arrowLine" + (images.length + 1),
    },
    rhombus: {
      type: "결정, 비교",
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
      type: "입력",
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
      type: "출력",
      width: 200,
      height: 100,
      stroke: "black",
      strokeWidth: 1,
      name: "hexagon" + (images.length + 1),
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(180, 0);
        context.lineTo(20, 0);
        context.lineTo(20, 50);
        const x = 180;
        for (var i = 20; i < x; i++) {
          // Loop from left side to current x
          const y = 70.0 - Math.sin((i * Math.PI) / -90) * 20; // calculate y flipped horizontally, converting from DEG to RADIAN
          context.lineTo(i, y);
        }
        context.lineTo(180, 0);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    },
  };

  const buttonArray = [
    [
      {
        ...style.oval,
        img: require("../../images/start-end.png"),
      },
      {
        ...style.square,
        img: require("../../images/action.png"),
      },
      {
        ...style.parallelogram,
        img: require("../../images/input-output.png"),
      },
      {
        ...style.rhombus,
        img: require("../../images/decision.png"),
      },
    ],
    [
      {
        ...style.line,
        img: null,
      },
      {
        ...style.hexagon,
        img: require("../../images/document.png"),
      },
      {
        ...style.textArea,
        img: null,
      },
      {
        ...style.arrowLine,
        img: null,
      },
    ],
  ];

  const handleStageMouseDown = (e) => {
    e.evt.preventDefault(true);
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
      <div style={{ width: 468.8, height: 160, margin: "auto" }}>
        <Container>
          <Row style={{ paddingBottom: 5 }}>
            {buttonArray[0].map((img, i) => {
              return (
                <Col key={i}>
                  <div
                    onClick={() => setImages(images.concat(img))}
                    style={{ textAlign: "center", cursor: "pointer" }}
                  >
                    <img
                      src={img.img}
                      alt={img.type}
                      width="100%"
                      style={{ display: "block", height: 40 }}
                    />
                    <p style={{ fontSize: "14px" }}>{img.type}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            {buttonArray[1].map((img, i) => {
              if (img.img === null) {
                return (
                  <Col key={i}>
                    <Button size="sm" onClick={() => setImages(images.concat(img))} block>
                      {img.type}
                    </Button>
                  </Col>
                );
              } else {
                return (
                  <Col key={i}>
                    <div
                      onClick={() => setImages(images.concat(img))}
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      <img
                        src={img.img}
                        alt={img.type}
                        width="100%"
                        style={{ display: "block", height: 40 }}
                      />
                      <p style={{ fontSize: "14px" }}>{img.type}</p>
                    </div>
                  </Col>
                );
              }
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
                return <Square key={i} shapeProps={image} stageRef={stageRef} />;
              } else if (image.name.indexOf("rhombus") !== -1) {
                return (
                  <Parallelogram
                    key={i}
                    shapeProps={{ ...image, sceneFunc: style.rhombus.sceneFunc }}
                    stageRef={stageRef}
                  />
                );
              } else if (image.name.indexOf("hexagon") !== -1) {
                return (
                  <Parallelogram
                    key={i}
                    shapeProps={{ ...image, sceneFunc: style.hexagon.sceneFunc }}
                    stageRef={stageRef}
                  />
                );
              } else if (image.name.indexOf("parallelogram") !== -1) {
                return (
                  <Parallelogram
                    key={i}
                    shapeProps={{ ...image, sceneFunc: style.parallelogram.sceneFunc }}
                    stageRef={stageRef}
                  />
                );
              } else if (image.name.indexOf("textArea") !== -1) {
                return <EditableText key={i} shapeProps={image} stageRef={stageRef} />;
              } else if (image.name.indexOf("arrowLine") !== -1) {
                return <ArrowLine key={i} shapeProps={image} stageRef={stageRef} />;
              } else if (image.name.indexOf("line") !== -1) {
                return <Line key={i} shapeProps={image} stageRef={stageRef} />;
              } else if (
                image.name.indexOf("circle") !== -1 ||
                image.name.indexOf("ellipse") !== -1
              ) {
                return <Oval key={i} shapeProps={image} stageRef={stageRef} />;
              }
              return null;
            })}
            <Transformer selectedShapeName={selectedShapeName} />
          </Layer>
        </Stage>
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <div>
          <Button onClick={() => setModalShow(true)} name="예시" size="xs">
            예시
          </Button>
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <div>
              <img src={img_example} alt="example" width="100%" />
            </div>
          </Modal>
        </div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ marginRight: 6 }}>
          <Button onClick={handleDelete} size="xs">
            전체삭제
          </Button>
        </div>
        <div style={{ marginRight: 6 }}>
          <Button onClick={handleSave} name="중간저장" size="xs">
            중간저장
          </Button>
        </div>
        <div>
          <Button onClick={handleSubmit} name="제출" size="xs">
            제출
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
