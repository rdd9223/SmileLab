var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const MESSAGE = require("../../model/Message");

// 메세지 목록 조회
router.get("/", jwt.checkLogin, async (req, res) => {
  const userIdx = req.decoded.idx;

  MESSAGE.getMessageList({ userIdx })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

// 메세지 내용 조회
router.get("/:messageIdx", jwt.checkLogin, async (req, res) => {
  const userIdx = req.decoded.idx;
  const { messageIdx } = req.params;

  MESSAGE.getMessageList({ userIdx, messageIdx })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

// 메세지 전송
router.post("/", jwt.checkLogin, async (req, res) => {
  const user_idx = req.decoded.idx;
  const { class_idx, contents, receiver } = req.body;

  MESSAGE.postMessage({ user_idx, class_idx, contents, receiver })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

module.exports = router;
