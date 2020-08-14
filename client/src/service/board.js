import axios from "axios";
import { url } from "./config";

export const getBoardList = async (idx) => {
  return await axios.get(url + "/board/list/" + idx, {
    headers: {
      token: window.sessionStorage.getItem("loginToken"),
    },
  })
  .then((res) => {
    //console.log(res);
    return res;
  })
  .catch((e) => {
    return null;
  });
};

export const getBoard = async (idx) => {
  return await axios.get(url + "/board/" + idx, {
    headers: {
      token: window.sessionStorage.getItem("loginToken"),
    },
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    return null;
  })
}

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
    return null;
  });
};

export const postComment = async(idx, title, contents) => {
  return await axios.post(url + "/board/comment", {
    title: title,
    contents: contents,
    board_idx: idx,
  },{
    headers: {
      token: window.sessionStorage.getItem("loginToken"),
    }
  })
  .then((res) => {
    console.log(res);
    return res;
  })
  .catch((e) => {
    console.log(e);
    return null;
  })
}

export const getComment = async(idx) => {
  return await axios.get(url + "/board/comment/" + idx, {
    headers: {
      token: window.sessionStorage.getItem("loginToken"),
    }
  })
  .then((res) => {
    return res;
  })
  .catch((e) => {
    console.log(e);
    return null;
  })
}
