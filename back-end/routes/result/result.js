var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 내 컴파일 결과 조회
router.get("/", async (req, res) => {});

// 내 컴파일 기록 삭제
router.delete("/", async (req, res) => {});

// 1명 컴파일 결과 조회
router.get("/:writer_idx", async (req, res) => {});

module.exports = router;
