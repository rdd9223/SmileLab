const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");

const take = {
  takeClass: ({ user_idx, class_idx }) => {
    return new Promise(async (resolve, reject) => {
      if (!class_idx) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
    });
  },
  getClassInfo: ({ user_idx }) => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = take;
