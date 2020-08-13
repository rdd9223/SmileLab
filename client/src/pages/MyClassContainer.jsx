import React from "react";
import MyClassTable from "../components/organisms/MyClassTable";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { getResult, deleteResult } from "./../service/result.js";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  height: 600px;
  Button {
    float: right;
  }
`;

class MyClassContainer extends React.Component {
  constructor(props) {
    super(props);

    this.loadResult = this.loadResult.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
    this.onClick = this.onClick.bind(this);
    this.loadResult();
    this.state = {
      header: ["날짜", "변수", "연산자", "데이터", "조건문", "반복문", "함수", ""],
      checked: [],
      data: null,
    };
  }

  async loadResult() {
    const res = await getResult();
    this.setState({ data: res.data.data });
  }

  async onClick(e) {
    if (e.target.checked) {
      if (!this.state.checked.includes(e.target.id)) {
        var joined = this.state.checked.concat(e.target.id);
        await this.setState({ checked: joined });
      }
    } else {
      if (this.state.checked.includes(e.target.id)) {
        var isJoined = [].concat(this.state.checked);
        var idx = this.state.checked.indexOf(e.target.id);
        if (idx > -1) isJoined.splice(idx, 1);
        await this.setState({ checked: isJoined });
      }
    }
  }

  async deleteResult() {
    var ids = "";
    for (var i = 0; i < this.state.checked.length; i += 1) {
      ids += this.state.checked[i];
      if (i < this.state.checked.length - 1) ids += ",";
    }
    const res = await deleteResult(ids);
    if (res.data.status === 200) {
      alert(res.data.message);
      window.location.reload(true);
    }
  }

  render() {
    return (
      <Form>
        <Wrapper>
          {this.state.data != null && (
            <MyClassTable
              headers={this.state.header}
              rows={this.state.data}
              onClick={this.onClick}
            />
          )}
          <Button name={"삭제"} size={"sm"} onClick={this.deleteResult} />
        </Wrapper>
      </Form>
    );
  }
}

export default MyClassContainer;
