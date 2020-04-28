const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const encription = require("../module/auth/encryption");
const jwt = require("../module/auth/jwt");

const user = {
  login: ({ id, pw }) => {
    return new Promise(async (resolve, reject) => {
      if (!id || !pw) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }

      const getUserInfoQuery = `SELECT user_idx, pw, salt FROM user WHERE id='${id}'`;
      const getUserInfoResult = await pool.queryParam_None(getUserInfoQuery);

      const { hashed } = await encription.encryptWithSalt(pw, getUserInfoResult[0].salt);

      if (getUserInfoResult[0].pw === hashed) {
        const token = jwt.sign(getUserInfoResult[0].user_idx);
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, token),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_USER_INFO),
        });
      }
    });
  },
  doubleCheck: (id) => {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }

      const getUserInfoQuery = `SELECT user_idx FROM user WHERE id = '${id}'`;
      const getUserInfoResult = await pool.queryParam_Parse(getUserInfoQuery);

      if (getUserInfoResult[0] !== undefined) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.DUPLICATE_ID),
        });
      } else {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.POSSIBLE_ID),
        });
      }
    });
  },
  signUp: ({ id, pw, name, phone_number, type, class_idx }) => {
    return new Promise(async (resolve, reject) => {
      if (!id || !pw || !name || !phone_number || !type || !class_idx) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }

      const { salt, hashedPW } = await encription.encrypt(pw);

      const signUpTransaction = await pool.Transaction(async (connection) => {
        const insertUserInfoQuery =
          "INSERT INTO user (id, pw, salt, name, phone_number, type) VALUES (?, ?, ?, ?, ?, ?)";
        const insertUserInfoResult = await connection.query(insertUserInfoQuery, [
          id,
          hashedPW,
          salt,
          name,
          phone_number,
          type,
        ]);
        const insertTakeClassQuery = `INSERT INTO take (class_idx, student_idx) VALUES (?, ?)`;
        const insertTakeClassResult = await connection.query(insertTakeClassQuery, [
          class_idx,
          insertUserInfoResult.insertId,
        ]);
      });

      if (signUpTransaction === undefined) {
        return resolve({
          json: authUtil.successFalse(statusCode.DB_ERROR, responseMessage.DB_ERROR),
        });
      } else {
        return resolve({
          json: authUtil.successTrue(statusCode.CREATED, responseMessage.SIGN_UP_SUCCESS),
        });
      }
    });
  },
  getInfo: (userIdx) => {
    return new Promise(async (resolve, reject) => {
      // TODO: 클래스도 같이 나오게 하기
      const getClassInfoQuery = `SELECT class.name FROM take, class WHERE student_idx = ${userIdx} AND take.class_idx = class.class_idx`;
      const getUserInfoQuery = `SELECT id, name, phone_number, type, (${getClassInfoQuery}) as class_name FROM user WHERE user_idx = '${userIdx}'`;
      const getUserInfoResult = await pool.queryParam_None(getUserInfoQuery);
      console.log(userIdx);
      if (getUserInfoQuery[0] !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS("유저정보"),
            getUserInfoResult[0]
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(statusCode.DB_ERROR, responseMessage.X_READ_FAIL("유저정보")),
        });
      }
    });
  },
  putInfo: (userIdx) => {
    return new Promise(async (resolve, reject) => {
      const updateUserInfoQuery = `UPDATE user SET pw = ?, salt = ?, name = ?, phone_number = ?, class`;
    });
  },
};

module.exports = user;
