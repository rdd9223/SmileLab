var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const RESULT = require("../../model/Result");

// 컴파일 결과 저장하기
router.post("/", jwt.checkLogin, async (req, res) => {
    const { user_idx } = req.decoded;
    const { variable, operator, data, conditional, repeat, func } = req.body;
    RESULT.saveResult({ user_idx, variable, operator, data, conditional, repeat, func })
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
