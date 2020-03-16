import React from "react";
import { Row, Col } from "react-bootstrap";
import FormRadio from "../atoms/radio/FormRadio";

const ExpressRadioGroup = () => {

  return (
    <div style={{ float: 'center', margin: '20px' }}>
      <Row>
        <Col>
          <FormRadio name={"순서도로 표현하기"} group={"expression"} />
        </Col>
        <Col>
          <FormRadio name={"의사코드로 표현하기"} group={"expression"} />
        </Col>
      </Row>
    </div>
  );
};

export default ExpressRadioGroup;
