const statusCode = require("../module/utils/statusCode");
const userType = require("../module/utils/userStatus");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const moment = require("moment");
require("moment-timezone");

const comment = {
  getCommentList: ({ user_idx, idx }) => {
    return new Promise(async (resolve, reject) => {
      const getCommentListQuery = `SELECT comment.*, user.name as writer FROM comment LEFT JOIN user ON writer_idx = user_idx WHERE board_idx = ? ORDER BY date`;
      const getCommentListResult = await pool.queryParam_Parse(getCommentListQuery, [idx]);
      if (getCommentListResult !== undefined) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_READ_ALL_SUCCESS(`${idx} 댓글`),
            getCommentListResult
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_READ_ALL_FAIL(`${idx} 댓글`)
          ),
        });
      }
    });
  },
  postComment: ({ user_idx, title, contents, board_idx }) => {
    return new Promise(async (resolve, reject) => {
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      if (!contents || !board_idx) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }
      const postCommentQuery = `INSERT INTO comment (title, contents, writer_idx, date, board_idx) VALUES (?, ?, ?, ?, ?)`;
      const postCommentResult = await pool.queryParam_Parse(postCommentQuery, [
        title,
        contents,
        user_idx,
        date,
        board_idx,
      ]);

      if (postCommentResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.CREATED,
            responseMessage.X_CREATE_SUCCESS("댓글")
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_CREATE_FAIL("댓글")
          ),
        });
      }
    });
  },
  putComment: ({ user_idx, commentIdx, title, contents }) => {
    return new Promise(async (resolve, reject) => {
      const putCommentQuery = `UPDATE comment SET title = ?, contents = ? WHERE comment_idx = ? AND writer_idx = ?`;
      const putCommentResult = await pool.queryParam_Parse(putCommentQuery, [
        title,
        contents,
        commentIdx,
        user_idx,
      ]);

      if (putCommentResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_UPDATE_SUCCESS("댓글"),
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_UPDATE_FAIL("댓글")
          ),
        });
      }
    });
  },
  deleteComment: ({ user_idx, commentIdx }) => {
    return new Promise(async (resolve, reject) => {
      const deleteCommentQuery = `DELETE FROM comment WHERE comment_idx = ? AND writer_idx = ?`;
      const deleteCommentResult = await pool.queryParam_Parse(deleteCommentQuery, [
        commentIdx,
        user_idx,
      ]);

      if (deleteCommentResult.affectedRows !== 0) {
        return resolve({
          json: authUtil.successTrue(
            statusCode.OK,
            responseMessage.X_DELETE_SUCCESS("댓글"),
          ),
        });
      } else {
        return resolve({
          json: authUtil.successFalse(
            statusCode.BAD_REQUEST,
            responseMessage.X_DELETE_FAIL("댓글"),
          ),
        });
      }
    });
  },
}

module.exports = comment;
