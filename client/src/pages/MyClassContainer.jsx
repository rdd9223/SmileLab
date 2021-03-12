import React from "react";
import MyClassTable from "../components/organisms/MyClassTable";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { getResult } from "./../service/result.js";

const Wrapper = styled.div`
  margin: 50px 50px;
  height: 600px;
  Button {
    float: right;
  }
`;


const MyClassContainer = () => {
  const header = ["날짜", "자료구조", "변수정의", "문제해결 절차수립", "연산", "조건", "반복", "함수", "Class 메서드", "import", ""];
  const [checked, setChecked] = React.useState([]);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    const res = await getResult();
    if (res != null) {
      setData(res.data.data);
      console.log(res)
    }
  };

  const onClick = (event) => {
    if (event.target.checked) {
      if (!checked.includes(event.target.id)) {
        let joined = checked.concat(event.target.id);
        setChecked(joined);
      }
    } else {
      if (checked.includes(event.target.id)) {
        let joined = [].concat(checked);
        let idx = checked.indexOf(event.target.id);
        if (idx > -1) joined.splice(idx, 1);
        setChecked(joined);
      }
    }
  };

  const deleteResult = async () => {
    var ids = "";
    for (var i = 0; i < checked.length; i += 1) {
      ids += checked[i];
      if (i < checked.length - 1) ids += ",";
    }
    const res = await deleteResult(ids);
    if (res.data.status === 200) {
      alert(res.data.message);
      window.location.reload();
    }
  };

  return (
    <Form>
      <Wrapper>
        {data != null && <MyClassTable headers={header} rows={data} onClick={onClick} />}
        <Button name={"삭제"} size={"sm"} onClick={deleteResult} />
      </Wrapper>
    </Form>
  );
};

export default MyClassContainer;
