import React from "react";

const CodeLoadInput = props => {

  const handleCodeChange = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      props.onChange(fileReader.result);
    };
    fileReader.readAsText(file);
  } 
  return (
    <div className="custom-file">
      <input
        type="file"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
        style={{ display: "none" }}
        onChange={handleCodeChange}
      />
      <label className="custom-file-label" htmlFor="inputGroupFile01">
        Choose file
      </label>
    </div>
  );
};

export default CodeLoadInput;
