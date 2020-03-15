import React from "react";
import { Button } from "react-bootstrap";
import { postSource } from "../../../service/app";

const Compile = props => {

  const fetchPostSource = async(code) => {
    const result = await postSource(code);
    props.setResultCode(result.data.data);
  }

  return (
    <Button
      style={{ position: "absolute", bottom: "15px" }}
      variant="primary"
      onClick={() => fetchPostSource(props.code)}
    >
      실행
    </Button>
  );
};

export default Compile;