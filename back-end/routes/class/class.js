var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 클래스 검색
router.get("/", async (req, res) => {
  const className = req.query.keyword;
});

// 클래스 추가
router.post("/", async (req, res) => {});

// 클래스 삭제
router.delete("/", async (req, res) => {});

module.exports = router;
