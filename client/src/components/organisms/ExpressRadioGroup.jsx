import React from "react";
import { Row, Col } from "react-bootstrap";
import FormRadio from "../molecules/radio/FormRadio";

const ExpressRadioGroup = (props) => {
  return (
    <div style={{ float: "center", margin: "20px" }}>
      <Row>
        <Col>
          <FormRadio
            name={"순서도로 표현하기"}
            group={"expression"}
            checked={props.selectOption === "순서도로 표현하기"}
            onChange={props.onChange}
          />
        </Col>
        <Col>
          <FormRadio
            name={"의사코드로 표현하기"}
            group={"expression"}
            checked={props.selectOption === "의사코드로 표현하기"}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ExpressRadioGroup;
