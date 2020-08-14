var express = require("express");
var router = express.Router();

const statusCode = require("../../../module/utils/statusCode");
const responseMessage = require("../../../module/utils/responseMessage");
const authUtil = require("../../../module/utils/authUtil");
const jwt = require("../../../module/auth/jwt");
const COMMENT = require("../../../model/Comment")

// 게시글 목록 조회
router.get("/:idx", jwt.checkLogin, async (req, res) => {
  const { user_idx } = req.decoded;
  const { idx } = req.params;
  console.log(idx);
  COMMENT.getCommentList({ user_idx, idx })
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

router.post("/", jwt.checkLogin, async (req, res) => {
  const { user_idx } = req.decoded;
  const { title, contents, board_idx } = req.body;

  COMMENT.postComment({ user_idx, title, contents, board_idx })
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