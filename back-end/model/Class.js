const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");

const classInfo = {
  searchClass: ({ className }) => {
    return new Promise(async (resolve, reject) => {
      if (!className) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
      const getProfessorInfoQuery = `SELECT name FROM user WHERE class.professor_idx = user_idx`;
      const getClassInfoQuery = `SELECT *, (${getProfessorInfoQuery}) as professor_name FROM class WHERE name LIKE '%${className}%' ORDER BY name`;
      const getClassInfoResult = await pool.queryParam_None(getClassInfoQuery);

      if (getClassInfoResult === undefined) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_FAIL("클래스")
          ),
        });
      } else {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS("클래스"),
            getClassInfoResult
          ),
        });
      }
    });
  },
  postClass: ({ className, userIdx }) => {
    return new Promise(async (resolve, reject) => {
      const postClassQuery = `INSERT INTO class (name, professor_idx) VALUES (?, ?)`;
      const postClassResult = await pool.queryParam_Parse(postClassQuery, [className, userIdx]);

      if (postClassResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(statusCode.CREATED, responseMessage.X_CREATE_SUCCESS("강의")),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_CREATE_FAIL("강의")
          ),
        });
      }
    });
  },
  deleteClass: ({ userIdx, class_idx }) => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = classInfo;
