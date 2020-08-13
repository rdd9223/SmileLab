import React from "react";
import MyClassTable from "../components/organisms/MyClassTable";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { getResult, deleteResult } from "./../service/result.js"

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  height: 600px;
  Button {
    float: right;
  }
`;

const MyClassContainer = () => {
  const header = ["날짜", "변수", "연산자", "데이터", "조건문", "반복문", "함수", ""]
  const [checked, setChecked] = React.useState([]);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    loadResult();
  }, [])
  

  const loadResult = async() => {
    const res = await getResult();
    if(res != null){
      setData(res.data.data);
    }
  }

  const onClick = (event) =>{
    if(event.target.checked){
      if(!checked.includes(event.target.id)){
        var joined = checked.concat(event.target.id);
        setChecked(joined);
      }
    }else{
      if(checked.includes(event.target.id)){
        var joined = [].concat(checked);
        var idx = checked.indexOf(event.target.id);
        if (idx > -1) joined.splice(idx, 1)
        setChecked(joined);
      }
    }
  }

  const deleteResult = async() => {
    var ids = '';
    for(var i = 0; i < checked.length; i += 1){
      ids += checked[i]
      if(i < checked.length -1 ) ids += ","
    }
    const res = await deleteResult(ids);
    if(res.data.status === 200){
      alert(res.data.message);
      window.location.reload(true);
    }
  }

  return (
    <Form>
      <Wrapper>
        {this.state.data != null && 
          <MyClassTable headers={this.state.header} rows={this.state.data} onClick={this.onClick} />
        }
        <Button name={"삭제"} size={"sm"} onClick={this.deleteResult} />
      </Wrapper>
    </Form>
  );
  
  
};

export default MyClassContainer;
