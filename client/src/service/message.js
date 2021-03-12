import axios from "axios";
import { url } from "./config";

export const postMessage = async (class_idx, receiver, contents) => {
  return await axios
    .post(
      url + "/message",
      {
        class_idx: class_idx,
        receiver: receiver,
        contents: contents,
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
      //console.log(e);
      return;
    });
};

export const getMessage = async (idx) => {
  return await axios
    .get(url + "/message/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      //Catch Err
      //console.log(e);
      return;
    });
};
