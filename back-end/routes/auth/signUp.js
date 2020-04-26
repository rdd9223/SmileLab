var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 회원가입
router.post("/", async (req, res) => {});

// ID 증복체크
router.post("/idcheck", async (req, res) => {});

module.exports = router;
