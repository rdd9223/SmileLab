import React from "react";
import Button from "../../atoms/Button";
import { postSource } from "../../../service/app";

const CompileButton = (props) => {
  const { code, setResultCode, input } = props;

  const fetchPostSource = async () => {
    const result = await postSource(code, input);
    if (result != null && result.data.data != null) setResultCode(result.data.data);
  };

  return <Button variant={"primary"} onClick={() => fetchPostSource()} name={"Compile"} size={"sm"} />;
};

export default CompileButton;
