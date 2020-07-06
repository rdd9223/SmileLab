import axios from "axios";
import { url } from "./config";

export const getBoardList = async (idx) => {
  return await axios(url + "/board/list/" + idx, {
    headers: {
      token: window.sessionStorage.getItem("loginToken"),
    },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return;
    });
};

export const postBoard = async (title, contents) => {
  return await axios
    .post(
      url + "/board",
      {
        title: title,
        contents: contents,
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
      console.log(e);
      return;
    });
};
