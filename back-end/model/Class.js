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
  postClass: ({ className, user_idx }) => {
    return new Promise(async (resolve, reject) => {
      if (!className) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
      const getClassInfoQuery = `SELECT class_idx FROM class WHERE name = '${className}'`;
      const postClassQuery = `INSERT class (name, professor_idx) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (${getClassInfoQuery})`;
      const postClassResult = await pool.queryParam_Parse(postClassQuery, [className, user_idx]);

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
  deleteClass: ({ user_idx, class_idx }) => {
    return new Promise(async (resolve, reject) => {
      const deleteClassQuery = `DELETE FROM class WHERE professor_idx = ${user_idx} AND class_idx = ${class_idx}`;
      const deleteClassResult = await pool.queryParam_Parse(deleteClassQuery);

      if (deleteClassResult.affectedRows === 0) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_DELETE_FAIL("강의")
          ),
        }); 
      } else {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_DELETE_SUCCESS("강의")),
        });
      }
    });
  },
  getClassList: () => {
    return new Promise(async (resolve, reject) => {
      const getClassListQuery = `SELECT class_idx, class.name as class_name, user.name as professor_name FROM class LEFT JOIN user ON class.professor_idx = user.user_idx WHERE user.type = 1`
      const getClassListResult = await pool.queryParam_Parse(getClassListQuery);
      if (getClassListResult === undefined) {
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
            getClassListResult
          ),
        });
      }
    });
  },
};

module.exports = classInfo;
