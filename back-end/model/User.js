const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");

const user = {
  login: ({ id, pw }) => {
    return new Promise(async (resolve, reject) => {
      if (!id || !pw) {
        resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
        return;
      }
    });
  },
  doubleCheck: (id) => {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
        return;
      }

      const getUserInfoQuery = `SELECT user_idx FROM user WHERE id = ${id}`;
      const getUserInfoResult = await pool.queryParam_Parse(getUserInfoQuery);

      if (getUserInfoResult[0] !== undefined) {
        resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.DUPLICATE_ID),
        });
        return;
      } else {
        resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.POSSIBLE_ID),
        });
        return;
      }
    });
  },
  signUp: ({ id, pw, name, phone_number, type }) => {
    return new Promise(async (resolve, reject) => {
      if (!id || !pw || !name || !phone_number || !type) {
        resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
        return;
      }

      const getUserInfoQuery = `SELECT user_idx FROM user WHERE id = ${id}`;
    });
  },
  getInfo: () => {
    return new Promise(async (resolve, reject) => {});
  },
  putInfo: () => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = user;
