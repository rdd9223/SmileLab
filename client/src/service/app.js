import axios from "axios";
import { url } from "./config";

export const postSource = async (code, input) => {
  var userId = window.sessionStorage.getItem("userId");
  if (userId == null) {
    alert("로그인이 필요합니다.");
    return;
  } else {
    window.sessionStorage.setItem("validCompile", false);
    return await axios
      .post(url + "/compile", {
        userId: userId,
        source: code,
        input : input,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("currentCode", code);
        window.sessionStorage.setItem("validCompile", true);
        return res;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  }
};

export const getCompileResult = async () => {
  return await axios
    .post(url + "/compile/result", {
      userId: window.sessionStorage.getItem("userId"),
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return;
    });
};

export const postResult = async (variable, operator, data, conditional, repeat, func) => {
  return await axios
    .post(
      url + "/result/save",
      {
        variable: variable,
        operator: operator,
        data: data,
        conditional: conditional,
        repeat: repeat,
        func: func,
      },
      {
        headers: {
          token: window.sessionStorage.getItem("loginToken"),
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return;
    });
};
