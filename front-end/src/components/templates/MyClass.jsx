import React from "react";
import ResponsiveTable from "../organisms/ResponsiveTable";

const MyClass = () => {
  return (
    <div>
      <ResponsiveTable headers={headers} rows={data} />
    </div>
  );
};

export default MyClass;
