var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const USER = require("../../model/User");

// 회원가입
router.post("/", async (req, res) => {
  const { id, pw, name, phone_number, type, class_idx } = req.body;

  USER.signUp({ id, pw, name, phone_number, type, class_idx })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

// ID 증복체크
router.post("/idcheck", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  USER.doubleCheck(id)
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

module.exports = router;
