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

      const getUserInfoQuery = `SELECT user_idx, type, pw, salt FROM user WHERE id='${id}'`;
      const getUserInfoResult = await pool.queryParam_None(getUserInfoQuery);

      //ID가 존재하지 않을 때 getUserInfoResult[0]이 NULL이 됨.
      if (getUserInfoResult[0] == null) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_USER_INFO),
        });
      }

      const { hashed } = await encription.encryptWithSalt(pw, getUserInfoResult[0].salt);

      if (getUserInfoResult[0].pw === hashed) {
        const token = jwt.sign([getUserInfoResult[0].user_idx, getUserInfoResult[0].type]);
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
      if (!id || !pw || !name || !phone_number || !type) {
        //class_idx 나중에 추가할 것
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
  getInfo: ({ user_idx, type }) => {
    return new Promise(async (resolve, reject) => {
      const getClassInfoQuery = `SELECT DISTINCT class.name FROM take, class WHERE student_idx = ${user_idx} AND take.class_idx = class.class_idx`;
      const getUserInfoQuery = `SELECT user_idx, id, name, phone_number, type, (${getClassInfoQuery}) as class_name FROM user WHERE user_idx = ${user_idx}`;
      const getUserInfoResult = await pool.queryParam_None(getUserInfoQuery);

      if (getUserInfoQuery[0] !== undefined) {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_READ_SUCCESS("유저정보"), getUserInfoResult[0]),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(statusCode.DB_ERROR, responseMessage.X_READ_FAIL("유저정보")),
        });
      }
    });
  },
  putInfo: ({ pw, name, phone_number, class_idx, user_idx }) => {
    return new Promise(async (resolve, reject) => {
      const { salt, hashedPW } = await encription.encrypt(pw);

      const updateUserInfoQuery = `UPDATE user u, take t SET u.pw = ?, u.salt = ?, u.name = ?, u.phone_number = ?, t.class_idx = ? WHERE u.user_idx = ${user_idx} AND t.student_idx = ${user_idx}`;
      const updateUserInfoResult = await pool.queryParam_Parse(updateUserInfoQuery, [
        hashedPW,
        salt,
        name,
        phone_number,
        class_idx,
      ]);

      if (updateUserInfoResult === undefined) {
        return resolve({
          json: authUtil.successFalse(statusCode.DB_ERROR, responseMessage.X_UPDATE_FAIL("유저정보")),
        });
      } else {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_UPDATE_SUCCESS("유저정보")),
        });
      }
    });
  },
};

module.exports = user;
