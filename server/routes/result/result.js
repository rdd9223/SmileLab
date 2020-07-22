var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const RESULT = require("../../model/Result");

// 내 컴파일 결과 조회
router.get("/", jwt.checkLogin ,async (req, res) => {
  const { user_idx } = req.decoded;
  RESULT.getMyCompileResult({ user_idx })
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

// 내 컴파일 기록 삭제
router.delete("/", jwt.checkLogin, async (req, res) => {
  const { user_idx } = req.decoded;
  const data = req.body.data;
  
  RESULT.deleteResult({ data })
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

// 1명 컴파일 결과 조회
router.get("/:writer_idx", async (req, res) => {});

module.exports = router;
