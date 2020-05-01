const statusCode = require("../module/utils/statusCode");
const responseMessage = require("../module/utils/responseMessage");
const authUtil = require("../module/utils/authUtil");
const pool = require("../module/db/pool");
const moment = require("moment");
require("moment-timezone");

const message = {
  postMessage: ({ userIdx, class_idx, contents, receiver }) => {
    return new Promise(async (resolve, reject) => {
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      const ALL = 0;

      if (!class_idx || !contents || !receiver) {
        return resolve({
          json: authUtil.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE),
        });
      }

      if (receiver == ALL) {
        const postAllMessageQuery = `INSERT INTO message (from_user_idx, to_user_idx, date, contents) SELECT ?, student_idx, ?, ? FROM take WHERE class_idx = ${class_idx}`;
        const postAllMessageResult = await pool.queryParam_Parse(postAllMessageQuery, [
          class_idx,
          date,
          contents,
        ]);

        if (postAllMessageResult.affectedRows === 0) {
          return resolve({
            json: authUtil.successFalse(
              statusCode.BAD_REQUEST,
              responseMessage.X_CREATE_FAIL("전체 메세지")
            ),
          });
        } else {
          return resolve({
            json: authUtil.successTrue(
              statusCode.CREATED,
              responseMessage.X_CREATE_SUCCESS("전체 메세지")
            ),
          });
        }
      } else {
        const postMessageQuery = `INSERT INTO message (from_user_idx, to_user_idx, date, contents) VALUES (?, ?, ?, ?)`;
        const postMessageResult = await pool.queryParam_Parse(postMessageQuery, [
          class_idx,
          receiver,
          date,
          contents,
        ]);

        if (postMessageResult.affectedRows === 0) {
          return resolve({
            json: authUtil.successFalse(
              statusCode.BAD_REQUEST,
              responseMessage.X_CREATE_FAIL("메세지")
            ),
          });
        } else {
          return resolve({
            json: authUtil.successTrue(
              statusCode.CREATED,
              responseMessage.X_CREATE_SUCCESS("메세지")
            ),
          });
        }
      }
    });
  },
  getMessageList: ({ userIdx }) => {
    return new Promise(async (resolve, reject) => {});
  },
  getMessageInfo: ({ userIdx, messageIdx }) => {
    return new Promise(async (resolve, reject) => {});
  },
};

module.exports = message;
