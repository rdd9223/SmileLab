const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const moment = require("moment");
require("moment-timezone");

const result = {
  getMyCompileResult: ({ user_idx }) => {
    return new Promise(async (resolve, reject) => {
      const getMyCompileResultQuery = `SELECT * FROM result WHERE result.writer_idx = ${user_idx}`;
      const getMyCompileResultResult = await pool.queryParam_Parse(getMyCompileResultQuery);
      if (getMyCompileResultResult !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_ALL_SUCCESS(`컴파일 결과`),
            getMyCompileResultResult
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
  getOtherCompileResult: () => {
    return new Promise(async (resolve, reject) => {});
  },
  deleteResult: (data) => {
    return new Promise(async (resolve, reject) => {
      const deleteResultQuery = `DELETE FROM result WHERE result_idx IN (${data.data})`;
      const deleteResultResult = await pool.queryParam_Parse(deleteResultQuery);

      if (deleteResultResult.affectedRows === 0) {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_DELETE_FAIL("결과")
          ),
        });
      } else {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_DELETE_SUCCESS("결과")),
        });
      }
    });
  },
  saveResult: ({
    user_idx,
    variable,
    operator,
    data,
    conditional,
    repeat,
    func,
    classMethod,
    importMethod,
    dataAbstract,
    problemResolving,
    list,
    tuple,
    dictionary,
    set,
  }) => {
    return new Promise(async (resolve, reject) => {
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      const postSaveResultQuery = `INSERT INTO result (writer_idx, date, variable, operator, data, conditional, \`repeat\`, function, class_method, import, data_abstract, problem_resolving, list, tuple, dictionary, \`set\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const postSaveResultResult = await pool.queryParam_Parse(postSaveResultQuery, [
        user_idx,
        date,
        variable,
        operator,
        data,
        conditional,
        repeat,
        func,
        classMethod,
        importMethod,
        dataAbstract,
        problemResolving,
        list,
        tuple,
        dictionary,
        set,
      ]);

      if (postSaveResultResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.CREATED,
            responseMessage.X_CREATE_SUCCESS("결과", postSaveResultResult)
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_CREATE_FAIL("결과")
          ),
        });
      }
    });
  },
};

module.exports = result;
