const statusCode = require("../module/utils/statusCode");
const userType = require("../module/utils/userStatus");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const moment = require("moment");
const { Professor, Student } = require("../module/utils/userStatus");
require("moment-timezone");

const board = {
  getBoardList: ({ user_idx, type, page, board_type, class_idx }) => {
    return new Promise(async (resolve, reject) => {
      var getBoardListQuery = `
        SELECT board.*, user.name as writer 
        FROM board
        LEFT JOIN user 
        ON board.writer_idx = user_idx
        WHERE board_type = ${board_type} 
        AND class_idx = ${class_idx}
        ORDER BY board_idx DESC LIMIT ${(page - 1) * 10}, 10
      `;

      if (type === Student) {
        getBoardListQuery = `
          SELECT  board.*, user.name as writer 
          FROM board 
          LEFT JOIN user 
          ON board.writer_idx = user_idx 
          WHERE board_type = ${board_type} 
          AND class_idx = (
            SELECT class_idx
            FROM take
            WHERE student_idx = ${user_idx}
          )
          ORDER BY board_idx DESC LIMIT ${(page - 1) * 10}, 10
        `;
      }

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
  postBoard: ({ user_idx, type, title, contents, board_type, class_idx }) => {
    return new Promise(async (resolve, reject) => {
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      if (!title || !contents) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }

      var postBoardQuery = `
        INSERT INTO board (
          class_idx, title, contents, writer_idx, date, board_type
        ) VALUES (
          ?, ?, ?, ?, ?, ?
        )
      `;

      if (type === Student) {
        postBoardQuery = `
          INSERT INTO board (
            class_idx, title, contents, writer_idx, date, board_type
          ) VALUES (
            (select 
              class_idx
              from take 
              where student_idx = ?
            ), ?, ?, ?, ?, ?
          )`;
      }
      const postBoardResult = await pool.queryParam_Parse(postBoardQuery, [
        type === Student ? user_idx : class_idx,
        title,
        `${contents}`,
        user_idx,
        date,
        board_type,
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
  getBoard: ({ user_idx, boardIdx }) => {
    return new Promise(async (resolve, reject) => {
      const getBoardInfoQuery = `SELECT board.*, user.name as writer FROM board LEFT JOIN user ON board.writer_idx = user_idx WHERE board_idx = (select class_idx from take where student_idx = ?)`;
      const getBoardInfoResult = await pool.queryParam_Parse(getBoardInfoQuery, [boardIdx]);

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
  putBoard: ({ user_idx, boardIdx, title, contents }) => {
    return new Promise(async (resolve, reject) => {
      const putBoardInfoQuery = `UPDATE board SET title = ?, contents = ? WHERE board_idx = ? AND writer_idx = ?`;
      const putBoardInfoResult = await pool.queryParam_Parse(putBoardInfoQuery, [
        title,
        contents,
        boardIdx,
        user_idx,
      ]);

      if (putBoardInfoResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_UPDATE_SUCCESS("게시글")),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_UPDATE_FAIL("게시글")
          ),
        });
      }
    });
  },
  deleteBoard: ({ user_idx, boardIdx }) => {
    return new Promise(async (resolve, reject) => {
      const deleteBoardCommentQuery = `DELETE FROM comment WHERE board_idx = ?`;
      const deleteBoardCommentResult = await pool.queryParam_Parse(deleteBoardCommentQuery, [
        boardIdx,
      ]);

      const deleteBoardInfoQuery = `DELETE FROM board WHERE board_idx = ? AND writer_idx = ?`;
      const deleteBoardInfoResult = await pool.queryParam_Parse(deleteBoardInfoQuery, [
        boardIdx,
        user_idx,
      ]);

      if (deleteBoardInfoResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(statusCode.OK, responseMessage.X_DELETE_SUCCESS("게시글")),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_DELETE_FAIL("게시글")
          ),
        });
      }
    });
  },
};

module.exports = board;
