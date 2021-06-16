import axios from "axios";
import { url } from "./config";

export const getBoardList = async (idx, board_type, class_idx) => {
  return await axios
    .get(url + "/board/list/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
      params: {
        board_type: board_type,
        class_idx: class_idx,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};

export const getBoard = async (idx) => {
  return await axios
    .get(url + "/board/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};

export const postBoard = async (title, contents, board_type, class_idx) => {
  return await axios
    .post(
      url + "/board",
      {
        title: title,
        contents: contents,
        board_type: board_type,
      },
      {
        headers: {
          token: window.sessionStorage.getItem("loginToken"),
        },
        params: {
          class_idx: class_idx,
        },
      }
    )
    .then((res) => {
      if (res.data.code === 401) {
        alert("로그인을 먼저 해주세요!");
        window.location.href = "/";
      }
      return res;
    })
    .catch((e) => {
      return null;
    });
};

export const postComment = async (idx, title, contents) => {
  return await axios
    .post(
      url + "/board/comment",
      {
        title: title,
        contents: contents,
        board_idx: idx,
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
      return null;
    });
};

export const getComment = async (idx) => {
  return await axios
    .get(url + "/board/comment/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};

export const putBoard = async (idx, title, contents) => {
  return await axios
    .put(
      url + "/board/" + idx,
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
      return null;
    });
};

export const deleteBoard = async (idx) => {
  return await axios
    .delete(url + "/board/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};

export const putComment = async (idx, title, contents) => {
  return await axios
    .put(
      url + "/board/comment/" + idx,
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
      return null;
    });
};

export const deleteComment = async (idx) => {
  return await axios
    .delete(url + "/board/comment/" + idx, {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};
