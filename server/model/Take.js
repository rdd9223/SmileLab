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
      //console.log(user_idx);
      const getClassInfoQuery = `SELECT class.name, class_idx FROM class  WHERE professor_idx = ${user_idx}`;
      const getClassInfoResult = await pool.queryParam_Parse(getClassInfoQuery);

      return resolve({
        json: authUtil.successTrue(
          statusCode.OK,
          responseMessage.X_READ_SUCCESS("클래스"),
          getClassInfoResult
        ),
      });
    });
  },
  getTake: ({ user_idx, type }) => {
    return new Promise(async (resolve, reject) => {
      const getTakeQuery = `SELECT class.name, take.class_idx FROM take LEFT JOIN class ON take.class_idx = class.class_idx  WHERE take.student_idx = ${user_idx}`;
      const getTakeResult = await pool.queryParam_Parse(getTakeQuery);
      return resolve({
        json: authUtil.successTrue(
          statusCode.OK,
          responseMessage.X_READ_SUCCESS("클래스"),
          getTakeResult
        ),
      });
    });
  },
  getStudentFromClass: ({ type, idx }) => {
    return new Promise(async (resolve, reject) => {
      const getStudentFromClassQuery = `SELECT take.student_idx, user.name, class_idx FROM take LEFT JOIN user ON take.student_idx = user.user_idx WHERE class_idx = ${idx}`;
      const getStudentFromClassResult = await pool.queryParam_Parse(getStudentFromClassQuery);

      return resolve({
        json: authUtil.successTrue(
          statusCode.OK,
          responseMessage.X_READ_SUCCESS("수강 학생"),
          getStudentFromClassResult
        ),
      });
    });
  },
  getStudentCompileInfo: ({ type, idx, student }) => {
    return new Promise(async (resolve, reject) => {
      if (type === userType.Student) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.UNAUTHORIZED,
            responseMessage.X_UNAUTHORIZED("학생")
          ),
        });
      }
      const getStudentCompileInfoQuery = `SELECT * FROM result WHERE writer_idx = ${student}`;
      //console.log(getStudentCompileInfoQuery)
      const getStudentCompileInfoResult = await pool.queryParam_Parse(getStudentCompileInfoQuery);
      if (getStudentCompileInfoResult !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_ALL_SUCCESS(`컴파일 결과`),
            getStudentCompileInfoResult
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_ALL_FAIL(`컴파일 결과`)
          ),
        });
      }
    });
  },
};

module.exports = take;
