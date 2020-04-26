var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 내 정보 조회
router.get("/", async (req, res) => {});

// 내 정보 수정
router.put("/", async (req, res) => {});

module.exports = router;
