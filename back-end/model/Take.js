const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const userType = require("../module/utils/userStatus");

const take = {
  takeClass: ({ user_idx, class_idx, type }) => {
    return new Promise(async (resolve, reject) => {
      if (!class_idx) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
      if (type === userType.Professor) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.UNAUTHORIZED,
            responseMessage.X_UNAUTHORIZED("교수")
          ),
        });
      }
      const postTakeClassQuery = `INSERT INTO take (class_idx, student_idx) VALUES (?, ?)`;
      const postTakeClassResult = await pool.queryParam_Parse(postTakeClassQuery, [
        class_idx,
        user_idx,
      ]);

      if (postTakeClassResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.CREATED,
            responseMessage.X_CREATE_SUCCESS("강의 수강")
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_CREATE_FAIL("강의 수강")
          ),
        });
      }
    });
  },
  getClassInfo: ({ user_idx, type }) => {
    return new Promise(async (resolve, reject) => {
      if (type === userType.Student) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.UNAUTHORIZED,
            responseMessage.X_UNAUTHORIZED("학생")
          ),
        });
      }
      
      const getClassInfoQuery = `SELECT class.name, class_idx FROM class  WHERE professor_idx = ${user_idx}`;
      const getClassInfoResult = await pool.queryParam_Parse(getClassInfoQuery);

      return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS("클래스"),
            getClassInfoResult
          ),
        })

    });
  },
  getStudentFromClass: ({ type, idx }) => {
    return new Promise(async (resolve, reject) => {
      if (type === userType.Student) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.UNAUTHORIZED,
            responseMessage.X_UNAUTHORIZED("학생")
          ),
        });
      }
      
      const getStudentFromClassQuery = `SELECT user.name, class_idx FROM take, user WHERE class_idx = ${idx}`;
      const getStudentFromClassResult = await pool.queryParam_Parse(getStudentFromClassQuery);

      return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS("수강 학생"),
            getStudentFromClassResult
          ),
        })
    });
  },
};

module.exports = take;
