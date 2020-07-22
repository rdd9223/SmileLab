import axios from "axios";
import { url } from "./config";

export const postUser = async (
  id,
  password,
  phone_number,
  name,
  type,
  class_idx
) => {
  return await axios
    .post(url + "/auth/signup", {
      id: id,
      pw: password,
      phone_number: phone_number,
      name: name,
      type: type,
      class_idx: class_idx,
    })
    .then((res) => {
      //console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const checkDouble = async (id) => {
  return await axios
    .post(url + "/auth/signup/idcheck", {
      id: id,
    })
    .then((res) => {
      //console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const getUser = async () => {
  return await axios
    .get(url + "/auth/user", {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      //console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const updateUser = async (pw, name, phone_number, class_idx) => {
  return await axios
    .put(
      url + "/auth/user",
      {
        pw: pw,
        name: name,
        phone_number: phone_number,
        class_idx: class_idx,
      },
      {
        headers: {
          token: window.sessionStorage.getItem("loginToken"),
        },
      }
    )
    .then((res) => {
      //console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const signIn = async (id, pw) => {
  return await axios
    .post(url + "/auth/signin", {
      id: id,
      pw: pw,
    })
    .then((res) => {
      //로그인 성공 시 반환되는 토큰을 session에 저장
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};
