const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const moment = require("moment");
require("moment-timezone");

const board = {
  getBoardList: ({ userIdx, page }) => {
    return new Promise(async (resolve, reject) => {
      const getUserTakeClassQuery = `SELECT class_idx FROM take WHERE student_idx = ${userIdx}`;
      const getBoardListQuery = `SELECT * FROM board WHERE class_idx = (${getUserTakeClassQuery}) ORDER BY board_idx DESC LIMIT ${
        (page - 1) * 10
      }, 10`;
      const getBoardListResult = await pool.queryParam_Parse(getBoardListQuery);

      if (getBoardListResult !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_ALL_SUCCESS(`${page}페이지 게시물`),
            getBoardListResult
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_ALL_FAIL(`${page}페이지 게시물`)
          ),
        });
      }
    });
  },
  postBoard: ({ userIdx, title, contents }) => {
    return new Promise(async (resolve, reject) => {
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      if (!title || !contents) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
      const getUserTakeClassQuery = `SELECT class_idx FROM take WHERE student_idx = ${userIdx}`;
      const postBoardQuery = `INSERT INTO board (title, contents, writer_idx, date, class_idx) VALUES (?, ?, ?, ?, (${getUserTakeClassQuery}))`;
      const postBoardResult = await pool.queryParam_Parse(postBoardQuery, [
        title,
        contents,
        userIdx,
        date,
      ]);

      if (postBoardResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.CREATED,
            responseMessage.X_CREATE_SUCCESS("게시글")
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_CREATE_FAIL("게시글")
          ),
        });
      }
    });
  },
  getBoard: ({ userIdx, boardIdx }) => {
    return new Promise(async (resolve, reject) => {
      const getBoardInfoQuery = `SELECT * FROM board WHERE board_idx = ${boardIdx}`;
      const getBoardInfoResult = await pool.queryParam_Parse(getBoardInfoQuery);

      if (getBoardInfoResult[0] !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_SUCCESS("게시글"),
            getBoardInfoResult
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_FAIL("게시글")
          ),
        });
      }
    });
  },
};

module.exports = board;
