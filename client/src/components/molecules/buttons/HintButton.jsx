import React from "react";
import Button from "../../atoms/Button";

const HintButton = ({ resultCode }) => {
  const resultMessage = () => {
    if (resultCode.indexOf("SyntaxError") !== -1) {
      if (resultCode.indexOf("EOL while scanning string literal") !== -1) {
        return "따옴표의 짝이 맞는지 확인하세요.";
      } else if (resultCode.indexOf("Can't assign to keyword") !== -1) {
        return "파이썬의 예약어는 변수의 이름으로 활용될 수 없습니다.";
      } else if (resultCode.indexOf("Invalid syntax") !== -1) {
        return "파이썬 문법에 맞는지 다시 확인해보세요.";
      } else if (resultCode.indexOf("Can't assign to literal") !== -1) {
        return "변수의 이름은 숫자로 시작할 수 없습니다. 변수의 이름을 확인하세요";
      } else {
        return "파이썬 문법을 다시 확인하세요";
      }
    } else if (resultCode.indexOf("IndentationError") !== -1) {
      if (resultCode.indexOf("Excepted an indented block") !== -1) {
        return "if문 다음줄에는 들여쓰기가 있어야 합니다. 들여쓰기가 모자라는지 확인해보세요.";
      } else if (resultCode.indexOf("Unindent does not match any outer indentation level") !== -1) {
        return "들여쓰기를 할 때, 'space'와 'tap'을 혼용하지 않아야 합니다.";
      } else if (resultCode.indexOf("Unexpected indent") !== -1) {
        return "들여쓰기가 더 되어 있는지 확인하세요.";
      } else {
        return "들여쓰기를 확인하세요";
      }
    } else if (resultCode.indexOf("NameError") !== -1) {
      if (resultCode.indexOf("Name") !== -1) {
        if (resultCode.indexOf("is not defined") !== -1)
          return "호출한 변수의 이름을 다시 확인해보세요.";
      } else {
        return "변수의 이름을 확인하세요.";
      }
    } else if (resultCode.indexOf("ZeroDivisionError") !== -1) {
      return "숫자를 0으로 나눌 수 없습니다. 다시 확인해보세요.";
    } else if (resultCode.indexOf("RecursionError") !== -1) {
      if (resultCode.indexOf("Maximum recursion depth exceeded") !== -1) {
        return "재귀함수의 종료 조건을 설정하세요";
      } else {
        return "";
      }
    } else if (resultCode.indexOf("AttributeError") !== -1) {
      if (resultCode.indexOf("‘list’ object has no attribute ‘value’") !== -1) {
        return "리스트에 없는 속성을 호출하였는지 확인하세요.";
      } else if (resultCode.indexOf("Module ‘numpy’ has no attribute ‘addition’") !== -1) {
        return "'모듈 'numpy'에 없는 속성인 'addition'을 호출할 수 없습니다.";
      } else {
        return "각 리스트 및 모듈에 없는 속성을 호출하였는지 확인하세요.";
      }
    } else if (resultCode.indexOf("ValueError") !== -1) {
      if (resultCode.indexOf("Invalid literal for int() with base") !== -1) {
        return "int() 함수 안에 함수 작성자가 의도하지 않은 변수인 문자열이 입력 된 경우";
      } else {
        return "함수안에 실행인자를 잘못 입력하였는지 확인하세요.\n (예) 함수int()에는 문자열을 입력할 수 없습니다.";
      }
    } else if (resultCode.indexOf("TypeError") !== -1) {
      if (resultCode.indexOf("Bad operand type for abs(): ‘str’") !== -1) {
        return "절대값을 반환하는 함수 abs()는 자료형 'str'을 입력으로 받을 수 없습니다.";
      } else if (
        resultCode.indexOf("‘in <string>’ requires string as left operand, not int") !== -1
      ) {
        return "'in <string>' 문자 형태에서는 'in'앞에 'int'가 아닌 'str'자료형이 입력되어야 합니다.";
      } else if (resultCode.indexOf("Argument of type ‘int’ is not iterable") !== -1) {
        return "'in' 뒤에는 멤버를 하나씩 반환할 수 있는 오브젝트인 iterable한 자료형이 위치해야 합니다.\n(int 자료형은 iterable한 자료형이 아닙니다.)";
      } else if (resultCode.indexOf("Abs() takes exactly one argument(0 given)") !== -1) {
        return "입력값의 절대값을 반환하는 함수인 abs()는 1개의 실행인자를 받아야 합니다.";
      } else if (resultCode.indexOf("Required argument ‘number’(pos 1) not found ") !== -1) {
        return "입력값의 반올림값을 변환하는 함수 round()에 실행인자의 개수가 잘못 입력되었습니다.";
      } else if (resultCode.indexOf("Max expected 1argumnets, got 0") !== -1) {
        return "입력된 값들 중 최대값을 반환하는 함수 max()에 실행인자의 개수가 잘못 입력되었습니다.";
      } else {
        return "각 함수와 자료의 형태, 실행인자의 수를 확인하세요.";
      }
    } else if (resultCode === "") {
      return "코드를 실행해주세요."; 
    } else if (resultCode.indexOf("Error:")){
      return "잘못된 코드가 있습니다."
    } else {
      return "올바른 코드입니다.";
    }
  };
  return (
    <Button
      style={{ position: "absolute", bottom: "15px", right: "4%" }}
      variant={"primary"}
      onClick={() => alert(resultMessage())}
      name={"?"}
    />
  );
};

export default HintButton;
