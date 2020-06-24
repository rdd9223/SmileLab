import axios from "axios";

export const postSource = async (code) => {
  var userId = window.sessionStorage.getItem('userId');
  if(userId == null){
    alert("로그인이 필요합니다.");
    return;
  }
    
  return await axios.post("http://localhost:4000/compile", {
    userId: userId,
    source: code,
  })
  .then((res) => {
    console.log(res);
    localStorage.setItem('currentCode', code);
    return res;
  })
  .catch((e) => {
    console.log(e);
    return;
  });
};

export const compileResult = async (code) => {
  /*return await axios
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
    });*/
};
