const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");

const take = {
  takeClass: () => {
    return new Promise(async (resolve, reject) => {});
  },
  getClassInfo: () => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = take;
