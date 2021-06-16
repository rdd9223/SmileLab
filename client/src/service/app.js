import axios from "axios";
import { url } from "./config";
import { convertInputArrToStr } from "../utils/converter";

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
        input: convertInputArrToStr(input),
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

export const postResult = async (body) => {
  return await axios
    .post(url + "/result/save", body, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return;
    });
};
