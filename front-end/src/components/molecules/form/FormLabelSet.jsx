import React from "react";
import FormLabel from "../../atoms/FormLabel";
import FormControl from "../../atoms/FormControl";

const FormLabelSet = ({ name, type, placeholder }) => {
  return (
    <>
      <FormLabel name={name} />
      <FormControl type={type} placeholder={placeholder} />
    </>
  );
};

export default FormLabelSet;
