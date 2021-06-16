import axios from "axios";
import { url } from "./config";

export const getStuResult = async (currentClass, idx) => {
  return await axios
    .get(url + "/take/" + currentClass + "/" + idx, {
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

export const getResult = async () => {
  return await axios
    .get(url + "/result", {
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

export const deleteResult = async (ids) => {
  return await axios
    .delete(url + "/result", {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
      data: {
        data: ids,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return;
    });
};
