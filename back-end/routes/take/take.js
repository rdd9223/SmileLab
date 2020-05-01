var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const TAKE = require("../../model/Take");

// 클래스 수강하기
router.post("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { class_idx } = req.body;

  console.log(user_idx, type);
  TAKE.takeClass({ user_idx, class_idx })
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

// 수강클래스와 학생 전체 조회하기
router.get("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;

  TAKE.getClassInfo({ user_idx })
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
