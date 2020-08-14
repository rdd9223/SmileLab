import axios from "axios";
import { url } from "./config";

export const postClass = async (className) => {
  return await axios
    .post(
      url + "/class",
      {
        className: className,
      },
      {
        headers: {
          token: window.sessionStorage.getItem("loginToken"),
        },
      }
    )
    .then((res) => {
      if (res.data.status === 201) {
        alert(res.data.message);
        window.location.href = "/class";
        return res;
      }
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const getClass = async () => {
  return await axios
    .get(url + "/class/list")
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const getProfClass = async (idx) => {
  return await axios
    .get(url + "/take/" + idx, {
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

export const getProfClassAll = async () => {
  return await axios
    .get(url + "/take", {
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
