import React from "react";
import FormLabel from "../../atoms/FormLabel";
import FormControl from "../../atoms/FormControl";
import Button from "../../atoms/Button";
import { Row, Col } from "react-bootstrap";

const FormLabelButtonSet = ({ variant, onClick, type, buttonName, name, placeholder = "" }) => {
  return (
    <>
      <FormLabel name={name} />
      <Row>
        <Col md={9}>
          <FormControl type={type} placeholder={placeholder} />
        </Col>
        <Col md={3}>
          <Button variant={variant} onClick={onClick} type={"submit"} name={buttonName} />
        </Col>
      </Row>
    </>
  );
};

export default FormLabelButtonSet;
