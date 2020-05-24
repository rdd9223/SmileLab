import axios from "axios";

export const postSource = async (code) => {
  return await axios
    .post("http://localhost:4000/users", {
      userId: 10,
      source: code,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export const compileResult = async (code) => {
  return await axios
    .post("http://localhost:4000/users/check", {
      userId: 10,
      source: code,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};
