const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");

const message = {
  postMessage: () => {
    return new Promise(async (resolve, reject) => {});
  },
  getMessageList: () => {
    return new Promise(async (resolve, reject) => {});
  },
  getMessageInfo: () => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = message;
