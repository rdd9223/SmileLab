import Text from "components/atoms/Text";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Img from "./../components/atoms/Images";

const img_arrow = require("../images/img_icon_arrow.png")
const img_background = require("../images/img_background_menual.png")

const Wrapper = styled.div`
  width: 50em;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  Button {
    float: right;
  }
`;

const MenualContainer = () => {
  return (
    <>
      <Wrapper>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{textAlign:'center', height: 80, display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <h5>
              자료수집/분석
            </h5>
            <h5>
              자료표현, 문제분해
            </h5>
          </div>
          <div>
            <img src={img_arrow} alt="img_arrow" width="80" height="80" style={{marginLeft: 20, marginRight: 20}} />
          </div>
          <div style={{textAlign:'center', height: 80, display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <h5>
              알고리즘 및 절차
            </h5>
            <h5>
              자동화, 디버깅, 시뮬레이션
            </h5>
          </div>
          <div>
            <img src={img_arrow} alt="img_arrow" width="80" height="80" style={{marginLeft: 20, marginRight: 20}} />
          </div>
          <div style={{textAlign:'center', height: 80, display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <h5>
              평가/일반화
            </h5>
          </div>
        </div>
        <div style={{background : `url(${img_background})`, backgroundSize:'cover', width:'100%', height:500}}>
          <div style={{display:'flex', paddingTop: 100, justifyContent:'space-between', textAlign:'center'}}>
            <div style={{ backgroundColor:'rgba(255,255,255, 0.8)', padding: 20, borderRadius:'100%', border:'2px solid #222' }}>
              <Text text="순서도" />
              <Text text="메모장" />
              <Text text="커뮤니티" />
              <Text text="(아이디어 얻기, 동료찾기)" />
            </div> 
            <div style={{ backgroundColor:'rgba(255,255,255, 0.8)', padding: 20, borderRadius:'100%', border:'2px solid #222' }}>
              <Text text="Python 코딩" />
              <Text text="오류 피드백" />
              <Text text="결과 피드백" />
              <Text text="커뮤니티" />
              <Text text="(질문하기)" />
            </div> 
            <div style={{ backgroundColor:'rgba(255,255,255, 0.8)', padding: 20, borderRadius:'100%', border:'2px solid #222' }}>
              <Text text="커뮤니티" />
              <Text text="(코드공유/리뷰)" />
              <Text text="코드 재사용" />
            </div> 
          </div>
          
        </div>
      </Wrapper>
    </>
  );
}

export default MenualContainer;
