var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 클래스 수강하기
router.post("/", async (req, res) => {});

// 수강클래스와 학생 전체 조회하기
router.get("/", async (req, res) => {});

module.exports = router;
