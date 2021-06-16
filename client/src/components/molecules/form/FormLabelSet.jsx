import React from "react";
import FormLabel from "../../atoms/FormLabel";
import FormControl from "../../atoms/FormControl";

const FormLabelSet = ({ name, type, placeholder, onChange, id, value }) => {
  return (
    <>
      <FormLabel name={name} />
      <FormControl
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        value={value}
      />
    </>
  );
};

export default FormLabelSet;
