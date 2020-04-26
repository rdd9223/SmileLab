var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 메세지 목록 조회
router.get("/", async (req, res) => {
  const className = req.query.keyword;
});

// 메세지 내용 조회
router.get("/:messageIdx", async (req, res) => {});

// 메세지 전송
router.post("/", async (req, res) => {});

module.exports = router;
