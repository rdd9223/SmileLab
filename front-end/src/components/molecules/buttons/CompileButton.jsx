import React from "react";
import Button from "../../atoms/Button";
import { postSource } from "../../../service/app";

const CompileButton = (props) => {
  const { code, setResultCode } = props;

  const fetchPostSource = async () => {
    const result = await postSource(code);
    // setResultCode(result.data.data);
  };

  return (
    <Button
      style={{ position: "absolute", bottom: "15px", right: "4%" }}
      variant={"primary"}
      onClick={fetchPostSource()}
      name={"Compile"}
    />
  );
};

export default CompileButton;
