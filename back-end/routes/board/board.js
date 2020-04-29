var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const BOARD = require("../../model/Board");

// 게시글 목록 조회
router.get("/:page", jwt.checkLogin, async (req, res) => {
  const userIdx = req.decoded.idx;
  const { page } = req.params;

  BOARD.getBoardList({ userIdx, page })
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

// 게시글 상세 조회
router.get("/:boardIdx", jwt.checkLogin, async (req, res) => {
  const userIdx = req.decoded.idx;
  const { boardIdx } = req.params;

  BOARD.getBoard({ userIdx, boardIdx })
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

// 게시글 작성
router.post("/", jwt.checkLogin, async (req, res) => {
  const userIdx = req.decoded.idx;
  const { title, contents } = req.body;

  BOARD.postBoard({ userIdx, title, contents })
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
