var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const BOARD = require("../../model/Board");

// 게시글 목록 조회
router.get("/list/:page", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { page } = req.params;
  const { board_type, class_idx } = req.query;

  BOARD.getBoardList({ user_idx, type, page, board_type, class_idx })
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
  const { user_idx, type } = req.decoded;
  const { boardIdx } = req.params;

  BOARD.getBoard({ user_idx, boardIdx, type })
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
  const { user_idx, type } = req.decoded;
  const { title, contents, board_type } = req.body;

  BOARD.postBoard({ user_idx, title, contents, board_type })
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

router.put("/:boardIdx", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { boardIdx } = req.params;
  const { title, contents } = req.body;

  BOARD.putBoard({ user_idx, boardIdx, title, contents })
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
})

router.delete("/:boardIdx", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { boardIdx } = req.params;

  BOARD.deleteBoard({ user_idx, boardIdx })
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
