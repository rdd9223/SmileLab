import axios from "axios";
import { url } from "./config";

export const getTake = async () => {
  return await axios
    .get(url + "/take/take", {
      headers: {
        token: window.sessionStorage.getItem("loginToken"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res);
        return res;
      }
    })
    .catch((e) => {
      return;
    });
};
