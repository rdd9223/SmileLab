var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const USER = require("../../model/User");

// 내 정보 조회
router.get("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;

  USER.getInfo({ user_idx, type })
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

// 내 정보 수정
router.put("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { pw, name, phone_number, class_idx } = req.body;

  USER.putInfo({ pw, name, phone_number, class_idx, user_idx })
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
