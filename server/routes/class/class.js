var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const CLASS = require("../../model/Class");

// 클래스 검색
router.get("/", async (req, res) => {
  const className = req.query.keyword;

  CLASS.searchClass({ className })
    .then(({ json }) => {
      console.log(json);
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

router.get("/list", async (req, res) => {
  CLASS.getClassList()
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

// 클래스 추가
router.post("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { className } = req.body;

  CLASS.postClass({ className, user_idx })
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

// 클래스 삭제
router.delete("/:class_idx", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { class_idx } = req.params;

  CLASS.deleteClass({ user_idx, class_idx })
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
