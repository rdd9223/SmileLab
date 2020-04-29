const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");

const board = {
  getBoardList: ({ userIdx, page }) => {
    return new Promise(async (resolve, reject) => {
      const getUserTakeClassQuery = `SELECT class_idx FROM take WHERE student_idx = ${userIdx}`;
      const getBoardListQuery = `SELECT * FROM board WHERE class_idx = (${getUserTakeClassQuery}) ORDER BY board_idx DESC LIMIT ${
        page - 1
      }, 10`;
      const getBoardListResult = await pool.queryParam_Parse(getBoardListQuery);

      if (getBoardListResult !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS(`${page}페이지 게시물`),
            getBoardListResult
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_FAIL(`${page}페이지 게시물`)
          ),
        });
      }
    });
  },
  postBoard: () => {
    return new Promise(async (resolve, reject) => {});
  },
  getBoard: () => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = board;
